import { cn } from "@/lib/utils";

export interface NumberedSectionProps {
  number: number | string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * NumberedSection - Section with decorative numbering (01, 02, 03)
 *
 * @example
 * <NumberedSection number={1} title="Procedural Audit Requirements">
 *   Content here...
 * </NumberedSection>
 */
export function NumberedSection({
  number,
  title,
  children,
  className,
}: NumberedSectionProps) {
  const formattedNumber =
    typeof number === "number" ? String(number).padStart(2, "0") : number;

  return (
    <section className={cn("my-12", className)}>
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-headline text-5xl md:text-6xl font-bold text-primary/20">
          {formattedNumber}
        </span>
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface flex-1">
          {title}
        </h2>
      </div>

      <div className="pl-0 md:pl-20">{children}</div>
    </section>
  );
}

interface NumberedStepsProps {
  steps: {
    title: string;
    content: React.ReactNode;
  }[];
  startFrom?: number;
  className?: string;
}

/**
 * NumberedSteps - Multiple numbered sections in sequence
 */
export function NumberedSteps({
  steps,
  startFrom = 1,
  className,
}: NumberedStepsProps) {
  return (
    <div className={className}>
      {steps.map((step, index) => (
        <NumberedSection
          key={index}
          number={startFrom + index}
          title={step.title}
        >
          {step.content}
        </NumberedSection>
      ))}
    </div>
  );
}
