import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";

import { Sidebar, type SidebarHeading } from "@/components/layout/Sidebar";
import { ArticleShareBar } from "@/components/ui/ArticleShareBar";
import { BlogCard } from "@/components/ui/BlogCard";
import { NewsletterSection } from "@/components/ui/NewsletterSection";
import { ShareableImage } from "@/components/ui/ShareableImage";
import { ToolCard } from "@/components/ui/ToolCard";
import { articles, type Article } from "@/src/data/articles";
import { siteConfig } from "@/src/data/site";
import { tools } from "@/src/data/tools";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Converts a heading or text fragment into a stable anchor ID.
 */
function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Flattens React children into plain text for heading IDs.
 */
function extractText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map((child) => extractText(child)).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as { props?: { children?: ReactNode } }).props?.children);
  }

  return "";
}

/**
 * Extracts second and third level headings from markdown content.
 */
function getHeadings(content: string): SidebarHeading[] {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^###?\s+/, "");

      return {
        id: slugify(text),
        text,
        level
      } as SidebarHeading;
    });
}

/**
 * Returns the matching article record for a slug.
 */
function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

/**
 * Returns related articles from the same category while excluding the current one.
 */
function getRelatedArticles(article: Article): Article[] {
  return articles
    .filter((candidate) => candidate.category === article.category && candidate.slug !== article.slug)
    .slice(0, 3);
}

/**
 * Resolves a readable category label from the configured site taxonomy.
 */
function getCategoryName(categorySlug: string): string {
  return (
    siteConfig.categories.find((category) => category.slug === categorySlug)?.name ||
    categorySlug
  );
}

/**
 * Checks whether a markdown link points to an internal site route.
 */
function isInternalHref(href: string): boolean {
  return href.startsWith("/");
}

/**
 * Renders a level-two markdown heading with an anchor ID.
 */
function HeadingTwo({ children }: { children?: ReactNode }): JSX.Element {
  const text = extractText(children);
  const id = slugify(text);

  return (
    <h2 id={id} className="mt-10 text-2xl font-semibold tracking-tight text-slate-900">
      {children}
    </h2>
  );
}

/**
 * Renders a level-three markdown heading with an anchor ID.
 */
function HeadingThree({ children }: { children?: ReactNode }): JSX.Element {
  const text = extractText(children);
  const id = slugify(text);

  return (
    <h3 id={id} className="mt-8 text-xl font-semibold tracking-tight text-slate-900">
      {children}
    </h3>
  );
}

/**
 * Generates static paths for article pages when content exists.
 */
export function generateStaticParams(): { slug: string }[] {
  return articles.map((article) => ({
    slug: article.slug
  }));
}

/**
 * Generates article metadata using the configured site URL.
 */
export async function generateMetadata({
  params
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article not found | DetectAIvoice"
    };
  }

  return {
    title: `${article.title} | DetectAIvoice`,
    description: article.description,
    alternates: {
      canonical: `${siteConfig.url}/blog/${article.slug}`
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${siteConfig.url}/blog/${article.slug}`,
      type: "article",
      siteName: siteConfig.name,
      publishedTime: article.date,
      authors: [article.author],
      images: [article.image || siteConfig.ogImage]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [article.image || siteConfig.ogImage]
    }
  };
}

/**
 * Renders the article detail page with markdown content, TOC, and related sections.
 */
export default async function ArticlePage({
  params
}: ArticlePageProps): Promise<JSX.Element> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article);
  const relatedTools = tools.filter((tool) => article.tools?.includes(tool.slug));
  const headings = getHeadings(article.content);
  const articleUrl = `${siteConfig.url}/blog/${article.slug}`;
  const categoryName = getCategoryName(article.category);
  const redditPlaceholderComment = `<!-- REDDIT SHARE: 运营人员可在此链接到相关 Reddit 帖子
     格式: https://www.reddit.com/r/{subreddit}/comments/{post_id}/
     当前文章适合的 Reddit 板块:
     - r/cybersecurity (企业安全类文章)
     - r/scams (消费者安全类文章)
     - r/technews (行业报告类文章)
     - r/privacy (隐私保护类文章)
-->`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: "DetectAIvoice Team"
    },
    publisher: {
      "@type": "Organization",
      name: "DetectAIvoice"
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="rounded-full bg-brand/10 px-3 py-1 font-semibold text-brand">
              {categoryName}
            </span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900">
            {article.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">{article.description}</p>

          {article.image ? (
            <div className="mt-8">
              <ShareableImage
                src={article.image}
                alt={article.title}
                pageUrl={articleUrl}
                description={article.title}
                className="border border-slate-200"
              />
            </div>
          ) : null}

          <details className="mt-8 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 xl:hidden">
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
              Jump to a section
            </summary>
            {headings.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={`block rounded-2xl px-3 py-2 text-sm hover:bg-white hover:text-brand ${
                        heading.level === 3 ? "pl-6 text-slate-500" : "text-slate-700"
                      }`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-slate-500">
                The article outline will appear here when markdown headings are available.
              </p>
            )}
          </details>

          <div className="prose-content mt-10 space-y-6 text-base text-slate-700">
            <ReactMarkdown
              components={{
                h2: HeadingTwo,
                h3: HeadingThree,
                p: ({ children }) => <p className="text-base leading-8">{children}</p>,
                ul: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
                li: ({ children }) => <li>{children}</li>,
                a: ({ href = "#", children }) =>
                  isInternalHref(href) ? (
                    <Link href={href} className="font-medium text-brand underline underline-offset-4">
                      {children}
                    </Link>
                  ) : (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-brand underline underline-offset-4"
                    >
                      {children}
                    </a>
                  ),
                img: ({ src, alt }) =>
                  src ? (
                    <div className="my-8">
                      <ShareableImage
                        src={src}
                        alt={alt || article.title}
                        pageUrl={articleUrl}
                        description={article.title}
                        className="border border-slate-200"
                      />
                    </div>
                  ) : (
                    <></>
                  )
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {relatedTools.length > 0 ? (
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">Referenced tools</h2>
              <div className="grid gap-6">
                {relatedTools.map((tool) => (
                  <ToolCard
                    key={tool.slug}
                    tool={tool}
                    href={tool.url}
                    variant="horizontal"
                    ctaLabel="Read Full Review"
                  />
                ))}
              </div>
            </section>
          ) : null}

          {relatedArticles.length > 0 ? (
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-semibold text-slate-900">Related articles</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedArticles.map((item) => (
                  <BlogCard key={item.slug} article={item} />
                ))}
              </div>
            </section>
          ) : null}

          <div
            aria-hidden="true"
            className="hidden"
            dangerouslySetInnerHTML={{ __html: redditPlaceholderComment }}
          />

          <div className="mt-12">
            <ArticleShareBar title={article.title} url={articleUrl} />
          </div>

          <div className="mt-12">
            <NewsletterSection />
          </div>
        </article>

        <div className="xl:sticky xl:top-28 xl:self-start">
          <Sidebar headings={headings} recommendedArticles={relatedArticles} />
        </div>
      </div>
    </div>
  );
}
