import Link from "next/link";

import { BlogCard } from "@/components/ui/BlogCard";
import { Pagination } from "@/components/ui/Pagination";
import { articles } from "@/src/data/articles";
import { siteConfig } from "@/src/data/site";

const PAGE_SIZE = 9;

interface BlogPageProps {
  searchParams?: Promise<{
    page?: string;
    category?: string;
  }>;
}

/**
 * Parses the requested page number and falls back to the first page for invalid input.
 */
function getCurrentPage(rawPage?: string): number {
  const page = Number(rawPage);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
}

/**
 * Returns the filtered and date-sorted article list for the archive page.
 */
function getFilteredArticles(category?: string) {
  const filtered = category ? articles.filter((article) => article.category === category) : articles;

  return [...filtered].sort((left, right) => {
    return new Date(right.date).getTime() - new Date(left.date).getTime();
  });
}

/**
 * Renders the main blog archive with category filters and pagination.
 */
export default async function BlogPage({
  searchParams
}: BlogPageProps): Promise<JSX.Element> {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const selectedCategory = resolvedSearchParams?.category;
  const currentPage = getCurrentPage(resolvedSearchParams?.page);
  const filteredArticles = getFilteredArticles(selectedCategory);
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + PAGE_SIZE);
  const basePath = selectedCategory ? `/blog?category=${selectedCategory}` : "/blog";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Archive</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">All Articles</h1>
        <p className="max-w-3xl text-base leading-8 text-slate-600">
          Browse the latest guides, tool reviews, and deepfake voice safety explainers.
        </p>
      </section>

      <section className="mt-8 flex gap-3 overflow-x-auto pb-2" aria-label="Category filters">
        <Link
          href="/blog"
          className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${
            !selectedCategory
              ? "bg-brand text-white"
              : "border border-slate-200 bg-white text-slate-700"
          }`}
        >
          All
        </Link>
        {siteConfig.categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog?category=${category.slug}`}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${
              selectedCategory === category.slug
                ? "bg-brand text-white"
                : "border border-slate-200 bg-white text-slate-700"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </section>

      <section className="mt-10">
        {paginatedArticles.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {paginatedArticles.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-panel">
            Article content has not been loaded yet. This page will populate after the
            editorial dataset is added.
          </div>
        )}
      </section>

      <section className="mt-10">
        <Pagination currentPage={safePage} totalPages={totalPages} basePath={basePath} />
      </section>
    </div>
  );
}
