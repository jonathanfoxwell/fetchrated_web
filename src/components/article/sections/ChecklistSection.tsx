'use client';

import { useState } from 'react';
import { Check, ClipboardCheck } from 'lucide-react';

interface ChecklistSectionProps {
  title?: string;
  icon?: string;
  items: { title: string; description?: string }[];
}

export function ChecklistSection({ title, items }: ChecklistSectionProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const progress = (checkedItems.size / items.length) * 100;

  return (
    <div className="bg-surface-container rounded-xl p-6 border border-outline-variant">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary-container rounded-lg">
          <ClipboardCheck className="h-5 w-5 text-primary" />
        </div>
        {title && (
          <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-surface-container-highest rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="space-y-3">
        {items.map((item, index) => {
          const isChecked = checkedItems.has(index);
          return (
            <li key={index}>
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-start gap-3 text-left group"
              >
                <div
                  className={`mt-0.5 flex-shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isChecked
                      ? 'bg-primary border-primary'
                      : 'border-outline-variant group-hover:border-primary'
                  }`}
                >
                  {isChecked && <Check className="h-3 w-3 text-on-primary" />}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-medium transition-colors ${
                      isChecked
                        ? 'text-on-surface-variant line-through'
                        : 'text-on-surface'
                    }`}
                  >
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-sm text-on-surface-variant mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
