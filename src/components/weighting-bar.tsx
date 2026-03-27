interface WeightingItem {
  label: string;
  percentage: number;
}

interface WeightingBarProps {
  items: WeightingItem[];
  className?: string;
}

export function WeightingBars({ items, className }: WeightingBarProps) {
  return (
    <div className={`space-y-8 ${className ?? ""}`}>
      {items.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-end">
            <span className="font-bold text-sm tracking-widest uppercase">
              {item.label}
            </span>
            <span className="text-3xl font-headline italic text-primary">
              {item.percentage}%
            </span>
          </div>
          <div className="w-full h-4 bg-surface-container-high rounded-full overflow-hidden">
            <div
              className="h-full bg-signature-gradient transition-all duration-500"
              style={{ width: `${item.percentage}%`, opacity: 1 - (index * 0.15) }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface CriteriaItem {
  category: string;
  factor: string;
  measurement: string;
  impact: "critical" | "high" | "vital" | "moderate";
}

interface CriteriaMatrixProps {
  criteria: CriteriaItem[];
  className?: string;
}

const impactStyles = {
  critical: "bg-tertiary/10 text-tertiary",
  high: "bg-secondary/10 text-secondary",
  vital: "bg-primary/10 text-primary",
  moderate: "bg-outline/10 text-outline",
};

export function CriteriaMatrix({ criteria, className }: CriteriaMatrixProps) {
  return (
    <div className={`overflow-x-auto ${className ?? ""}`}>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b-2 border-primary">
            <th className="py-6 px-4 font-headline text-2xl font-bold italic text-primary w-1/4">
              Factor
            </th>
            <th className="py-6 px-4 font-headline text-2xl font-bold text-on-surface w-2/4">
              Measurement
            </th>
            <th className="py-6 px-4 font-headline text-2xl font-bold text-on-surface w-1/4 text-right">
              Impact
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant/20">
          {criteria.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-surface-container-low transition-colors"
            >
              <td className="py-8 px-4">
                <span className="font-bold text-sm tracking-widest uppercase block mb-1 text-on-surface-variant">
                  {item.category}
                </span>
                <span className="text-lg font-bold">{item.factor}</span>
              </td>
              <td className="py-8 px-4 text-on-surface-variant leading-relaxed">
                {item.measurement}
              </td>
              <td className="py-8 px-4 text-right">
                <span
                  className={`inline-block px-3 py-1 text-xs font-bold rounded-sm uppercase ${impactStyles[item.impact]}`}
                >
                  {item.impact}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
