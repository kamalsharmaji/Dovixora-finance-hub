import type { TooltipProps } from "recharts";

function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-line bg-panel px-3 py-2 shadow-lg">
      {label && <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>}
      <div className="mt-1 grid gap-0.5">
        {payload.map((entry) => (
          <div key={entry.dataKey as string} className="flex items-center gap-2 text-xs">
            <span className="size-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-muted-foreground">{entry.name}</span>
            <span className="ml-auto font-mono font-semibold text-foreground">
              {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ChartTooltip };
