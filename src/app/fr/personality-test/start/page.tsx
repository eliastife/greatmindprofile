import type { Metadata } from "next";
import { QuizClient } from "@/components/QuizClient";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Commencer le test de personnalité",
  description: "Commencez le quiz Great Mind Profile en français avec les modes Rapide, Standard et Approfondi.",
  path: "/fr/personality-test/start"
});

export default function FrenchStartPage() {
  return (
    <main className="shell">
      <QuizClient locale="fr" />
    </main>
  );
}
