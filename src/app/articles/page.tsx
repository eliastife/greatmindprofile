import Link from "next/link";
import type { Metadata } from "next";
import { articlePages } from "@/lib/seoContent";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Personality Articles",
  description: "Read practical guides about personality types, Big Five traits, HEXACO, Enneagram patterns, careers, and growth.",
  path: "/articles",
  keywords: ["personality articles", "personality type guides", "Big Five articles", "Enneagram articles"]
});

export default function ArticlesPage() {
  return (
    <main className="shell">
      <section className="page-hero">
        <p className="eyebrow">Personality library</p>
        <h1>Personality Articles</h1>
        <p>Clear, practical guides for people who want to understand traits, types, careers, relationships, and growth.</p>
      </section>
      <section className="card-grid" style={{ paddingBottom: 72 }}>
        {Object.values(articlePages).map((article) => (
          <Link className="card" href={`/${article.slug}`} key={article.slug}>
            <p className="eyebrow">{article.eyebrow}</p>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
