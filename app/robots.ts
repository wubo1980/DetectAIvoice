import type { MetadataRoute } from "next";

import { siteConfig } from "@/src/data/site";

/**
 * Generates the site's robots rules and canonical sitemap location.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
