import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Boxes,
  Building2,
  Eye,
  FileCheck,
  Landmark,
  Lock,
  Network,
  Radio,
  Server,
  Workflow,
} from "lucide-react";

import { FlowConnector, FlowNode } from "@/components/products/flow-node";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";
import { SolutionBenefits } from "@/components/solutions/solution-benefits";
import { SolutionMetrics, type SolutionMetric } from "@/components/solutions/solution-metrics";

export const Route = createFileRoute("/_marketing/solutions/enterprises")({
  head: () => ({
    meta: [
      { title: "Enterprise Solutions — DOVIXORA" },
      { name: "description", content: "Infrastructure built for enterprise-scale operations." },
    ],
  }),
  component: EnterprisesPage,
});

const enterpriseSystems = [
  { icon: Server, label: "ERP" },
  { icon: Building2, label: "CRM" },
  { icon: Boxes, label: "Internal Tools" },
] as const;

const metrics: readonly SolutionMetric[] = [
  { icon: Activity, value: "99.99%", label: "Uptime", tone: "blue" },
  { icon: Eye, value: "24/7", label: "Monitoring", tone: "cyan" },
  { icon: Lock, value: "Secure", label: "Infrastructure", tone: "emerald" },
];

const benefits = [
  { icon: Activity, label: "High availability" },
  { icon: Lock, label: "Role-based access" },
  { icon: FileCheck, label: "Audit trails" },
  { icon: Radio, label: "Webhooks" },
  { icon: Eye, label: "Monitoring" },
  { icon: Network, label: "Scalable APIs" },
];

function EnterpriseArchitecture() {
  return (
    <div
      className="glow-panel mx-auto max-w-md rounded-2xl border border-line bg-panel/50 p-6 backdrop-blur-md sm:p-8"
      role="img"
      aria-label="Enterprise Systems (ERP, CRM, Internal Tools) connect through DOVIXORA Infrastructure to Verification APIs and Banks and Partners"
    >
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        Enterprise Systems
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {enterpriseSystems.map((system) => (
          <div
            key={system.label}
            className="flex flex-col items-center gap-1.5 rounded-lg border border-line bg-background/40 px-2 py-3 text-center"
          >
            <system.icon className="size-4 text-cyan" />
            <span className="font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
              {system.label}
            </span>
          </div>
        ))}
      </div>
      <FlowConnector />
      <FlowNode icon={Network} label="DOVIXORA Infrastructure" sublabel="Orchestration & security" tone="blue" emphasis />
      <FlowConnector />
      <FlowNode icon={Workflow} label="Verification APIs" sublabel="Unified product surface" tone="cyan" />
      <FlowConnector />
      <FlowNode icon={Landmark} label="Banks and Partners" sublabel="Settlement & rails" tone="emerald" />
    </div>
  );
}

function EnterprisesPage() {
  return (
    <>
      <ProductHero
        eyebrow="FOR ENTERPRISE"
        title="Verification infrastructure built for enterprise-scale operations."
        description="Verify employees, vendors and partners across fragmented systems through secure, scalable and observable infrastructure."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "Talk to Our Team", to: "/company/contact" }}
        visual={<EnterpriseArchitecture />}
      />

      <SolutionMetrics metrics={metrics} />

      <SolutionBenefits
        kicker="Enterprise Capabilities"
        title={
          <>
            Built for how enterprises <span className="gradient-text">actually operate.</span>
          </>
        }
        items={benefits}
      />

      <ProductCTA
        title="Build the next generation of verification workflows."
        description="Connect your business to the infrastructure powering modern verification workflows."
        primaryLabel="Start Building"
        secondaryLabel="Talk to Our Team"
      />
    </>
  );
}
