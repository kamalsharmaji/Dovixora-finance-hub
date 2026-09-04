import { Activity, CheckCircle2, Lock, Shield } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const pillars = [
  { icon: Shield, title: "Security", description: "Bank-level encryption in transit and at rest.", tone: "emerald" },
  { icon: CheckCircle2, title: "Reliability", description: "Redundant infrastructure built for critical workflows.", tone: "blue" },
  { icon: Activity, title: "Observability", description: "Real-time visibility into every request and system.", tone: "cyan" },
  { icon: Lock, title: "Compliance-ready", description: "Architecture designed around audit and compliance needs.", tone: "emerald" },
] as const;

const toneClasses: Record<(typeof pillars)[number]["tone"], string> = {
  emerald: "bg-emerald/10 text-emerald",
  blue: "bg-blue/10 text-blue",
  cyan: "bg-cyan/10 text-cyan",
};

function SolutionTrust() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
      <SectionHeading
        align="center"
        kicker="Trust & Security"
        title={
          <>
            Infrastructure you can <span className="gradient-text">build on.</span>
          </>
        }
      />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="security-card">
            <div className={`icon-tile ${toneClasses[pillar.tone]}`}>
              <pillar.icon className="size-5" />
            </div>
            <h3 className="mt-5 font-display font-bold">{pillar.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export { SolutionTrust };
