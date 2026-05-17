import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { modelPages, policyPages, testPages } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-17");
  const paths = [
    "/",
    "/personality-test/start",
    ...Object.keys(testPages).map((slug) => `/${slug}`),
    ...Object.keys(modelPages).map((slug) => `/${slug}`),
    ...Object.keys(policyPages).map((slug) => `/${slug}`)
  ];

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7
  }));
}
