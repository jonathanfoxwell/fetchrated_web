import { cn } from "@/lib/utils";

export interface DataTableColumn {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  data: Record<string, React.ReactNode>[];
  title?: string;
  caption?: string;
  striped?: boolean;
  compact?: boolean;
  className?: string;
}

/**
 * DataTable - Styled data table for audit scores, matrices, etc.
 *
 * @example
 * <DataTable
 *   title="Audit Scoring Matrix"
 *   columns={[
 *     { key: "criteria", header: "Criteria" },
 *     { key: "weight", header: "Weight", align: "center" },
 *     { key: "score", header: "Score", align: "right" },
 *   ]}
 *   data={[
 *     { criteria: "Clinical Standards", weight: "45%", score: "9.2" },
 *   ]}
 * />
 */
export function DataTable({
  columns,
  data,
  title,
  caption,
  striped = true,
  compact = false,
  className,
}: DataTableProps) {
  return (
    <div className={cn("my-8", className)}>
      {title && (
        <h4 className="font-headline text-xl mb-4 flex items-center gap-2">
          <span className="text-primary font-mono text-sm">◈</span>
          {title}
        </h4>
      )}

      <div className="overflow-x-auto rounded-lg border border-outline-variant/30 shadow-card">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-surface-container-high">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "text-sm font-bold text-on-surface border-b border-outline-variant/30",
                    compact ? "px-3 py-2" : "px-4 py-3",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.align !== "center" && col.align !== "right" && "text-left"
                  )}
                  style={{ width: col.width }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "transition-colors hover:bg-surface-container-low",
                  striped && rowIndex % 2 === 1 && "bg-surface-container/50"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "text-sm text-on-surface/90 border-b border-outline-variant/20",
                      compact ? "px-3 py-2" : "px-4 py-3",
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right"
                    )}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {caption && (
        <p className="mt-2 text-sm text-on-surface-variant italic">{caption}</p>
      )}
    </div>
  );
}
