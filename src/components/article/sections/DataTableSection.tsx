interface DataTableSectionProps {
  title?: string;
  columns: { key: string; header: string; align?: string }[];
  data: Record<string, string>[];
}

export function DataTableSection({ title, columns, data }: DataTableSectionProps) {
  return (
    <div className="border border-outline-variant rounded-xl overflow-hidden">
      {title && (
        <div className="px-6 py-4 bg-surface-container border-b border-outline-variant">
          <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-container-low">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-6 py-3 text-sm font-semibold text-on-surface border-b border-outline-variant ${
                    col.align === 'center'
                      ? 'text-center'
                      : col.align === 'right'
                      ? 'text-right'
                      : 'text-left'
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-surface-container-low transition-colors">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-4 text-sm text-on-surface-variant ${
                      col.align === 'center'
                        ? 'text-center'
                        : col.align === 'right'
                        ? 'text-right'
                        : 'text-left'
                    }`}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
