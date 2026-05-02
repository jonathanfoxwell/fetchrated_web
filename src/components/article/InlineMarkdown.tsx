import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { processDynamicTokens } from "./dynamic-text";

interface InlineMarkdownProps {
  children: string;
}

// Render react-markdown's <p> as a fragment so the helper can drop into any
// inline-flow container (p, span, td, th, h3, blockquote) without producing
// nested <p> tags. Inline elements (strong, em, a, code) render normally.
const inlineComponents = {
  p: ({ children }: { children?: ReactNode }) => <>{children}</>,
};

/**
 * Render a short snippet of markdown without an outer paragraph wrapper.
 *
 * Use this for any short text field on a section component that should
 * support **bold**, *italic*, and [links](url) — callout body, numbered
 * section content, checklist titles/descriptions, FAQ Q&A, table cells,
 * key-metric labels, and pull-quote text. Drops into the existing layout
 * element so wrappers like <p>, <th>, <td>, <h3> stay intact.
 *
 * For multi-paragraph block content (e.g. summary-box content with line
 * breaks), use ReactMarkdown directly instead — this helper deliberately
 * flattens paragraph breaks.
 */
export function InlineMarkdown({ children }: InlineMarkdownProps) {
  return (
    <ReactMarkdown components={inlineComponents}>
      {processDynamicTokens(children)}
    </ReactMarkdown>
  );
}
