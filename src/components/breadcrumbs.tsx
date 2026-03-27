import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, showHome = true, className }: BreadcrumbsProps) {
  const allItems = showHome
    ? [{ label: "Home", href: "/" }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isHome = index === 0 && showHome;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-on-surface-variant" />
              )}
              {isLast ? (
                <span className="font-medium text-on-surface" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                >
                  {isHome && <Home className="w-4 h-4" />}
                  {!isHome && item.label}
                </Link>
              ) : (
                <span className="text-on-surface-variant flex items-center gap-1">
                  {isHome && <Home className="w-4 h-4" />}
                  {!isHome && item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
