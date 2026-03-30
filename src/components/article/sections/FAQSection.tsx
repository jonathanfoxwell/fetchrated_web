'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  title?: string;
  items: { question: string; answer: string }[];
}

export function FAQSection({ title, items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border border-outline-variant/10 rounded-xl overflow-hidden shadow-card">
      {title && (
        <div className="flex items-center gap-2 px-6 py-4 bg-surface-container border-b border-outline-variant">
          <HelpCircle className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
        </div>
      )}

      <div className="divide-y divide-outline-variant">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-surface-container-low transition-colors"
              >
                <span className="font-medium text-on-surface">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-on-surface-variant flex-shrink-0 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-on-surface-variant">
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
