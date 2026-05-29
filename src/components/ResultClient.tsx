"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SCORING_VERSION, type ResultProfile } from "@/lib/scoring";
import { TraitBar } from "./TraitBar";
import { RadarChart } from "./RadarChart";
import { AdSlot } from "./AdSlot";
import { PersonalityMascot } from "./PersonalityMascot";
import { typeVisuals, type PersonalityType } from "@/lib/typeVisuals";
import type { CSSProperties } from "react";
import type { Locale } from "@/lib/i18n";

const resultKey = "gmp.quiz.results";
const currentResultKey = "gmp.quiz.currentResult";
const latestResultIdKey = "gmp.quiz.latestResultId";

const labels: Record<string, string> = {
  openness: "Openness",
  conscientiousness: "Conscientiousness",
  extraversion: "Extraversion",
  agreeableness: "Agreeableness",
  stability: "Emotional Stability",
  honestyHumility: "Honesty-Humility",
  emotionality: "Emotionality"
};

const resultCopy = {
  en: {
    loading: "Loading result...",
    missingEyebrow: "Result not found",
    missingTitle: "Start a fresh quiz",
    missingBody:
      "This result link does not match a saved result in this browser, or it was created with an older scoring version. Take the quiz again to generate a real result.",
    startQuiz: "Start quiz",
    yourResult: "Your result",
    confidence: "Confidence",
    typeEstimate: "16-type estimate",
    share: "Share",
    download: "Download full report image",
    retake: "Retake test",
    shareable: "View shareable type page",
    shareSaved: "Shareable type result link copied.",
    imageSaved: "Image downloaded.",
    instagram: "Instagram does not accept direct web shares. I downloaded the image and copied your caption.",
    note: ""
  },
  fr: {
    loading: "Chargement du résultat...",
    missingEyebrow: "Résultat introuvable",
    missingTitle: "Commencer un nouveau quiz",
    missingBody:
      "Ce lien ne correspond pas à un résultat enregistré dans ce navigateur, ou il vient d'une ancienne version du score. Reprenez le quiz pour générer un résultat réel.",
    startQuiz: "Commencer le quiz",
    yourResult: "Votre résultat",
    confidence: "Confiance",
    typeEstimate: "Estimation 16 types",
    share: "Partager",
    download: "Télécharger l'image du rapport",
    retake: "Refaire le test",
    shareable: "Voir la page partageable",
    shareSaved: "Lien partageable du type copié.",
    imageSaved: "Image téléchargée.",
    instagram: "Instagram n'accepte pas le partage web direct. L'image a été téléchargée et la légende copiée.",
    note:
      "Le mode français traduit le quiz et les commandes principales. Une partie de l'analyse détaillée reste en anglais pendant la construction complète de la bibliothèque française."
  }
} as const;

const colorValues: Record<string, string> = {
  aqua: "#67e8f9",
  black: "#111827",
  blush: "#fda4af",
  charcoal: "#374151",
  coral: "#fb7185",
  cream: "#fef3c7",
  "cool gray": "#94a3b8",
  "deep blue": "#1e3a8a",
  "electric blue": "#38bdf8",
  gold: "#fbbf24",
  graphite: "#374151",
  green: "#22c55e",
  indigo: "#6366f1",
  ivory: "#fff7ed",
  lavender: "#c4b5fd",
  moss: "#4d7c0f",
  navy: "#172554",
  orange: "#f97316",
  peach: "#fb923c",
  red: "#ef4444",
  rose: "#fb7185",
  "royal blue": "#2563eb",
  sage: "#86efac",
  silver: "#cbd5e1",
  "sky blue": "#7dd3fc",
  "soft blue": "#93c5fd",
  "soft white": "#f8fafc",
  steel: "#94a3b8",
  stone: "#a8a29e",
  teal: "#14b8a6",
  turquoise: "#22d3ee",
  violet: "#a855f7",
  warm: "#fef3c7",
  "warm gray": "#d6d3d1",
  "warm white": "#fff7ed",
  white: "#ffffff",
  yellow: "#facc15"
};

function colorStyle(color: string): CSSProperties {
  const background = colorValues[color] ?? "#f8fafc";
  const darkText = ["yellow", "cream", "ivory", "soft white", "white", "warm white", "gold", "sage", "sky blue", "aqua"].includes(color);
  return {
    background,
    borderColor: background,
    color: darkText ? "#1f2937" : "#ffffff"
  };
}

export function ResultClient({ resultId = "", locale = "en" }: { resultId?: string; locale?: Locale }) {
  const [result, setResult] = useState<ResultProfile | "missing" | null>(null);
  const [shareMessage, setShareMessage] = useState("");
  const reportRef = useRef<HTMLElement>(null);
  const copy = resultCopy[locale];

  useEffect(() => {
    function isFresh(candidate: ResultProfile | undefined | null): candidate is ResultProfile {
      return candidate?.scoringVersion === SCORING_VERSION;
    }

    function readJson<T>(storage: Storage, key: string): T | null {
      const value = storage.getItem(key);
      if (!value) return null;
      try {
        return JSON.parse(value) as T;
      } catch {
        return null;
      }
    }

    try {
      const requestedResultId = new URLSearchParams(window.location.search).get("resultId") ?? resultId;
      const parsed = readJson<Record<string, ResultProfile>>(window.localStorage, resultKey) ?? {};
      const latestResultId = window.localStorage.getItem(latestResultIdKey);
      const directCurrent =
        readJson<ResultProfile>(window.sessionStorage, currentResultKey) ??
        readJson<ResultProfile>(window.localStorage, currentResultKey);
      const recoveredResult =
        (requestedResultId ? parsed[requestedResultId] : undefined) ??
        (latestResultId ? parsed[latestResultId] : undefined) ??
        directCurrent;

      if (!isFresh(recoveredResult)) {
        // Browser-local result lookup has to hydrate after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResult("missing");
        return;
      }

      // Result data lives in browser local storage, so this restore happens after hydration.
      if (recoveredResult.resultId !== requestedResultId) {
        const resultPath = locale === "fr" ? "/fr/personality-test/results" : "/personality-test/results";
        window.history.replaceState(
          null,
          "",
          `${resultPath}?resultId=${encodeURIComponent(recoveredResult.resultId)}`
        );
      }
      setResult(recoveredResult);
    } catch {
      setResult("missing");
    }
  }, [locale, resultId]);

  async function shareNative() {
    if (!result || result === "missing") return;
    const text = `I got ${result.archetype} on Great Mind Profile.`;
    const shareUrl = `${window.location.origin}/results/${result.sixteenType.toLowerCase()}`;
    if (navigator.share) {
      await navigator.share({ title: "My Great Mind Profile", text, url: shareUrl });
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    setShareMessage(copy.shareSaved);
  }

  async function downloadCard() {
    if (!result || result === "missing") return;
    const target = reportRef.current;
    if (!target) return;

    const { default: html2canvas } = await import("html2canvas");
    const canvas = await html2canvas(target, {
      backgroundColor: "#f8fafc",
      scale: Math.min(window.devicePixelRatio || 1, 2),
      useCORS: true,
      windowWidth: target.scrollWidth,
      windowHeight: target.scrollHeight
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${result.resultId}-great-mind-profile.png`;
    link.click();
    setShareMessage(copy.imageSaved);
  }

  async function shareTo(platform: "x" | "facebook" | "whatsapp" | "instagram") {
    if (!result || result === "missing") return;
    const url = `${window.location.origin}/results/${result.sixteenType.toLowerCase()}`;
    const text = `I got ${result.archetype} (${result.sixteenType}) on Great Mind Profile.`;
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);

    if (platform === "instagram") {
      await downloadCard();
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShareMessage(copy.instagram);
      return;
    }

    const links = {
      x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`
    };

    window.open(links[platform], "_blank", "noopener,noreferrer");
  }

  if (!result) {
    return (
      <main className="shell quiz-shell">
        <div className="card">{copy.loading}</div>
      </main>
    );
  }

  if (result === "missing") {
    return (
      <main className="shell quiz-shell">
        <section className="card quiz-intro">
          <p className="eyebrow">{copy.missingEyebrow}</p>
          <h1>{copy.missingTitle}</h1>
          <p>{copy.missingBody}</p>
          <div className="button-row start-action">
            <Link className="button" href={locale === "fr" ? "/fr/personality-test/start" : "/personality-test/start"}>
              {copy.startQuiz}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const visual = typeVisuals[(result.sixteenType in typeVisuals ? result.sixteenType : "INFP") as PersonalityType];
  const typeStyle = {
    "--type-primary": visual.primary,
    "--type-secondary": visual.secondary,
    "--type-soft": visual.soft
  } as CSSProperties;

  return (
    <main className="shell quiz-shell" ref={reportRef}>
      <section className="card result-hero-card" style={typeStyle}>
        <div>
          <p className="eyebrow">{copy.yourResult}</p>
          <h1>{result.archetype}</h1>
          <p>{result.summary}</p>
          <div className="button-row">
            <span className="secondary-button">
              {copy.confidence} {result.confidence}%
            </span>
            <span className="secondary-button">
              {copy.typeEstimate} {result.sixteenType}
            </span>
            <span className="secondary-button">{result.enneagram}</span>
          </div>
          {copy.note ? <p style={{ marginTop: 14 }}>{copy.note}</p> : null}
        </div>
        <PersonalityMascot type={result.sixteenType} />
      </section>

      <section className="card type-story-card" style={{ ...typeStyle, marginTop: 18 }}>
        <p className="eyebrow">Type story</p>
        <h2>
          {result.sixteenType}: {result.typeProfile.name}
        </h2>
        <p>{result.typeProfile.overview}</p>
        <div className="type-story-body">
          <div>
            <h3>Your simple pattern</h3>
            <p>{result.deepDive[0]}</p>
          </div>
          <div>
            <h3>How you tend to think</h3>
            <p>{result.typeProfile.howYouThink}</p>
          </div>
          <div>
            <h3>What people may notice</h3>
            <p>{result.deepDive[1]}</p>
          </div>
          <div>
            <h3>Under pressure</h3>
            <p>{result.typeProfile.underPressure}</p>
          </div>
          <div>
            <h3>How to use this result</h3>
            <p>{result.deepDive.slice(2).join(" ")}</p>
          </div>
        </div>
      </section>

      <section className="result-grid" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>Big Five Trait Scores</h2>
          {Object.entries(result.bigFive).map(([key, value]) => (
            <TraitBar key={key} label={labels[key] ?? key} value={value} />
          ))}
        </div>
        <div className="card">
          <h2>Radar View</h2>
          <RadarChart values={result.bigFive} />
        </div>
      </section>

      <section className="result-grid" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>HEXACO-Inspired Scores</h2>
          {Object.entries(result.hexaco).map(([key, value]) => (
            <TraitBar key={key} label={labels[key] ?? key} value={value} />
          ))}
        </div>
        <div className="card">
          <h2>Type Estimates</h2>
          <p>
            Primary 16-type estimate: <strong>{result.sixteenType}</strong>
          </p>
          <p>Secondary possible types: {result.secondaryTypes.join(", ")}</p>
          <p>Motivation estimate: {result.enneagram}</p>
          <details className="learn-more">
            <summary>Why these models appeared</summary>
            {result.modelExplanations.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </details>
        </div>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <p className="eyebrow">Match notes</p>
        <h2>Easy match and harder match</h2>
        <p>
          These are not destiny. Research points more to traits, habits, and repair skills than fixed soulmates. Use
          this as a clear way to understand possible comfort and friction.
        </p>
        <div className="match-grid" style={{ marginTop: 18 }}>
          <div>
            <h3>
              Easy match: {result.typeMatch.type} - {result.typeMatch.name}
            </h3>
            <p>{result.typeMatch.whyItFits}</p>
            <p>{result.typeMatch.whyItCanBeHard}</p>
            <p>{result.typeMatch.makeItWork}</p>
          </div>
          <div>
            <h3>
              Harder match: {result.typeChallenge.type} - {result.typeChallenge.name}
            </h3>
            <p>{result.typeChallenge.whyItFits}</p>
            <p>{result.typeChallenge.whyItCanBeHard}</p>
            <p>{result.typeChallenge.makeItWork}</p>
          </div>
        </div>
      </section>

      <section className="grid" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>Strengths</h2>
          {result.strengths.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div className="card">
          <h2>Blind Spots</h2>
          {result.blindSpots.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div className="card">
          <h2>Growth Plan</h2>
          {result.growthPlan.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <section className="result-grid" style={{ marginTop: 18 }}>
        <div className="card">
          <p className="eyebrow">Fun science corner</p>
          <h2>Jobs and studies that may fit</h2>
          <p>These are not destiny. They are places where your natural attention style may be easier to use.</p>
          <h3>Study paths</h3>
          <p>{result.typeProfile.bestStudyPaths.join(", ")}</p>
          <h3>Job families</h3>
          <p>{result.typeProfile.bestJobFamilies.join(", ")}</p>
        </div>
        <div className="card">
          <p className="eyebrow">Cool but careful</p>
          <h2>Fun facts</h2>
          {result.typeProfile.funFacts.map((fact) => (
            <p key={fact}>{fact}</p>
          ))}
          <h3>Color vibe</h3>
          <p>Not a scientific preference claim; just a visual palette that fits the tone of this result.</p>
          <div className="swatches">
            {result.typeProfile.colorPalette.map((color) => (
              <span key={color} style={colorStyle(color)}>
                {color}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <p className="eyebrow">What is scientific here?</p>
        <h2>Plain evidence notes</h2>
        {result.evidenceNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
        <details className="learn-more">
          <summary>Research used to shape this wording</summary>
          <p>
            Big Five and relationship notes:{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/30776092/" rel="noreferrer" target="_blank">
              O&apos;Meara & South, 2019
            </a>{" "}
            and{" "}
            <a
              href="https://rune.une.edu.au/entities/publication/a8cd374c-6c21-45cb-a61d-6f23b787c743"
              rel="noreferrer"
              target="_blank"
            >
              Malouff et al., 2010
            </a>
            .
          </p>
          <p>
            HEXACO trait wording:{" "}
            <a href="https://hexaco.org/scaledescriptions%26lang%3Den" rel="noreferrer" target="_blank">
              Lee & Ashton HEXACO-PI-R scale descriptions
            </a>
            .
          </p>
          <p>
            Job and study fit wording:{" "}
            <a
              href="https://iro.uiowa.edu/esploro/outputs/journalArticle/THE-BIG-FIVE-PERSONALITY-DIMENSIONS-AND/9984963115202771"
              rel="noreferrer"
              target="_blank"
            >
              Barrick & Mount, 1991
            </a>
            .
          </p>
        </details>
      </section>

      <section className="grid" style={{ marginTop: 18 }}>
        <div className="card">
          <h2>Career Style</h2>
          <p>{result.careerStyle}</p>
        </div>
        <div className="card">
          <h2>Relationship Style</h2>
          <p>{result.relationshipStyle}</p>
        </div>
        <div className="card">
          <h2>Stress Style</h2>
          <p>{result.stressStyle}</p>
        </div>
      </section>

      <div style={{ marginTop: 18 }}>
        <AdSlot />
      </div>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>Share or Save</h2>
        <div className="button-row">
          <button className="button" onClick={shareNative} type="button">
            {copy.share}
          </button>
          <button className="secondary-button" onClick={downloadCard} type="button">
            {copy.download}
          </button>
          <Link className="secondary-button" href={locale === "fr" ? "/fr/personality-test/start" : "/personality-test/start"}>
            {copy.retake}
          </Link>
          <Link className="secondary-button" href={`/results/${result.sixteenType.toLowerCase()}`}>
            {copy.shareable}
          </Link>
        </div>
        <div className="share-grid" aria-label="Social share options">
          <button className="secondary-button" onClick={() => shareTo("x")} type="button">
            Share on X
          </button>
          <button className="secondary-button" onClick={() => shareTo("facebook")} type="button">
            Facebook
          </button>
          <button className="secondary-button" onClick={() => shareTo("whatsapp")} type="button">
            WhatsApp
          </button>
          <button className="secondary-button" onClick={() => shareTo("instagram")} type="button">
            Instagram image
          </button>
        </div>
        {shareMessage ? <p className="share-note">{shareMessage}</p> : null}
      </section>

      <section className="card" style={{ marginTop: 18 }}>
        <h2>Recommended Articles</h2>
        <div className="footer-links">
          <Link href="/big-five">Big Five guide</Link>
          <Link href="/hexaco">HEXACO guide</Link>
          <Link href="/enneagram">Enneagram guide</Link>
          <Link href="/methodology">Methodology</Link>
        </div>
      </section>
    </main>
  );
}
