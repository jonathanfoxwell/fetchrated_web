"use client";

import { useState } from "react";
import { Share2, Printer, Check } from "lucide-react";

interface ArticleActionsProps {
  title: string;
  excerpt?: string;
  url: string;
}

export function ArticleActions({ title, excerpt, url }: ArticleActionsProps) {
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");

  async function handleShare() {
    // Use Web Share API on mobile/supported browsers; fall back to clipboard.
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text: excerpt, url });
        return;
      } catch {
        // User dismissed the share sheet, or share failed silently — fall through
        // to clipboard so they still get a working result.
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setShareState("copied");
        setTimeout(() => setShareState("idle"), 2000);
        return;
      } catch {
        // Clipboard blocked (rare). Fall through and prompt manually.
      }
    }
    // Last resort: window.prompt so the user can copy the URL themselves.
    if (typeof window !== "undefined") {
      window.prompt("Copy this link to share:", url);
    }
  }

  function handlePrint() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share this article"
        className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors print:hidden"
      >
        {shareState === "copied" ? (
          <>
            <Check className="w-4 h-4" />
            Copied
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            Share
          </>
        )}
      </button>
      <button
        type="button"
        onClick={handlePrint}
        aria-label="Print this article"
        className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors print:hidden"
      >
        <Printer className="w-4 h-4" />
        Print
      </button>
    </div>
  );
}
