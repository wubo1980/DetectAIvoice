import Link from "next/link";

import { BlogCard } from "@/components/ui/BlogCard";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { NewsletterSection } from "@/components/ui/NewsletterSection";
import { ToolCard } from "@/components/ui/ToolCard";
import { articles } from "@/src/data/articles";
import { siteConfig } from "@/src/data/site";

/**
 * Returns the homepage featured articles.
 */
function getFeaturedArticles() {
  return articles.filter((article) => article.featured).slice(0, 4);
}

/**
 * Returns the primary homepage categories.
 */
function getHomepageCategories() {
  return siteConfig.categories.slice(0, 3);
}

/**
 * Renders the landing page with hero, category, article, and tool sections.
 */
export default function HomePage(): JSX.Element {
  const featuredArticles = getFeaturedArticles();
  const homepageCategories = getHomepageCategories();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DetectAIvoice",
    description:
      "Your guide to detecting AI voice deepfakes. Tool comparisons, safety tips, and monthly fraud reports.",
    url: siteConfig.url,
    sameAs: []
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <section className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.28),transparent_30%),radial-gradient(circle_at_left_center,rgba(14,165,233,0.18),transparent_35%)]" />
        <div className="absolute inset-x-0 top-16 h-40 bg-[repeating-radial-gradient(circle_at_center,rgba(255,255,255,0.14)_0_2px,transparent_2px_16px)] opacity-30" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl space-y-8">
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
              Consumer safety, enterprise security, and media verification
            </span>
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Is That Voice Real? Detect AI Voice Clones Before It&apos;s Too Late
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Expert guides, real tool comparisons, and monthly deepfake scam alerts
                all in one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/tools"
                className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-7 py-3 text-sm font-semibold text-white transition hover:from-orange-600 hover:to-red-600"
              >
                Explore Detection Tools -&gt;
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse the blog
              </Link>
            </div>
          </div>

          <div className="grid gap-4 self-end sm:grid-cols-3 lg:grid-cols-1">
            {[
              {
                label: "1 in 4 Americans have received a deepfake voice call",
                source: "Source: Hiya 2026"
              },
              {
                label: "$900M+ lost to AI-powered scams in 2025",
                source: "Source: FBI"
              },
              {
                label: "77% of targeted victims lost money",
                source: "Source: McAfee"
              }
            ].map((item) => (
              <article
                key={item.label}
                className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur"
              >
                <p className="text-base font-semibold leading-7 text-white">{item.label}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
                  {item.source}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Start Here</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">What Do You Need?</h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {homepageCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Editorial
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Latest Guides and Reviews
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-brand">
            View all articles
          </Link>
        </div>

        {featuredArticles.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {featuredArticles.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            Featured articles will appear here after the editorial content is loaded in
            the next phase.
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Quick Picks
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Quick Tool Picks</h2>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-brand">
            View All Tools -&gt;
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {siteConfig.tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} variant="compact" />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <NewsletterSection
          title="Get the Monthly Voice Fraud Report"
          description="Get our monthly Voice Fraud Report delivered to your inbox."
        />
      </section>
    </div>
  );
}
