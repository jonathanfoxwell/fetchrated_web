"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";
import { Check, AlertCircle, Info, Lightbulb, AlertTriangle } from "lucide-react";

interface ArticleContentProps {
  content: string;
  className?: string;
}

/**
 * ArticleContent - Renders markdown content with FetchRated styling
 *
 * Supports standard markdown plus custom syntax:
 * - :::callout{type="info"} ... ::: - Callout boxes
 * - :::tip ... ::: - Pro tips
 * - :::warning ... ::: - Warnings
 * - > [!NOTE] - GitHub-style alerts
 */
export function ArticleContent({ content, className }: ArticleContentProps) {
  const components: Components = {
    // Headings
    h1: ({ children, ...props }) => (
      <h1
        className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-on-surface mt-12 mb-6 first:mt-0"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="font-headline text-3xl font-bold tracking-tight text-on-surface mt-12 mb-4 pb-3 border-b border-outline-variant/30"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="font-headline text-2xl font-semibold text-on-surface mt-8 mb-3"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="font-headline text-xl font-semibold text-on-surface mt-6 mb-2"
        {...props}
      >
        {children}
      </h4>
    ),
    h5: ({ children, ...props }) => (
      <h5
        className="font-bold text-lg text-on-surface mt-4 mb-2"
        {...props}
      >
        {children}
      </h5>
    ),
    h6: ({ children, ...props }) => (
      <h6
        className="font-bold text-base text-on-surface-variant mt-4 mb-2 uppercase tracking-wide"
        {...props}
      >
        {children}
      </h6>
    ),

    // Paragraphs
    p: ({ children, ...props }) => {
      // Check for lead paragraph (first paragraph often)
      const content = String(children);
      if (content.startsWith("[lead]")) {
        return (
          <p
            className="text-xl text-on-surface-variant leading-relaxed mb-6"
            {...props}
          >
            {content.replace("[lead]", "")}
          </p>
        );
      }
      return (
        <p
          className="text-base text-on-surface/90 leading-relaxed mb-4"
          {...props}
        >
          {children}
        </p>
      );
    },

    // Links
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        className="text-primary font-medium hover:text-primary-container underline underline-offset-2 decoration-primary/30 hover:decoration-primary transition-colors"
        {...props}
      >
        {children}
      </a>
    ),

    // Emphasis
    strong: ({ children, ...props }) => (
      <strong className="font-bold text-on-surface" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="font-headline italic" {...props}>
        {children}
      </em>
    ),

    // Lists
    ul: ({ children, ...props }) => (
      <ul className="my-4 ml-6 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 ml-6 space-y-2 list-decimal" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-on-surface/90 leading-relaxed pl-2 relative before:content-[''] before:absolute before:-left-4 before:top-[0.6em] before:w-1.5 before:h-1.5 before:bg-primary/60 before:rounded-full" {...props}>
        {children}
      </li>
    ),

    // Blockquotes - handle as callouts or pull quotes
    blockquote: ({ children, ...props }) => {
      const content = String(children);

      // GitHub-style alerts
      if (content.includes("[!NOTE]") || content.includes("[!INFO]")) {
        return (
          <div className="my-6 p-6 bg-tertiary/5 border-l-4 border-tertiary rounded-r-lg">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-tertiary flex-shrink-0 mt-0.5" />
              <div className="text-on-surface/90 [&>p]:mb-0">
                {children}
              </div>
            </div>
          </div>
        );
      }

      if (content.includes("[!TIP]")) {
        return (
          <div className="my-6 p-6 bg-tertiary/10 border-l-4 border-tertiary rounded-r-lg">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-tertiary flex-shrink-0 mt-0.5" />
              <div className="text-on-surface/90 [&>p]:mb-0">
                {children}
              </div>
            </div>
          </div>
        );
      }

      if (content.includes("[!WARNING]")) {
        return (
          <div className="my-6 p-6 bg-secondary/5 border-l-4 border-secondary rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="text-on-surface/90 [&>p]:mb-0">
                {children}
              </div>
            </div>
          </div>
        );
      }

      if (content.includes("[!IMPORTANT]") || content.includes("[!CAUTION]")) {
        return (
          <div className="my-6 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-on-surface/90 [&>p]:mb-0">
                {children}
              </div>
            </div>
          </div>
        );
      }

      // Default blockquote - styled as pull quote
      return (
        <blockquote
          className="my-8 pl-6 border-l-4 border-primary/30 italic"
          {...props}
        >
          <div className="font-headline text-xl text-on-surface-variant leading-relaxed [&>p]:mb-0">
            {children}
          </div>
        </blockquote>
      );
    },

    // Code
    code: ({ className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      const isInline = !match;

      if (isInline) {
        return (
          <code
            className="px-1.5 py-0.5 bg-surface-container-high text-primary font-mono text-sm rounded"
            {...props}
          >
            {children}
          </code>
        );
      }

      return (
        <code className={cn("font-mono text-sm", className)} {...props}>
          {children}
        </code>
      );
    },
    pre: ({ children, ...props }) => (
      <pre
        className="my-6 p-6 bg-on-surface text-surface rounded-lg overflow-x-auto font-mono text-sm leading-relaxed"
        {...props}
      >
        {children}
      </pre>
    ),

    // Tables
    table: ({ children, ...props }) => (
      <div className="my-6 overflow-x-auto rounded-lg border border-outline-variant/30">
        <table className="w-full border-collapse" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-surface-container-high" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-3 text-left text-sm font-bold text-on-surface border-b border-outline-variant/30"
        {...props}
      >
        {children}
      </th>
    ),
    tbody: ({ children, ...props }) => (
      <tbody className="divide-y divide-outline-variant/20" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr
        className="hover:bg-surface-container-low transition-colors"
        {...props}
      >
        {children}
      </tr>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 text-sm text-on-surface/90" {...props}>
        {children}
      </td>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-outline-variant/50 to-transparent" />
    ),

    // Images
    img: ({ src, alt, ...props }) => (
      <figure className="my-8">
        <img
          src={src}
          alt={alt}
          className="w-full rounded-lg shadow-card"
          {...props}
        />
        {alt && (
          <figcaption className="mt-3 text-sm text-on-surface-variant text-center italic">
            {alt}
          </figcaption>
        )}
      </figure>
    ),

    // Task lists (GFM)
    input: ({ checked, ...props }) => (
      <span
        className={cn(
          "inline-flex items-center justify-center w-5 h-5 mr-2 rounded border-2 transition-colors",
          checked
            ? "bg-primary border-primary text-white"
            : "border-outline-variant bg-surface"
        )}
      >
        {checked && <Check className="w-3 h-3" />}
      </span>
    ),
  };

  return (
    <div
      className={cn(
        "article-content max-w-none",
        "[&>*:first-child]:mt-0",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
