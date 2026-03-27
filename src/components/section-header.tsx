import { ReactNode } from "react";

interface SectionHeaderProps {
  /** Section title - supports JSX for italic spans etc. */
  title: ReactNode;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Alignment */
  align?: "left" | "center";
  /** Optional action buttons on the right */
  actions?: ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  actions,
  className,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  if (actions) {
    return (
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12 ${className ?? ""}`}>
        <div className={`space-y-4 ${alignClass}`}>
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">
            {title}
          </h2>
          {subtitle && (
            <p className="text-on-surface-variant max-w-lg">
              {subtitle}
            </p>
          )}
        </div>
        <div className="flex gap-2 shrink-0">
          {actions}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 mb-12 ${alignClass} ${className ?? ""}`}>
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-on-surface-variant ${align === "center" ? "max-w-2xl mx-auto" : "max-w-lg"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
