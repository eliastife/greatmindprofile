import type { Metadata } from "next";
import { ResultClient } from "@/components/ResultClient";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Résultats du test de personnalité",
  description: "Consultez votre résumé Great Mind Profile, vos scores de traits, vos estimations de type et votre plan de croissance.",
  path: "/fr/personality-test/results"
});

export default function FrenchResultsPage() {
  return <ResultClient locale="fr" />;
}
