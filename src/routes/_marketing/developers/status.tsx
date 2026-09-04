import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Fingerprint, Landmark, Network, Radio, Workflow } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusServiceCard, type ServiceStatus } from "@/components/developers/status-service-card";

export const Route = createFileRoute("/_marketing/developers/status")({
  head: () => ({
    meta: [
      { title: "Platform Status — DOVIXORA" },
      { name: "description", content: "Real-time system health for the DOVIXORA platform." },
    ],
  }),
  component: StatusPage,
});

const services: readonly ServiceStatus[] = [
  { icon: Network, name: "API Gateway", status: "Operational" },
  { icon: CreditCard, name: "Payments API", status: "Operational" },
  { icon: Fingerprint, name: "Identity API", status: "Operational" },
  { icon: Landmark, name: "Banking API", status: "Operational" },
  { icon: Workflow, name: "Automation Engine", status: "Operational" },
  { icon: Radio, name: "Webhooks", status: "Operational" },
];

function StatusPage() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-2xl">
        <span className="section-kicker">Platform Status</span>
        <h1 className="section-title mt-3">
          Real-time <span className="gradient-text">system health.</span>
        </h1>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-emerald/30 bg-emerald/5 px-5 py-4">
        <span className="status-dot text-sm">
          <span /> All Systems Operational
        </span>
        <div className="text-right">
          <p className="font-display text-2xl font-extrabold text-foreground">99.99%</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Uptime</p>
        </div>
      </div>

      <div className="mt-12">
        <SectionHeading kicker="Services" title="Service status" />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StatusServiceCard key={service.name} service={service} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <SectionHeading kicker="History" title="Recent incidents" />
        <div className="mt-6 rounded-xl border border-line bg-panel/50 px-5 py-6 text-center">
          <p className="text-sm text-muted-foreground">No incidents reported.</p>
        </div>
      </div>
    </Container>
  );
}
