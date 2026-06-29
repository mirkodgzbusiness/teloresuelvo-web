import type { MetadataRoute } from "next";
import { siteLegal } from "@/content/legal";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${siteLegal.website}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Bytespider",
          "PetalBot",
          "SemrushBot",
          "AhrefsBot",
          "DotBot",
          "MJ12bot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
