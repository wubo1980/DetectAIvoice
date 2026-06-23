"use client";

import { useState } from "react";

interface ArticleShareBarProps {
  title: string;
  url: string;
}

/**
 * Copies the provided text by using the Clipboard API when available and
 * falling back to a temporary textarea for older browsers.
 */
async function copyText(value: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard is not available in this environment.");
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

/**
 * Renders the article share bar with social links and a copy-link action.
 */
export function ArticleShareBar({
  title,
  url
}: ArticleShareBarProps): JSX.Element {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const shareLinks = [
    {
      label: "Twitter/X",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }
  ];

  /**
   * Copies the current article URL and exposes a short-lived success state.
   */
  async function handleCopy(): Promise<void> {
    try {
      await copyText(url);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 2000);
    }
  }

  return (
    <section className="space-y-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-2xl font-semibold text-slate-900">Share this article</h2>
      <div className="flex flex-wrap gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
          >
            {link.label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => void handleCopy()}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
          aria-live="polite"
        >
          {copyState === "copied"
            ? "Copied"
            : copyState === "error"
              ? "Copy failed"
              : "Copy Link"}
        </button>
      </div>
    </section>
  );
}
