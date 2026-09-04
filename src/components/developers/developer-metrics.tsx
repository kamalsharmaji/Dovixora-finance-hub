import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { MetricCard } from "@/components/products/metric-card";

export interface DeveloperMetric {
  icon: LucideIcon;
  value: string;
  label: string;
  tone?: "blue" | "cyan" | "emerald" | "ink";
}

interface DeveloperMetricsProps {
  metrics: readonly DeveloperMetric[];
}

function DeveloperMetrics({ metrics }: DeveloperMetricsProps) {
  return (
    <section className="border-y border-line bg-panel/30">
      <Container className="py-12">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              icon={metric.icon}
              value={metric.value}
              label={metric.label}
              tone={metric.tone ?? "ink"}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export { DeveloperMetrics };
