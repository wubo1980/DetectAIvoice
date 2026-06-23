"use client";

import { useState } from "react";

interface NewsletterSectionProps {
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = "Get the Monthly Voice Fraud Report";
const DEFAULT_DESCRIPTION =
  "Stay current on new AI voice scam patterns, detector updates, and practical verification tips.";
const MAILTO_BASE = "mailto:hello@detectaivoice.vercel.app";

/**
 * Builds a placeholder mailto URL so the form stays useful before a real email
 * service is connected.
 */
function buildMailtoHref(email: string): string {
  const body = email
    ? `Please subscribe this email to the Monthly Voice Fraud Report:%0D%0A%0D%0A${encodeURIComponent(email)}`
    : "Please subscribe me to the Monthly Voice Fraud Report.";

  return `${MAILTO_BASE}?subject=Monthly%20Voice%20Fraud%20Report&body=${body}`;
}

/**
 * Renders the reusable newsletter sign-up section used across site entry pages.
 */
export function NewsletterSection({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION
}: NewsletterSectionProps): JSX.Element {
  const [email, setEmail] = useState("");

  /**
   * Opens the placeholder mailto workflow with the current input value.
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    window.location.href = buildMailtoHref(email);
  }

  return (
    <section className="rounded-[2rem] border border-brand/30 bg-white p-8 shadow-panel sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Newsletter
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
        </div>
        <form className="grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" className="sr-only">
            Your email
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email"
            className="min-h-12 rounded-full border border-brand/30 px-5 text-sm outline-none ring-brand transition focus:ring-2"
          />
          <button
            type="submit"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
