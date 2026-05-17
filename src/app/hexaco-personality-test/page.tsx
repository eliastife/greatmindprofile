import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { testPages } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const page = testPages["hexaco-personality-test"];

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/hexaco-personality-test"
});

export default function Page() {
  return <ContentPage page={page} />;
}
