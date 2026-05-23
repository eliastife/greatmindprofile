import Link from "next/link";
import type { ContentPage as ContentPageData } from "@/lib/content";
import { JsonLd } from "./JsonLd";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { AdSlot } from "./AdSlot";

const adEligibleSlugs = new Set(["big-five", "hexaco", "enneagram", "personality-types", "methodology"]);

function canShowContentAd(slug: string) {
  return adEligibleSlugs.has(slug) || slug.startsWith("articles/") || slug.startsWith("personality-types/");
}

export function ContentPage({ page }: { page: ContentPageData }) {
  return (
    <>
      <JsonLd data={articleJsonLd(page.title, page.description, `/${page.slug}`)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: page.title, path: `/${page.slug}` }
        ])}
      />
      {page.faq ? <JsonLd data={faqJsonLd(page.faq)} /> : null}
      <main className="shell">
        <section className="page-hero">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="button-row">
            <Link className="button" href="/personality-test/start">
              Take the integrated test
            </Link>
            {page.slug !== "methodology" ? (
              <Link className="secondary-button" href="/methodology">
                Read methodology
              </Link>
            ) : null}
          </div>
        </section>
        <div className="prose">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          {page.faq ? (
            <section>
              <h2>Common Questions</h2>
              {page.faq.map((item) => (
                <div key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </section>
          ) : null}
        </div>
        {canShowContentAd(page.slug) ? (
          <div className="content-ad">
            <AdSlot />
          </div>
        ) : null}
      </main>
    </>
  );
}
