import type { MetadataRoute } from "next";
import { siteLegal } from "@/content/legal";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${siteLegal.website}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
