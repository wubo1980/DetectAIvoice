import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

/**
 * Builds a pagination href while keeping the first page on the clean base path.
 */
function buildPageHref(basePath: string, page: number): string {
  if (page <= 1) {
    return basePath;
  }

  return basePath.includes("?")
    ? `${basePath}&page=${page}`
    : `${basePath}?page=${page}`;
}

/**
 * Renders accessible previous and next pagination controls.
 */
export function Pagination({
  currentPage,
  totalPages,
  basePath
}: PaginationProps): JSX.Element | null {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-panel"
    >
      <Link
        href={buildPageHref(basePath, currentPage - 1)}
        aria-disabled={currentPage <= 1}
        className={`rounded-full px-5 py-2.5 text-sm font-semibold ${
          currentPage <= 1
            ? "pointer-events-none bg-slate-100 text-slate-400"
            : "bg-brand text-white hover:bg-brand-dark"
        }`}
      >
        Previous
      </Link>
      <p className="rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
        Page {currentPage} of {totalPages}
      </p>
      <Link
        href={buildPageHref(basePath, currentPage + 1)}
        aria-disabled={currentPage >= totalPages}
        className={`rounded-full px-5 py-2.5 text-sm font-semibold ${
          currentPage >= totalPages
            ? "pointer-events-none bg-slate-100 text-slate-400"
            : "bg-brand text-white hover:bg-brand-dark"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
