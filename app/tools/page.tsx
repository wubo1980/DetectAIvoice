"use client";

import { useMemo, useState } from "react";

import { NewsletterSection } from "@/components/ui/NewsletterSection";
import { ToolCard } from "@/components/ui/ToolCard";
import { tools } from "@/src/data/tools";

type Audience = "consumer" | "enterprise" | "media";

const audienceCopy: Record<
  Audience,
  {
    title: string;
    description: string;
  }
> = {
  consumer: {
    title: "Regular person",
    description: "Focus on simple workflows, quick checks, and easy-to-understand results."
  },
  enterprise: {
    title: "Business or team",
    description: "Prioritize integration, auditability, and incident response workflows."
  },
  media: {
    title: "Media or verification",
    description: "Look for strong benchmark claims, analyst context, and repeatable review steps."
  }
};

/**
 * Returns a recommended tool list for the selected audience.
 */
function getToolsForAudience(audience: Audience) {
  switch (audience) {
    case "consumer":
      return tools.filter((tool) => tool.price !== "Paid");
    case "enterprise":
      return tools.filter((tool) => tool.platform.includes("API"));
    case "media":
      return tools.filter((tool) => tool.accuracy !== "N/A");
    default:
      return tools;
  }
}

/**
 * Renders the interactive tool hub with audience-based recommendations.
 */
export default function ToolsPage(): JSX.Element {
  const [audience, setAudience] = useState<Audience>("consumer");
  const recommendedTools = useMemo(() => getToolsForAudience(audience), [audience]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel sm:p-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Tool Hub
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Find the Right AI Voice Detector for You
          </h1>
          <p className="text-base leading-8 text-slate-600">
            Not sure which tool to use? Tell us who you are and we&apos;ll point you in
            the right direction.
          </p>
          <p className="text-sm text-slate-500">
            All detection tools are probabilistic, not deterministic. Use multiple
            signals for verification.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <button
            type="button"
            onClick={() => setAudience("consumer")}
            className={`rounded-[2rem] border px-5 py-6 text-left transition ${
              audience === "consumer"
                ? "border-brand bg-brand text-white"
                : "border-slate-200 bg-slate-50 text-slate-800 hover:border-brand/30"
            }`}
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
              Consumer
            </span>
            <span className="mt-3 block text-base font-semibold">
              I&apos;m a regular person
            </span>
          </button>
          <button
            type="button"
            onClick={() => setAudience("enterprise")}
            className={`rounded-[2rem] border px-5 py-6 text-left transition ${
              audience === "enterprise"
                ? "border-brand bg-brand text-white"
                : "border-slate-200 bg-slate-50 text-slate-800 hover:border-brand/30"
            }`}
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
              Enterprise
            </span>
            <span className="mt-3 block text-base font-semibold">
              I run a business or team
            </span>
          </button>
          <button
            type="button"
            onClick={() => setAudience("media")}
            className={`rounded-[2rem] border px-5 py-6 text-left transition ${
              audience === "media"
                ? "border-brand bg-brand text-white"
                : "border-slate-200 bg-slate-50 text-slate-800 hover:border-brand/30"
            }`}
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
              Verification
            </span>
            <span className="mt-3 block text-base font-semibold">
              I work in media or verification
            </span>
          </button>
        </div>

        <div className="mt-8 rounded-[2rem] bg-slate-50 p-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            {audienceCopy[audience].title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {audienceCopy[audience].description}
          </p>
        </div>
      </section>

      <section className="mt-10">
        {recommendedTools.length > 0 ? (
          <div className="grid gap-6">
            {recommendedTools.map((tool) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
                href={`/blog/${tool.reviewArticleSlug || "best-ai-voice-detectors-2026"}`}
                variant="horizontal"
                ctaLabel="Read Full Review"
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-panel">
            Tool recommendations will appear here after the initial tool dataset is added
            in the content phase.
          </div>
        )}
      </section>

      <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel">
        <h2 className="text-2xl font-semibold text-slate-900">Frequently asked questions</h2>
        <div className="mt-6 space-y-4">
          {[
            {
              question: "Are AI voice detectors accurate?",
              answer:
                "Accuracy varies by audio quality, model type, language, and evaluation method. Treat results as one signal among several."
            },
            {
              question: "What is the difference between free and paid tools?",
              answer:
                "Free tools often focus on quick checks, while paid tools usually add APIs, better support, audit features, or stronger enterprise workflows."
            },
            {
              question: "Can I detect deepfake audio without any tools?",
              answer:
                "Sometimes, yes. Context, callback verification, source provenance, and inconsistent speech patterns can all help flag suspicious audio."
            },
            {
              question: "How do I know which tool is right for me?",
              answer:
                "Start with your use case. Consumers often need simplicity, while businesses and verification teams usually need integration and documentation."
            }
          ].map((item) => (
            <details
              key={item.question}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <NewsletterSection
          title="Get the Monthly Voice Fraud Report"
          description="Your email is the easiest way to receive our latest voice fraud updates and detector guides."
        />
      </section>
    </div>
  );
}
