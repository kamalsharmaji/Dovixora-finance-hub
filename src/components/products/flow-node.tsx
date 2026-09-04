import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type FlowTone = "blue" | "cyan" | "emerald";

const toneClasses: Record<FlowTone, string> = {
  blue: "bg-blue/10 text-blue",
  cyan: "bg-cyan/10 text-cyan",
  emerald: "bg-emerald/10 text-emerald",
};

interface FlowNodeProps {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  tone?: FlowTone;
  emphasis?: boolean;
  className?: string;
}

function FlowNode({ icon: Icon, label, sublabel, tone = "blue", emphasis = false, className }: FlowNodeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-line bg-panel/70 px-4 py-3 backdrop-blur-sm",
        emphasis && "border-yellow-deep/50 shadow-[0_0_0_1px_rgba(245,197,24,0.25)]",
        className,
      )}
    >
      <span className={cn("grid size-9 shrink-0 place-items-center rounded-md", toneClasses[tone])}>
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="truncate font-display text-sm font-semibold text-foreground">{label}</p>
        {sublabel && <p className="truncate text-xs text-muted-foreground">{sublabel}</p>}
      </div>
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="flow-connector" aria-hidden="true">
      <span className="flow-connector-line" />
      <span className="flow-connector-dot" />
    </div>
  );
}

export { FlowNode, FlowConnector };
