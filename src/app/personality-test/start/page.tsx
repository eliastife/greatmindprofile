import type { Metadata } from "next";
import { QuizClient } from "@/components/QuizClient";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Start the Personality Test",
  description: "Start the integrated Great Mind Profile quiz with Quick, Standard, and Deep modes.",
  path: "/personality-test/start"
});

export default function StartPage() {
  return (
    <main className="shell">
      <QuizClient />
    </main>
  );
}
