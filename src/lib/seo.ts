import type { Metadata } from "next";
import { site } from "./site";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
};

export function createMetadata({ title, description, path = "/", keywords = [] }: SeoInput): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle = title === site.name ? title : `${title} | ${site.name}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description
    }
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/personality-types?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "editorial",
      email: site.contactEmail
    }
  };
}

export function articleJsonLd(title: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${site.url}${path}`,
    publisher: organizationJsonLd()
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`
    }))
  };
}
