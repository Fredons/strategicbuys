import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants/site";

export default function robots(): MetadataRoute.Robots {
  const publicDisallow = ["/admin/", "/api/", "/login"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: publicDisallow,
      },
      // AI Search Bots — explicitly allowed for AI visibility
      {
        userAgent: "GPTBot",
        allow: ["/", "/llms.txt"],
        disallow: publicDisallow,
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/", "/llms.txt"],
        disallow: publicDisallow,
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/llms.txt"],
        disallow: publicDisallow,
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/llms.txt"],
        disallow: publicDisallow,
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/llms.txt"],
        disallow: publicDisallow,
      },
      {
        userAgent: "Applebot-Extended",
        allow: ["/", "/llms.txt"],
        disallow: publicDisallow,
      },
      {
        userAgent: "GoogleOther",
        allow: ["/", "/llms.txt"],
        disallow: publicDisallow,
      },
      {
        userAgent: "CCBot",
        allow: ["/", "/llms.txt"],
        disallow: publicDisallow,
      },
      {
        userAgent: "cohere-ai",
        allow: ["/", "/llms.txt"],
        disallow: publicDisallow,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
