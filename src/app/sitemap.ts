import type { MetadataRoute } from "next";

const baseUrl = "https://teloresuelvo.it";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: "2026-06-29",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: "2026-06-29",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: "2026-06-29",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: "2026-06-29",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
