import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type MetricTone = "blue" | "cyan" | "emerald" | "ink";

const toneTextClasses: Record<MetricTone, string> = {
  blue: "metric-blue",
  cyan: "metric-cyan",
  emerald: "metric-emerald",
  ink: "metric-ink",
};

interface MetricCardProps {
  label: string;
  value: string;
  hint?: string;
  tone?: MetricTone;
  icon?: LucideIcon;
  className?: string;
}

function MetricCard({ label, value, hint, tone = "ink", icon: Icon, className }: MetricCardProps) {
  return (
    <div className={cn("dashboard-metric", className)}>
      <span className="flex items-center gap-1.5">
        {Icon && <Icon className="size-3 text-muted-foreground" />}
        {label}
      </span>
      <strong className={toneTextClasses[tone]}>{value}</strong>
      {hint && <small>{hint}</small>}
    </div>
  );
}

export { MetricCard };
