import Link from "next/link";

import { siteConfig } from "@/src/data/site";

/**
 * Renders the global site footer and supporting navigation links.
 */
export function Footer(): JSX.Element {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
        <div className="space-y-3">
          <p className="text-lg font-semibold text-white">{siteConfig.name}</p>
          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            {siteConfig.description}
          </p>
        </div>

        <nav className="flex flex-col gap-3" aria-label="Footer navigation">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
