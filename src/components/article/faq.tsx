"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode;
  defaultOpen?: boolean;
}

export interface FAQProps {
  title?: string;
  items: FAQItemProps[];
  className?: string;
}

/**
 * FAQItem - Individual FAQ accordion item
 */
export function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "bg-surface-container-low transition-colors",
        isOpen && "border-l-4 border-primary"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full p-6 flex justify-between items-center text-left hover:bg-surface-container-high transition-colors",
          isOpen && "pb-3"
        )}
        aria-expanded={isOpen}
      >
        <span
          className={cn("text-lg pr-4", isOpen ? "font-bold" : "font-medium")}
        >
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 flex-shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 pb-6">
          {typeof answer === "string" ? (
            <p className="text-on-surface-variant leading-relaxed">{answer}</p>
          ) : (
            answer
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * FAQ - Accordion-style FAQ section
 *
 * @example
 * <FAQ
 *   title="Registry Inquiries"
 *   items={[
 *     { question: "What does 'Verified' status entail?", answer: "..." },
 *     { question: "How often are practices re-evaluated?", answer: "..." },
 *   ]}
 * />
 */
export function FAQ({ title, items, className }: FAQProps) {
  return (
    <div className={cn("my-12", className)}>
      {title && (
        <h2 className="font-headline text-3xl md:text-4xl text-center mb-10">
          {title.split(" ").map((word, i) => {
            // Make every other word italic for the editorial style
            const isItalic = i % 3 === 1;
            return isItalic ? (
              <span key={i} className="italic">
                {word}{" "}
              </span>
            ) : (
              <span key={i}>{word} </span>
            );
          })}
        </h2>
      )}

      <div className="max-w-3xl mx-auto space-y-4">
        {items.map((item, index) => (
          <FAQItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
