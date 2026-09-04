import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, ShieldCheck, Webhook } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/pan-verification")({
  head: () => ({
    meta: [
      { title: "PAN Verification — DOVIXORA" },
      { name: "description", content: "Verify PAN directly against official records, from a lightweight check to a full profile pull." },
    ],
  }),
  component: PanVerificationPage,
});

const flow: FlowStep[] = [
  { icon: CreditCard, label: "PAN Number", sublabel: "Single input field", tone: "cyan" },
  { icon: Webhook, label: "Verification API", sublabel: "POST /v1/verify/pan", tone: "blue" },
  { icon: CreditCard, label: "DOVIXORA Identity", sublabel: "Official records lookup", tone: "blue", emphasis: true },
  { icon: ShieldCheck, label: "Verified", sublabel: "Trust established", tone: "emerald" },
];

const features = [
  { title: "Lite to comprehensive checks", description: "Start with a name-and-category check, or pull a full profile when you need more." },
  { title: "Aadhaar-linkage status", description: "Confirm whether a PAN is linked to Aadhaar before you rely on it." },
  { title: "Name, DOB & address match", description: "Cross-check applicant-provided details against the official record." },
  { title: "Masked contact lookup", description: "Resolve father's name, masked email and mobile tied to a PAN." },
];

function PanVerificationPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA PAN VERIFICATION"
        title="Verify PAN. Instantly, at any depth."
        description="From a lightweight name-and-category check to a full profile with Aadhaar-linkage — verify PAN directly against official records."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="Verifications" value="9.6M+" tone="ink" hint="Processed" />
            <MetricCard label="Verified Rate" value="99.3%" tone="emerald" hint="First attempt" />
            <MetricCard label="Latency" value="1.1s" tone="cyan" hint="Median" />
            <MetricCard label="Depths" value="3" tone="blue" hint="Lite to Comprehensive" />
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="Why PAN Verification"
          title={
            <>
              One input, <span className="gradient-text">the depth your workflow needs.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="product-card tone-blue">
              <div className="icon-tile">
                <CreditCard className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductCTA
        title="Verify your first PAN today."
        description="Sandbox verification is free. Ship compliant onboarding in days, not months."
      />
    </>
  );
}
