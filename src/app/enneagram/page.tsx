import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { modelPages } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const page = modelPages.enneagram;

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/enneagram"
});

export default function Page() {
  return <ContentPage page={page} />;
}
