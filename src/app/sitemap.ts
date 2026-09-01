import type { MetadataRoute } from "next";
import { pillars, companies } from "@/data/site";

const BASE = "https://formulainfra.co.il";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = [
    "",
    "/about",
    "/pillars",
    "/companies",
    "/capabilities",
    "/projects",
    "/careers",
    "/news",
    "/contact",
    "/legal/privacy",
    "/legal/accessibility",
    "/legal/terms",
  ];

  return [
    ...staticPaths.map((p) => ({
      url: `${BASE}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
    })),
    ...pillars.map((p) => ({
      url: `${BASE}/pillars/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...companies.map((c) => ({
      url: `${BASE}/companies/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
