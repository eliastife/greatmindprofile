import type { Metadata } from "next";
import { ContentPage } from "@/components/ContentPage";
import { policyPages } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

const page = policyPages["advertising-policy"];

export const metadata: Metadata = createMetadata({
  title: page.title,
  description: page.description,
  path: "/advertising-policy"
});

export default function Page() {
  return <ContentPage page={page} />;
}
