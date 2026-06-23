import Link from "next/link";

/**
 * Renders the global not-found page for unknown routes.
 */
export default function NotFound(): JSX.Element {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="w-full rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
