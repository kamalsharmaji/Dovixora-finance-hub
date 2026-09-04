import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import type { FlowTone } from "@/components/products/flow-node";

const toneTextClasses: Record<FlowTone, string> = {
  blue: "text-blue-bright",
  cyan: "text-cyan",
  emerald: "text-emerald",
};

export interface SolutionMetric {
  icon: LucideIcon;
  value: string;
  label: string;
  tone?: FlowTone;
}

interface SolutionMetricsProps {
  metrics: readonly SolutionMetric[];
}

const columnClasses: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
};

function SolutionMetrics({ metrics }: SolutionMetricsProps) {
  return (
    <section className="border-y border-line bg-panel/30">
      <Container className="py-12">
        <div className={`grid grid-cols-1 gap-3 ${columnClasses[metrics.length] ?? "sm:grid-cols-3"}`}>
          {metrics.map((metric) => (
            <div key={metric.label} className="dashboard-metric text-center sm:text-left">
              <span className="flex items-center justify-center gap-1.5 sm:justify-start">
                <metric.icon className="size-3.5 text-muted-foreground" />
              </span>
              <strong className={toneTextClasses[metric.tone ?? "blue"]}>{metric.value}</strong>
              <small className="normal-case tracking-normal text-muted-foreground">{metric.label}</small>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { SolutionMetrics };
