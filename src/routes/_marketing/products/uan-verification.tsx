import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, ShieldCheck, Webhook } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/uan-verification")({
  head: () => ({
    meta: [
      { title: "UAN Verification — DOVIXORA" },
      { name: "description", content: "Resolve a UAN and pull verified EPFO employment history in real time." },
    ],
  }),
  component: UanVerificationPage,
});

const flow: FlowStep[] = [
  { icon: Briefcase, label: "PAN / Aadhaar / Mobile", sublabel: "Resolves the UAN", tone: "cyan" },
  { icon: Webhook, label: "Verification API", sublabel: "POST /v1/verify/uan", tone: "blue" },
  { icon: Briefcase, label: "DOVIXORA Employment", sublabel: "EPFO records engine", tone: "blue", emphasis: true },
  { icon: ShieldCheck, label: "Verified", sublabel: "Employment confirmed", tone: "emerald" },
];

const features = [
  { title: "UAN resolution", description: "Resolve a Universal Account Number from just a PAN, Aadhaar or mobile number." },
  { title: "Complete employer history", description: "Every employer, joining and exit date, in one chronological record." },
  { title: "PF contribution recency", description: "See when the last contribution landed — a live signal of current employment." },
  { title: "Income-fraud risk reduction", description: "Cross-check declared employment against verified EPFO records." },
];

function UanVerificationPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA UAN VERIFICATION"
        title="Verify UAN. Confirm real employment history."
        description="Resolve a UAN from PAN, Aadhaar or mobile number and pull verified EPFO employment history — employer, tenure and contribution recency."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="Verifications" value="1.4M+" tone="ink" hint="Processed" />
            <MetricCard label="Verified Rate" value="96.9%" tone="emerald" hint="First attempt" />
            <MetricCard label="Latency" value="2.0s" tone="cyan" hint="Median" />
            <MetricCard label="Source" value="EPFO" tone="blue" hint="Official records" />
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="Why UAN Verification"
          title={
            <>
              Employment history, <span className="gradient-text">verified not declared.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="product-card tone-cyan">
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
        title="Verify your first UAN today."
        description="Sandbox verification is free. Ship compliant onboarding in days, not months."
      />
    </>
  );
}
