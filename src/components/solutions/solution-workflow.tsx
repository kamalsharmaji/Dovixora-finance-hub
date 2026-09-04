import type { LucideIcon } from "lucide-react";

import { FlowConnector, FlowNode, type FlowTone } from "@/components/products/flow-node";
import type { FlowStep } from "@/components/products/product-architecture";

export interface WorkflowBranch {
  icon: LucideIcon;
  label: string;
  tone?: FlowTone;
}

const branchToneClasses: Record<FlowTone, string> = {
  blue: "bg-blue/10 text-blue",
  cyan: "bg-cyan/10 text-cyan",
  emerald: "bg-emerald/10 text-emerald",
};

interface SolutionWorkflowProps {
  steps: readonly FlowStep[];
  branches: readonly WorkflowBranch[];
  result?: FlowStep;
}

function SolutionWorkflow({ steps, branches, result }: SolutionWorkflowProps) {
  const label = `Workflow: ${steps.map((step) => step.label).join(" to ")}, fanning out to ${branches
    .map((branch) => branch.label)
    .join(", ")}${result ? `, resolving to ${result.label}` : ""}`;

  return (
    <div
      className="glow-panel mx-auto max-w-2xl rounded-2xl border border-line bg-panel/50 p-6 backdrop-blur-md sm:p-8"
      role="img"
      aria-label={label}
    >
      <div className="mx-auto max-w-xs">
        {steps.map((step) => (
          <div key={step.label}>
            <FlowNode {...step} />
            <FlowConnector />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-line pt-5 sm:grid-cols-4">
        {branches.map((branch) => (
          <div key={branch.label} className="flex flex-col items-center gap-2 text-center">
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <span className={`grid size-10 place-items-center rounded-lg ${branchToneClasses[branch.tone ?? "blue"]}`}>
              <branch.icon className="size-4" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              {branch.label}
            </span>
          </div>
        ))}
      </div>

      {result && (
        <>
          <div className="mx-auto mt-2 h-6 w-px bg-line" aria-hidden="true" />
          <div className="mx-auto max-w-xs">
            <FlowNode {...result} />
          </div>
        </>
      )}
    </div>
  );
}

export { SolutionWorkflow };
