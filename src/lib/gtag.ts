declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export interface GtagEvent {
  action: string;
  category: string;
  label: string;
  value?: number;
}

const DEFAULT_GA_ID = "G-JBJ7MM0HWJ";

/**
 * Returns the configured GA measurement ID with a safe fallback.
 */
export function getGaId(): string {
  return process.env.NEXT_PUBLIC_GA_ID || DEFAULT_GA_ID;
}

/**
 * Tracks a page view when the gtag script is available.
 */
export function pageview(url: string): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", getGaId(), {
    page_path: url
  });
}

/**
 * Sends a custom GA event when analytics is available in the browser.
 */
export function event({ action, category, label, value }: GtagEvent): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value
  });
}
