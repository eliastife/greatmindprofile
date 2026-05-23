import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { createMetadata } from "@/lib/seo";
import { resultPages } from "@/lib/seoContent";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(resultPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = resultPages[slug];
  if (!page) return {};

  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = resultPages[slug];
  if (!page) notFound();

  return <ContentPage page={page} />;
}
