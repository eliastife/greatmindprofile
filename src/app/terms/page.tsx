import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { policyPages } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const page = policyPages.terms;

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/terms"
});

export default function Page() {
  return <ContentPage page={page} />;
}
