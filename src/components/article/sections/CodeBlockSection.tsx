'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockSectionProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlockSection({ code, language, filename }: CodeBlockSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-outline-variant">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 bg-surface-container-highest border-b border-outline-variant">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm font-mono text-on-surface-variant">
                {filename}
              </span>
            )}
            {language && !filename && (
              <span className="text-xs text-on-surface-variant uppercase">
                {language}
              </span>
            )}
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-surface-container-low transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Copy className="h-4 w-4 text-on-surface-variant" />
            )}
          </button>
        </div>
      )}

      <pre className="p-4 bg-surface-container-highest overflow-x-auto">
        <code className="text-sm font-mono text-on-surface">{code}</code>
      </pre>
    </div>
  );
}
