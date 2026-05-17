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

export function ResultClient({ resultId }: { resultId: string }) {
  const [result, setResult] = useState<ResultProfile | "missing" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
      const parsed = readJson<Record<string, ResultProfile>>(window.localStorage, resultKey) ?? {};
      const latestResultId = window.localStorage.getItem(latestResultIdKey);
      const directCurrent =
        readJson<ResultProfile>(window.sessionStorage, currentResultKey) ??
        readJson<ResultProfile>(window.localStorage, currentResultKey);
      const recoveredResult = parsed[resultId] ?? (latestResultId ? parsed[latestResultId] : undefined) ?? directCurrent;

      if (!isFresh(recoveredResult)) {
        // Browser-local result lookup has to hydrate after mount.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResult("missing");
        return;
      }

      // Result data lives in browser local storage, so this restore happens after hydration.
      if (recoveredResult.resultId !== resultId) {
        window.history.replaceState(null, "", `/personality-test/results/${recoveredResult.resultId}`);
      }
      setResult(recoveredResult);
    } catch {
      setResult("missing");
    }
  }, [resultId]);

  async function share() {
    if (!result || result === "missing") return;
    const text = `I got ${result.archetype} on Great Mind Profile.`;
    if (navigator.share) {
      await navigator.share({ title: "My Great Mind Profile", text, url: window.location.href });
      return;
    }
    await navigator.clipboard.writeText(window.location.href);
  }

  function downloadCard() {
    if (!result || result === "missing") return;
    const content = cardRef.current?.innerText ?? "Great Mind Profile result";
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${result.resultId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!result) {
    return (
      <main className="shell quiz-shell">
        <div className="card">Loading result...</div>
      </main>
    );
  }

  if (result === "missing") {
    return (
      <main className="shell quiz-shell">
        <section className="card quiz-intro">
          <p className="eyebrow">Result not found</p>
          <h1>Start a fresh quiz</h1>
          <p>
            This result link does not match a saved result in this browser, or it was created with an older scoring
            version. Take the quiz again to generate a real result.
          </p>
          <div className="button-row start-action">
            <Link className="button" href="/personality-test/start">
              Start quiz
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
    <main className="shell quiz-shell">
      <section className="card result-hero-card" ref={cardRef} style={typeStyle}>
        <div>
          <p className="eyebrow">Your result</p>
          <h1>{result.archetype}</h1>
          <p>{result.summary}</p>
          <div className="button-row">
            <span className="secondary-button">Confidence {result.confidence}%</span>
            <span className="secondary-button">16-type estimate {result.sixteenType}</span>
            <span className="secondary-button">{result.enneagram}</span>
          </div>
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
            <h3>Core pattern</h3>
            <p>
              This type estimate suggests a recurring style in how you direct attention, make decisions, and recover
              your energy. It is not a box; it is a shorthand for the pattern your answers most resembled.
            </p>
          </div>
          <div>
            <h3>How you tend to think</h3>
            <p>{result.typeProfile.howYouThink}</p>
          </div>
          <div>
            <h3>What people may notice</h3>
            <p>
              At your best, the profile points toward {result.strengths.join(", ").toLowerCase()}. These strengths can
              show up differently depending on your environment, confidence, and current stress level.
            </p>
          </div>
          <div>
            <h3>Under pressure</h3>
            <p>{result.typeProfile.underPressure}</p>
          </div>
          <div>
            <h3>How to use this result</h3>
            <p>
              Compare this type story with your trait bars. If the type name feels partly right but not perfect, look at
              the secondary possible types and the strongest Big Five or HEXACO signals; those usually explain the
              nuance.
            </p>
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
          <p>
            These are not destiny; they are environments that often match the attention style and motivation pattern in
            your result.
          </p>
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
              <span key={color}>{color}</span>
            ))}
          </div>
          <p>{result.typeProfile.famousPeopleNote}</p>
        </div>
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
          <button className="button" onClick={share} type="button">
            Share result
          </button>
          <button className="secondary-button" onClick={downloadCard} type="button">
            Download result card
          </button>
          <Link className="secondary-button" href="/personality-test/start">
            Retake test
          </Link>
        </div>
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
