import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, ShieldCheck, Webhook } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/full-kyc")({
  head: () => ({
    meta: [
      { title: "Full KYC — DOVIXORA" },
      { name: "description", content: "Identity, address, biometric and Aadhaar-linkage checks orchestrated into a single KYC flow." },
    ],
  }),
  component: FullKycPage,
});

const flow: FlowStep[] = [
  { icon: BadgeCheck, label: "Identity + Address", sublabel: "Aadhaar, PAN, address proof", tone: "cyan" },
  { icon: Webhook, label: "Verification API", sublabel: "POST /v1/verify/kyc", tone: "blue" },
  { icon: BadgeCheck, label: "DOVIXORA KYC Engine", sublabel: "Orchestrated checks", tone: "blue", emphasis: true },
  { icon: ShieldCheck, label: "Verified", sublabel: "One consolidated status", tone: "emerald" },
];

const features = [
  { title: "Identity + address + biometric, unified", description: "Stop stitching five APIs together — one flow, one webhook, one verified status." },
  { title: "Liveness & face-match built in", description: "Confirm the applicant is real and matches their ID, in the same pass." },
  { title: "Aadhaar-linkage aware", description: "Every check is cross-referenced against Aadhaar-linked records where available." },
  { title: "CKYC-ready output", description: "Structured output ready to feed straight into CKYC registry submission." },
];

function FullKycPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA FULL KYC"
        title="One flow. Every KYC check that matters."
        description="Combine identity, address, biometric and Aadhaar-linkage checks into a single orchestrated KYC flow — instead of stitching five APIs together."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="KYC Flows" value="3.8M+" tone="ink" hint="Completed" />
            <MetricCard label="Verified Rate" value="98.1%" tone="emerald" hint="First attempt" />
            <MetricCard label="Latency" value="3.2s" tone="cyan" hint="End to end" />
            <MetricCard label="Checks Bundled" value="4-in-1" tone="blue" hint="One API call" />
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="Why Full KYC"
          title={
            <>
              Stop stitching APIs. <span className="gradient-text">Start with one flow.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="product-card tone-blue">
              <div className="icon-tile">
                <BadgeCheck className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductCTA
        title="Run your first Full KYC today."
        description="Sandbox verification is free. Ship compliant onboarding in days, not months."
      />
    </>
  );
}
