import { CheckCircle, Circle, LucideIcon } from "lucide-react";

interface ChecklistItem {
  label: string;
  completed?: boolean;
}

interface VerificationChecklistProps {
  title?: string;
  items: ChecklistItem[];
  className?: string;
}

export function VerificationChecklist({
  title = "Verification Checklist",
  items,
  className,
}: VerificationChecklistProps) {
  return (
    <div className={`bg-card p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] border border-outline-variant/10 ${className ?? ""}`}>
      <h3 className="font-bold text-xs uppercase tracking-[0.3em] text-primary mb-10">
        {title}
      </h3>
      <ul className="space-y-6">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between pb-6 border-b border-outline-variant/10 last:border-0"
          >
            <span className="font-medium text-on-surface">{item.label}</span>
            {item.completed !== false ? (
              <CheckCircle className="w-5 h-5 text-tertiary" />
            ) : (
              <Circle className="w-5 h-5 text-outline-variant" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface ProtocolItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface AssessmentProtocolProps {
  items: ProtocolItemProps[];
  className?: string;
}

export function AssessmentProtocol({ items, className }: AssessmentProtocolProps) {
  return (
    <div className={`space-y-4 ${className ?? ""}`}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex items-start gap-4 p-6 bg-surface border border-outline-variant/10 rounded-sm"
          >
            <Icon className="w-5 h-5 text-primary mt-0.5 shrink-0" style={{ fill: "currentColor" }} />
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-1">
                {item.title}
              </h4>
              <p className="text-sm text-on-surface-variant">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
