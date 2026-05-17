import Link from "next/link";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Great Mind Profile",
  description:
    "Take a free personality assessment built from established frameworks for self-reflection, educational insight, and practical growth.",
  path: "/",
  keywords: ["personality test", "Big Five test", "HEXACO test", "16 personality test", "Enneagram test"]
});

const models = ["Big Five traits", "HEXACO-inspired scores", "16-type estimate", "Enneagram-style motivation"] as const;

export default function HomePage() {
  return (
    <main>
      <section className="shell hero hero-home">
        <div className="pop-scene" aria-hidden="true">
          <span className="pop-shape shape-star" />
          <span className="pop-shape shape-leaf" />
          <span className="pop-shape shape-diamond" />
          <span className="pop-shape shape-ticket" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">Personality assessment platform</p>
          <h1>
            <span className="title-gradient">Great Mind Profile</span>
          </h1>
          <p>
            Finally understand what makes you, you. One free quiz estimates your trait pattern, preference style, and
            motivation themes for self-reflection and educational insight.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/personality-test/start">
              Start the quiz
            </Link>
            <Link className="secondary-button" href="/methodology">
              Methodology
            </Link>
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="card">
          <p className="eyebrow">One quiz, four lenses</p>
          <h2>No maze of separate tests.</h2>
          <p>
            The model pages explain the science, but the assessment itself is integrated. Click start, read the quick
            model explanation, choose your depth, and answer one smooth question flow.
          </p>
          <div className="footer-links">
            {models.map((model) => (
              <span className="secondary-button" key={model}>
                {model}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="result-grid">
          <div>
            <p className="eyebrow">How it works</p>
            <h2>Answer. Auto-advance. Review.</h2>
            <p>
              Choose Quick, Standard, or Deep mode. Each answer moves you forward automatically, and Previous lets you
              fix mistakes. Progress is saved locally in your browser.
            </p>
          </div>
          <div className="card">
            <p className="eyebrow">Privacy and trust</p>
            <p>
              No login is required. Quiz progress is saved locally in your browser. Results are estimates, not diagnoses,
              and should not be used for high-stakes decisions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
