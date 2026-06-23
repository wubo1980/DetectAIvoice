import Link from "next/link";

import type { Category } from "@/src/data/site";

interface CategoryCardProps {
  category: Category;
}

/**
 * Returns a visual glyph and supporting label for each core category.
 */
function getCategoryMeta(slug: string): { glyph: string; eyebrow: string } {
  switch (slug) {
    case "consumer-safety":
      return {
        glyph: "SH",
        eyebrow: "Protect yourself and family"
      };
    case "enterprise":
      return {
        glyph: "EN",
        eyebrow: "Deployment guides for teams"
      };
    case "tool-reviews":
      return {
        glyph: "RV",
        eyebrow: "Compare tools with confidence"
      };
    default:
      return {
        glyph: "GD",
        eyebrow: "Explore the topic"
      };
  }
}

/**
 * Renders a category entry card linking into the category archive.
 */
export function CategoryCard({ category }: CategoryCardProps): JSX.Element {
  const meta = getCategoryMeta(category.slug);

  return (
    <article className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-panel transition hover:-translate-y-1 hover:border-brand/30">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-sm font-bold uppercase tracking-[0.2em] text-brand">
        {meta.glyph}
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {meta.eyebrow}
      </p>
      <h2 className="mt-4 text-2xl font-semibold text-slate-900">{category.name}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
      <Link
        href={`/category/${category.slug}`}
        className="mt-6 inline-flex items-center text-sm font-semibold text-brand transition group-hover:text-brand-dark hover:text-brand-dark"
      >
        Explore category
      </Link>
    </article>
  );
}
