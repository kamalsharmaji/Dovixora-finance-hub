import { Check, Minus } from "lucide-react";

export interface ComparisonRow {
  label: string;
  values: readonly (boolean | string)[];
}

interface FeatureComparisonProps {
  columns: readonly string[];
  rows: readonly ComparisonRow[];
}

function FeatureComparison({ columns, rows }: FeatureComparisonProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line bg-panel/60">
            <th scope="col" className="px-5 py-3.5 text-left font-display text-sm font-semibold text-foreground">
              Feature
            </th>
            {columns.map((column) => (
              <th key={column} scope="col" className="px-5 py-3.5 text-center font-display text-sm font-semibold text-foreground">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.label} className={rowIndex % 2 === 1 ? "bg-panel/30" : undefined}>
              <th scope="row" className="px-5 py-3 text-left text-sm font-medium text-muted-foreground">
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td key={index} className="px-5 py-3 text-center">
                  {typeof value === "boolean" ? (
                    value ? (
                      <Check className="mx-auto size-4 text-emerald" aria-label="Included" />
                    ) : (
                      <Minus className="mx-auto size-4 text-muted-foreground/40" aria-label="Not included" />
                    )
                  ) : (
                    <span className="text-sm text-foreground">{value}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { FeatureComparison };
