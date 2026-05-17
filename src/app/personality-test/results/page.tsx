import type { Metadata } from "next";
import { ResultClient } from "@/components/ResultClient";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Personality Test Results",
  description: "Review your Great Mind Profile result summary, trait scores, type estimates, and growth plan.",
  path: "/personality-test/results"
});

export default function ResultsPage() {
  return <ResultClient />;
}
