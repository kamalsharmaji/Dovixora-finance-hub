import type { LucideIcon } from "lucide-react";

import { FlowConnector, FlowNode, type FlowTone } from "@/components/products/flow-node";
import { cn } from "@/lib/utils";

export interface FlowStep {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  tone?: FlowTone;
  emphasis?: boolean;
}

interface ProductArchitectureProps {
  steps: FlowStep[];
  className?: string;
}

function ProductArchitecture({ steps, className }: ProductArchitectureProps) {
  return (
    <div
      className={cn(
        "glow-panel rounded-2xl border border-line bg-panel/50 p-5 backdrop-blur-md sm:p-6",
        className,
      )}
      role="img"
      aria-label={`Infrastructure flow: ${steps.map((step) => step.label).join(" to ")}`}
    >
      <div className="flex items-center justify-between border-b border-line pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          Request lifecycle
        </span>
        <span className="status-dot">
          <span /> Live
        </span>
      </div>
      <div className="mt-4">
        {steps.map((step, index) => (
          <div key={step.label}>
            <FlowNode {...step} />
            {index < steps.length - 1 && <FlowConnector />}
          </div>
        ))}
      </div>
    </div>
  );
}

export { ProductArchitecture };
