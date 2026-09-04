import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
  trend?: { value: string; direction: "up" | "down" };
}

/** Advanced stat card — colored icon tile + big value + trend line, independent of the
 * site's single-accent palette (this view is deliberately more colorful, per design brief). */
function KpiCard({ icon: Icon, label, value, color, trend }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{label}</span>
        <span
          className="grid size-9 shrink-0 place-items-center rounded-xl"
          style={{ background: `color-mix(in oklab, ${color} 14%, transparent)`, color }}
        >
          <Icon className="size-[18px]" />
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-bold text-foreground">{value}</p>
      {trend && (
        <p className="mt-1.5 flex items-center gap-1 text-xs">
          <span
            className="flex items-center gap-0.5 font-semibold"
            style={{ color: trend.direction === "up" ? "var(--success)" : "var(--error)" }}
          >
            {trend.direction === "up" ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {trend.value}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </p>
      )}
    </div>
  );
}

export { KpiCard };
