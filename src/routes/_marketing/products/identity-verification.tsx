import { createFileRoute } from "@tanstack/react-router";
import { FileText, Fingerprint, ShieldCheck, Webhook } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/identity-verification")({
  head: () => ({
    meta: [
      { title: "Identity Verification — DOVIXORA" },
      { name: "description", content: "Verify customers instantly with document and liveness checks." },
    ],
  }),
  component: IdentityVerificationPage,
});

const flow: FlowStep[] = [
  { icon: FileText, label: "Document / Selfie", sublabel: "ID and liveness capture", tone: "cyan" },
  { icon: Webhook, label: "Verification API", sublabel: "POST /v1/verify/pan", tone: "blue" },
  { icon: Fingerprint, label: "DOVIXORA Identity", sublabel: "KYC engine", tone: "blue", emphasis: true },
  { icon: ShieldCheck, label: "Verified", sublabel: "Trust established", tone: "emerald" },
];

const features = [
  { title: "Document + liveness checks", description: "Government ID and selfie liveness verified in a single pass." },
  { title: "PAN & Aadhaar verification", description: "Instant checks against official identity registries." },
  { title: "Real-time verified status", description: "Webhooks fire the moment a customer is confirmed." },
  { title: "Global coverage", description: "Verification rails built for 120+ countries and document types." },
];

function IdentityVerificationPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA IDENTITY VERIFICATION"
        title="Verify identity. Build trust instantly."
        description="Verify customers instantly with document, liveness and PAN/Aadhaar checks built into one API."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="Verifications" value="8.2M+" tone="ink" hint="Processed" />
            <MetricCard label="Verified Rate" value="98.4%" tone="emerald" hint="First attempt" />
            <MetricCard label="Latency" value="1.8s" tone="cyan" hint="Median" />
            <MetricCard label="Coverage" value="120+" tone="blue" hint="Countries" />
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="Why Identity Verification"
          title={
            <>
              Verification that feels <span className="gradient-text">instant, not intrusive.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="product-card tone-cyan">
              <div className="icon-tile">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductCTA
        title="Verify your first customer today."
        description="Sandbox verification is free. Ship compliant onboarding in days, not months."
      />
    </>
  );
}
