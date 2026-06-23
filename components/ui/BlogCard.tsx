import Link from "next/link";

import type { Article } from "@/src/data/articles";
import { siteConfig } from "@/src/data/site";
import { tools } from "@/src/data/tools";

interface BlogCardProps {
  article: Article;
}

/**
 * Resolves the human-friendly category name for an article card.
 */
function getCategoryName(categorySlug: string): string {
  return (
    siteConfig.categories.find((category) => category.slug === categorySlug)?.name ||
    categorySlug
  );
}

/**
 * Resolves a tool slug into a display label when tool data is available.
 */
function getToolLabel(toolSlug: string): string {
  return tools.find((tool) => tool.slug === toolSlug)?.name || toolSlug;
}

/**
 * Renders a compact article card for grids and related content sections.
 */
export function BlogCard({ article }: BlogCardProps): JSX.Element {
  return (
    <article className="group flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-panel transition hover:-translate-y-1 hover:border-brand/30">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
          {getCategoryName(article.category)}
        </span>
        <span className="text-xs font-medium text-slate-500">{article.date}</span>
        <span className="text-xs font-medium text-slate-500">{article.readTime}</span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          <Link
            href={`/blog/${article.slug}`}
            className="transition group-hover:text-brand hover:text-brand"
          >
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{article.description}</p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 text-sm text-slate-500">
        <span>{article.author}</span>
        <span>Read article</span>
      </div>

      {article.tools && article.tools.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tools.slice(0, 3).map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {getToolLabel(tool)}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
