import Link from "next/link";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { articlePages, careerArticlePages, personalityTypeCodes } from "@/lib/seoContent";

export const metadata: Metadata = createMetadata({
  title: "Great Mind Profile",
  description:
    "Take a free personality assessment built from established frameworks for self-reflection, educational insight, and practical growth.",
  path: "/",
  keywords: ["personality test", "Big Five test", "HEXACO test", "16 personality test", "Enneagram test"]
});

const models = ["Big Five traits", "HEXACO-inspired scores", "16-type estimate", "Enneagram-style motivation"] as const;
const featuredArticles = ["infj-careers", "infp-vs-infj", "what-is-openness-to-experience", "hexaco-honesty-humility"] as const;

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
            One free personality test with Big Five trait scores, HEXACO-inspired signals, 16-type estimates, and
            Enneagram-style motivation notes in one clear report.
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
            {models.map((model, index) => (
              <Link
                className="secondary-button"
                href={["/big-five", "/hexaco", "/16-personality-test", "/enneagram"][index]}
                key={model}
              >
                {model}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="result-grid">
          <div>
            <p className="eyebrow">Shareable guides</p>
            <h2>Type pages people can actually find.</h2>
            <p>
              Browse indexable personality type guides, sample result pages, and practical articles about careers,
              traits, and motivation patterns.
            </p>
          </div>
          <div className="card">
            <h3>Popular type guides</h3>
            <div className="footer-links">
              {personalityTypeCodes.slice(0, 8).map((type) => (
                <Link href={`/personality-types/${type.toLowerCase()}`} key={type}>
                  {type}
                </Link>
              ))}
            </div>
            <div className="footer-links">
              <Link className="secondary-button" href="/personality-types">
                Browse all types
              </Link>
              <Link className="secondary-button" href="/results/infj">
                Sample result
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="shell section">
        <p className="eyebrow">Personality library</p>
        <h2>Guides built for search and real questions.</h2>
        <div className="card-grid" style={{ marginTop: 18 }}>
          {featuredArticles.map((slug) => {
            const article = articlePages[slug];
            return (
              <Link className="card" href={`/${article.slug}`} key={slug}>
                <p className="eyebrow">{article.eyebrow}</p>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </Link>
            );
          })}
        </div>
        <div className="button-row">
          <Link className="button" href="/articles">
            Read articles
          </Link>
        </div>
      </section>

      <section className="shell section">
        <div className="result-grid">
          <div>
            <p className="eyebrow">Career guides</p>
            <h2>Find work that fits your personality pattern.</h2>
            <p>
              Start with your type, then read practical guidance on roles, work environments, stress risks, interview
              tips, and growth moves.
            </p>
            <div className="button-row">
              <Link className="button" href="/articles">
                Browse all articles
              </Link>
              <Link className="secondary-button" href="/personality-test/start">
                Take the quiz first
              </Link>
            </div>
          </div>
          <div className="card">
            <h3>Career articles by type</h3>
            <div className="footer-links">
              {personalityTypeCodes.map((type) => {
                const slug = `${type.toLowerCase()}-careers`;
                return (
                  <Link href={`/${careerArticlePages[slug].slug}`} key={type}>
                    {type} careers
                  </Link>
                );
              })}
            </div>
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
