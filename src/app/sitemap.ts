import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { modelPages, policyPages, testPages } from "@/lib/content";
import { articlePages, personalityTypeCodes, resultPages } from "@/lib/seoContent";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-17");
  const paths = [
    "/",
    "/fr",
    "/fr/personality-test/start",
    "/fr/personality-test/results",
    "/articles",
    "/personality-test/start",
    ...Object.keys(testPages).map((slug) => `/${slug}`),
    ...Object.keys(modelPages).map((slug) => `/${slug}`),
    ...personalityTypeCodes.map((type) => `/personality-types/${type.toLowerCase()}`),
    ...Object.keys(articlePages).map((slug) => `/articles/${slug}`),
    ...Object.values(resultPages).map((page) => `/${page.slug}`),
    ...Object.keys(policyPages).map((slug) => `/${slug}`)
  ];

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7
  }));
}
