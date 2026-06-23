import Link from "next/link";

import type { Article } from "@/src/data/articles";

export interface SidebarHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface SidebarProps {
  headings: SidebarHeading[];
  recommendedArticles: Article[];
}

/**
 * Renders the article sidebar with a table of contents and recommended posts.
 */
export function Sidebar({
  headings,
  recommendedArticles
}: SidebarProps): JSX.Element {
  return (
    <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-panel">
      <section aria-labelledby="sidebar-toc-title" className="space-y-4">
        <h2
          id="sidebar-toc-title"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
        >
          On This Page
        </h2>
        {headings.length > 0 ? (
          <nav aria-label="Article table of contents">
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className={`block rounded-2xl px-3 py-2 text-sm transition hover:bg-brand/5 hover:text-brand ${
                      heading.level === 3 ? "pl-7 text-slate-500" : "text-slate-700"
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <p className="text-sm text-slate-500">
            The table of contents will appear here once article content is added.
          </p>
        )}
      </section>

      <section aria-labelledby="sidebar-related-title" className="space-y-4">
        <h2
          id="sidebar-related-title"
          className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
        >
          Recommended Articles
        </h2>
        {recommendedArticles.length > 0 ? (
          <ul className="space-y-3">
            {recommendedArticles.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="block rounded-3xl border border-slate-200 p-4 text-sm transition hover:border-brand hover:bg-brand/5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {article.date}
                  </p>
                  <p className="mt-2 font-semibold leading-6 text-slate-900">{article.title}</p>
                  <p className="mt-2 text-slate-500">{article.readTime}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">
            Related articles will appear here as the editorial library grows.
          </p>
        )}
      </section>
    </aside>
  );
}
