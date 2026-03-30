"use client";

import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
}

/**
 * CodeBlock - Styled code block with copy functionality
 *
 * @example
 * <CodeBlock
 *   language="json"
 *   filename="schema.json"
 *   code={`{ "type": "object" }`}
 * />
 */
export function CodeBlock({
  code,
  language = "text",
  filename,
  showLineNumbers = false,
  highlightLines = [],
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className={cn("my-6 rounded-lg overflow-hidden shadow-card", className)}>
      {/* Header */}
      {(filename || language !== "text") && (
        <div className="flex items-center justify-between px-4 py-2 bg-surface-container-highest border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-secondary/40" />
              <div className="w-3 h-3 rounded-full bg-outline-variant/40" />
              <div className="w-3 h-3 rounded-full bg-tertiary/40" />
            </div>
            {filename && (
              <span className="text-xs font-mono text-on-surface-variant">
                {filename}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {language !== "text" && (
              <span className="text-xs font-mono text-on-surface-variant uppercase">
                {language}
              </span>
            )}
            <button
              onClick={handleCopy}
              className="p-1.5 hover:bg-surface-container transition-colors rounded"
              title="Copy code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-tertiary" />
              ) : (
                <Copy className="w-4 h-4 text-on-surface-variant" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Code content */}
      <div className="bg-on-surface overflow-x-auto">
        <pre className="p-4 md:p-6">
          <code className="font-mono text-sm leading-relaxed">
            {lines.map((line, index) => (
              <div
                key={index}
                className={cn(
                  "flex",
                  highlightLines.includes(index + 1) &&
                    "bg-primary/10 -mx-4 md:-mx-6 px-4 md:px-6"
                )}
              >
                {showLineNumbers && (
                  <span className="select-none text-surface/40 w-8 flex-shrink-0 text-right pr-4">
                    {index + 1}
                  </span>
                )}
                <span className="text-surface/90 flex-1">{line || " "}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
