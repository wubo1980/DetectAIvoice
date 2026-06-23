import type { MetadataRoute } from "next";

import { articles } from "@/src/data/articles";
import { siteConfig } from "@/src/data/site";

/**
 * Generates a baseline sitemap that expands automatically as article content is added.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentTimestamp = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: currentTimestamp,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteConfig.url}/tools`,
      lastModified: currentTimestamp,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: currentTimestamp,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: currentTimestamp,
      changeFrequency: "monthly",
      priority: 0.7
    }
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteConfig.url}/blog/${article.slug}`,
    lastModified: article.date,
    changeFrequency: "weekly",
    priority: 0.7
  }));

  const categoryPages: MetadataRoute.Sitemap = siteConfig.categories.map((category) => ({
    url: `${siteConfig.url}/category/${category.slug}`,
    lastModified: currentTimestamp,
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [...staticPages, ...articlePages, ...categoryPages];
}
