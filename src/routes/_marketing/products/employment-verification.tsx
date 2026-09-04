import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, CheckCircle2, IdCard, Webhook } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/employment-verification")({
  head: () => ({
    meta: [
      { title: "Employment Verification — DOVIXORA" },
      { name: "description", content: "Confirm employment history and income instantly." },
    ],
  }),
  component: EmploymentVerificationPage,
});

const flow: FlowStep[] = [
  { icon: IdCard, label: "Employee Details", sublabel: "UAN / employer ID", tone: "cyan" },
  { icon: Webhook, label: "Verification API", sublabel: "Employment & income checks", tone: "blue" },
  { icon: Briefcase, label: "DOVIXORA Employment Verification", sublabel: "Payroll & UAN lookup", tone: "blue", emphasis: true },
  { icon: CheckCircle2, label: "Verified", sublabel: "Employment confirmed", tone: "emerald" },
];

const features = [
  { title: "UAN & payroll checks", description: "Confirm current and past employment against payroll records." },
  { title: "Income verification", description: "Validate declared income for lending and onboarding decisions." },
  { title: "Employer history", description: "See a candidate's employment timeline in one structured response." },
  { title: "Consent-first design", description: "Every check runs with explicit, auditable candidate consent." },
];

function EmploymentVerificationPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA EMPLOYMENT VERIFICATION"
        title="Confirm employment and income in seconds."
        description="Confirm employment history and income instantly — built for lending, hiring and background checks."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="Checks Completed" value="2.1M+" tone="ink" />
            <MetricCard label="Verified Rate" value="94.6%" tone="emerald" hint="First attempt" />
            <MetricCard label="Latency" value="3.2s" tone="cyan" hint="Median" />
            <MetricCard label="Employers Covered" value="60K+" tone="blue" />
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="Why Employment Verification"
          title={
            <>
              Lend and hire <span className="gradient-text">with confidence.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="product-card tone-blue">
              <div className="icon-tile">
                <Briefcase className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductCTA
        title="Verify your first candidate today."
        description="Sandbox verification is free. Ship reliable employment checks in days, not months."
      />
    </>
  );
}
