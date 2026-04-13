import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  /** Additional query params to preserve (e.g., { q: "search" }) */
  searchParams?: Record<string, string>;
}

export function Pagination({ currentPage, totalPages, basePath, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  function buildHref(page: number): string {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  }

  // Build page number range: show up to 7 page links
  const pages: (number | "ellipsis")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1 mt-12">
      {/* Previous */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-on-surface-variant/40 cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
          Previous
        </span>
      )}

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, i) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-on-surface-variant">
              ...
            </span>
          ) : page === currentPage ? (
            <span
              key={page}
              className="inline-flex items-center justify-center w-10 h-10 text-sm font-bold bg-primary text-on-primary rounded-lg"
            >
              {page}
            </span>
          ) : (
            <Link
              key={page}
              href={buildHref(page)}
              className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-on-surface-variant/40 cursor-not-allowed">
          Next
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}
