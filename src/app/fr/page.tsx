import Link from "next/link";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Test de personnalité gratuit en français",
  description:
    "Passez un test de personnalité en français basé sur les grands modèles de personnalité pour mieux comprendre vos traits, préférences et motivations.",
  path: "/fr",
  keywords: ["test de personnalité", "test Big Five", "test HEXACO", "test 16 personnalités", "ennéagramme"]
});

const models = ["Traits Big Five", "Scores inspirés du HEXACO", "Estimation 16 types", "Motivations de l'ennéagramme"] as const;

export default function FrenchHomePage() {
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
          <p className="eyebrow">Test de personnalité</p>
          <h1>
            <span className="title-gradient">Great Mind Profile</span>
          </h1>
          <p>
            Un quiz gratuit en français pour estimer vos traits Big Five, vos signaux HEXACO, votre type de préférence
            et vos motivations de façon claire et utile.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/fr/personality-test/start">
              Commencer le quiz
            </Link>
            <Link className="secondary-button" href="/">
              English
            </Link>
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="card">
          <p className="eyebrow">Un quiz, plusieurs modèles</p>
          <h2>Une seule expérience, un rapport plus riche.</h2>
          <p>
            Le test garde le même moteur de score que la version anglaise. Seuls les textes sont traduits, pour garder
            des résultats cohérents entre les langues.
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
            <p className="eyebrow">Comment ça marche</p>
            <h2>Répondez. Avancez automatiquement. Lisez votre profil.</h2>
            <p>
              Choisissez Rapide, Standard ou Approfondi. Chaque réponse vous mène à la question suivante. Vous pouvez
              revenir en arrière si vous changez d&apos;avis.
            </p>
          </div>
          <div className="card">
            <p className="eyebrow">Respect et prudence</p>
            <p>
              Aucun compte n&apos;est nécessaire. Les résultats sont des estimations pour la réflexion personnelle, pas des
              diagnostics ni des décisions de carrière automatiques.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
