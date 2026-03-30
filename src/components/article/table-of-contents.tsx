"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface TableOfContentsProps {
  items?: TableOfContentsItem[];
  /** If true, automatically extracts headings from the page */
  auto?: boolean;
  /** Selector for container to extract headings from */
  containerSelector?: string;
  title?: string;
  sticky?: boolean;
  className?: string;
}

/**
 * TableOfContents - Document outline / table of contents
 *
 * @example
 * // Manual items
 * <TableOfContents
 *   items={[
 *     { id: "intro", title: "Introduction", level: 2 },
 *     { id: "methods", title: "Methods", level: 2 },
 *   ]}
 * />
 *
 * // Auto-extract from page
 * <TableOfContents auto containerSelector=".article-content" />
 */
export function TableOfContents({
  items: providedItems,
  auto = false,
  containerSelector = ".article-content",
  title = "Document Outline",
  sticky = true,
  className,
}: TableOfContentsProps) {
  const [items, setItems] = useState<TableOfContentsItem[]>(providedItems || []);
  const [activeId, setActiveId] = useState<string>("");

  // Auto-extract headings from page
  useEffect(() => {
    if (!auto) return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    const headings = container.querySelectorAll("h2, h3, h4");
    const extractedItems: TableOfContentsItem[] = Array.from(headings).map(
      (heading) => ({
        id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || "",
        title: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
      })
    );

    setItems(extractedItems);
  }, [auto, containerSelector]);

  // Track active section on scroll
  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      className={cn(
        "p-6 bg-surface-container-low rounded-lg border border-outline-variant/20",
        sticky && "md:sticky md:top-24",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-outline-variant/20">
        <List className="w-4 h-4 text-on-surface-variant" />
        <h4 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          {title}
        </h4>
      </div>

      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(item.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                  setActiveId(item.id);
                }
              }}
              className={cn(
                "block py-1.5 text-sm transition-colors",
                item.level === 2 && "pl-0",
                item.level === 3 && "pl-4",
                item.level === 4 && "pl-8",
                activeId === item.id
                  ? "text-primary font-medium border-l-2 border-primary -ml-px pl-3"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
