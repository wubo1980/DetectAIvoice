import { notFound } from "next/navigation";

import { BlogCard } from "@/components/ui/BlogCard";
import { Pagination } from "@/components/ui/Pagination";
import { articles } from "@/src/data/articles";
import { siteConfig } from "@/src/data/site";

const PAGE_SIZE = 9;

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    page?: string;
  }>;
}

/**
 * Parses the page number for a category archive and falls back safely.
 */
function getCurrentPage(rawPage?: string): number {
  const page = Number(rawPage);

  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.floor(page);
}

/**
 * Renders a category archive page with description, article grid, and pagination.
 */
export default async function CategoryPage({
  params,
  searchParams
}: CategoryPageProps): Promise<JSX.Element> {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const category = siteConfig.categories.find((item) => item.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const currentPage = getCurrentPage(resolvedSearchParams?.page);
  const categoryArticles = articles.filter((article) => article.category === category.slug);
  const totalPages = Math.max(1, Math.ceil(categoryArticles.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedArticles = categoryArticles.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Category</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
          {category.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          {category.description}
        </p>
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
            This category has no articles yet. It will populate after editorial content is
            loaded.
          </div>
        )}
      </section>

      <section className="mt-10">
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          basePath={`/category/${resolvedParams.slug}`}
        />
      </section>
    </div>
  );
}
