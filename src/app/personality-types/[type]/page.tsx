import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { createMetadata } from "@/lib/seo";
import { personalityTypeCodes, personalityTypePage } from "@/lib/seoContent";
import type { PersonalityType } from "@/lib/typeVisuals";

type PageProps = {
  params: Promise<{ type: string }>;
};

export function generateStaticParams() {
  return personalityTypeCodes.map((type) => ({ type: type.toLowerCase() }));
}

function resolveType(value: string): PersonalityType | null {
  const upper = value.toUpperCase() as PersonalityType;
  return personalityTypeCodes.includes(upper) ? upper : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const resolved = resolveType(type);
  if (!resolved) return {};
  const page = personalityTypePage(resolved);

  return createMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`
  });
}

export default async function Page({ params }: PageProps) {
  const { type } = await params;
  const resolved = resolveType(type);
  if (!resolved) notFound();

  return <ContentPage page={personalityTypePage(resolved)} />;
}
