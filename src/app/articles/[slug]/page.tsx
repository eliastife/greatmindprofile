import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { articlePages } from "@/lib/seoContent";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(articlePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = articlePages[slug];
  if (!page) return {};

  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = articlePages[slug];
  if (!page) notFound();

  return (
    <>
      <ContentPage page={page} />
      <section className="shell" style={{ paddingBottom: 72 }}>
        <div className="card">
          <p className="eyebrow">Related guides</p>
          <div className="footer-links">
            {page.related.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
