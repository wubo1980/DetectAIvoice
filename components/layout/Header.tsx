"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { siteConfig } from "@/src/data/site";

/**
 * Returns whether the navigation item should be highlighted for the current route.
 */
function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Renders the global site header with desktop and mobile navigation.
 */
export function Header(): JSX.Element {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 font-semibold text-slate-900"
            aria-label="DetectAIvoice home"
          >
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-slate-950 text-white shadow-panel">
              <span className="absolute inset-0 bg-gradient-to-br from-brand via-blue-500 to-cyan-300 opacity-90" />
              <span className="absolute h-4 w-7 rounded-full border border-white/60" />
              <span className="absolute h-7 w-7 rounded-full border border-white/25" />
              <span className="relative text-xs font-bold tracking-[0.25em]">DV</span>
            </span>
            <span className="flex flex-col">
              <span className="text-lg leading-none">{siteConfig.name}</span>
              <span className="mt-1 text-xs font-medium text-slate-500">
                Voice clone detection guide
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
            {siteConfig.navigation.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-brand text-white shadow-lg shadow-blue-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="fixed inset-0 z-[60] bg-slate-950/95 px-6 py-6 text-white md:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">{siteConfig.name}</span>
            <button
              type="button"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>

          <nav
            className="mt-16 flex min-h-[70vh] flex-col justify-center gap-4"
            aria-label="Mobile navigation"
          >
            {siteConfig.navigation.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-3xl px-5 py-5 text-2xl font-semibold transition ${
                    active
                      ? "bg-white text-slate-950"
                      : "border border-white/10 bg-white/5 text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </>
  );
}
