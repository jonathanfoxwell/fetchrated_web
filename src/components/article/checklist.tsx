import { cn } from "@/lib/utils";
import { Check, type LucideIcon } from "lucide-react";

export interface ChecklistItemProps {
  title: string;
  description?: string;
  checked?: boolean;
  icon?: LucideIcon;
}

export interface ChecklistProps {
  title?: string;
  icon?: LucideIcon;
  items: ChecklistItemProps[];
  className?: string;
}

/**
 * ChecklistItem - Individual checklist item
 */
export function ChecklistItem({
  title,
  description,
  checked = true,
  icon: IconComponent,
}: ChecklistItemProps) {
  return (
    <div className="flex items-start gap-4 group">
      <div
        className={cn(
          "mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
          checked
            ? "border-primary/20 group-hover:bg-primary/10"
            : "border-outline-variant group-hover:bg-surface-container"
        )}
      >
        {checked ? (
          <Check className="w-3.5 h-3.5 text-primary" />
        ) : IconComponent ? (
          <IconComponent className="w-3.5 h-3.5 text-on-surface-variant" />
        ) : null}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-lg mb-1 text-on-surface">{title}</h4>
        {description && (
          <p className="text-on-surface-variant leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Checklist - Styled checklist component matching the design references
 *
 * @example
 * <Checklist
 *   title="The Essential Checklist"
 *   items={[
 *     { title: "Accreditation", description: "Ensure facility holds standards" },
 *     { title: "Modern Equipment", description: "In-house labs and X-rays" },
 *   ]}
 * />
 */
export function Checklist({
  title,
  icon: TitleIcon,
  items,
  className,
}: ChecklistProps) {
  return (
    <div
      className={cn(
        "my-8 p-8 md:p-10 bg-surface-container-lowest shadow-card rounded-lg relative overflow-hidden",
        className
      )}
    >
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] translate-x-12 -translate-y-12" />

      {title && (
        <h3 className="font-headline text-2xl md:text-3xl mb-8 flex items-center gap-3 relative">
          {TitleIcon && <TitleIcon className="w-6 h-6 text-primary" />}
          {title}
        </h3>
      )}

      <div className="space-y-6 relative">
        {items.map((item, index) => (
          <ChecklistItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
