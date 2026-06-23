import Link from "next/link";

import type { Tool } from "@/src/data/tools";

type ToolCardVariant = "compact" | "horizontal";

interface ToolCardProps {
  tool:
    | Tool
    | {
        slug: string;
        name: string;
        accuracy: string;
        bestFor: string;
        description?: string;
        price?: string;
      };
  href?: string;
  variant?: ToolCardVariant;
  ctaLabel?: string;
}

/**
 * Formats a star rating display using a five-star scale.
 */
function getRatingLabel(rating?: number): string {
  if (typeof rating !== "number") {
    return "New";
  }

  return `${rating.toFixed(1)} / 5`;
}

/**
 * Renders a reusable tool card for the homepage, tool hub, and article pages.
 */
export function ToolCard({
  tool,
  href,
  variant = "compact",
  ctaLabel
}: ToolCardProps): JSX.Element {
  const cardHref = href || "/tools";
  const priceLabel = "price" in tool && tool.price ? tool.price : "Learn more";
  const actionLabel = ctaLabel || (variant === "horizontal" ? "Read Full Review" : "View details");

  if (variant === "horizontal") {
    return (
      <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-panel">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(260px,1fr)_auto] xl:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold text-slate-900">{tool.name}</h2>
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                {priceLabel}
              </span>
            </div>
            {"description" in tool && tool.description ? (
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                {tool.description}
              </p>
            ) : null}
          </div>

          <dl className="grid gap-4 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-3">
            <div>
              <dt className="font-semibold text-slate-900">Accuracy</dt>
              <dd className="mt-1">{tool.accuracy}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Rating</dt>
              <dd className="mt-1">{"rating" in tool ? getRatingLabel(tool.rating) : "New"}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Best For</dt>
              <dd className="mt-1">{tool.bestFor}</dd>
            </div>
            {"platform" in tool && tool.platform?.length ? (
              <div className="sm:col-span-2 xl:col-span-3">
                <dt className="font-semibold text-slate-900">Platform</dt>
                <dd className="mt-1">{tool.platform.join(", ")}</dd>
              </div>
            ) : null}
          </dl>

          <div className="flex items-center xl:justify-end">
            <Link
              href={cardHref}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              {actionLabel}
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-slate-200 bg-white p-6 shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{tool.name}</h2>
          {"description" in tool && tool.description ? (
            <p className="mt-2 text-sm leading-7 text-slate-600">{tool.description}</p>
          ) : null}
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
          {priceLabel}
        </span>
      </div>

      <dl className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-slate-900">Accuracy</dt>
          <dd className="mt-1">{tool.accuracy}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-900">Best For</dt>
          <dd className="mt-1">{tool.bestFor}</dd>
        </div>
        {"rating" in tool ? (
          <div>
            <dt className="font-semibold text-slate-900">Rating</dt>
            <dd className="mt-1">{getRatingLabel(tool.rating)}</dd>
          </div>
        ) : null}
        {"platform" in tool && tool.platform?.length ? (
          <div>
            <dt className="font-semibold text-slate-900">Platform</dt>
            <dd className="mt-1">{tool.platform.join(", ")}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-6">
        <Link
          href={cardHref}
          className="inline-flex items-center text-sm font-semibold text-brand transition hover:text-brand-dark"
        >
          {actionLabel}
        </Link>
      </div>
    </article>
  );
}
