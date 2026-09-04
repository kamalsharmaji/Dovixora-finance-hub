import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface DonutSlice {
  name: string;
  value: number;
  color: string;
}

interface StatusDonutProps {
  data: readonly DonutSlice[];
  centerLabel?: string;
}

function formatCompact(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${Math.round(value / 1000)}k`;
  return value.toLocaleString();
}

function StatusDonut({ data, centerLabel = "Total" }: StatusDonutProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={[...data]} dataKey="value" nameKey="name" innerRadius={64} outerRadius={92} paddingAngle={3} strokeWidth={0}>
            {data.map((slice) => (
              <Cell key={slice.name} fill={slice.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-bold text-foreground">{formatCompact(total)}</span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">{centerLabel}</span>
      </div>
    </div>
  );
}

export { StatusDonut };
export type { DonutSlice };
