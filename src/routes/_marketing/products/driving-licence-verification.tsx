import { createFileRoute } from "@tanstack/react-router";
import { Car, ShieldCheck, Webhook } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/driving-licence-verification")({
  head: () => ({
    meta: [
      { title: "Driving Licence Verification — DOVIXORA" },
      { name: "description", content: "Confirm driving licence validity, vehicle-class authorization and holder details from RTO records." },
    ],
  }),
  component: DrivingLicenceVerificationPage,
});

const flow: FlowStep[] = [
  { icon: Car, label: "Licence Number", sublabel: "RTO-issued DL number", tone: "cyan" },
  { icon: Webhook, label: "Verification API", sublabel: "POST /v1/verify/dl", tone: "blue" },
  { icon: Car, label: "DOVIXORA Identity", sublabel: "RTO records lookup", tone: "blue", emphasis: true },
  { icon: ShieldCheck, label: "Verified", sublabel: "Trust established", tone: "emerald" },
];

const features = [
  { title: "Licence validity & expiry", description: "Confirm the licence is current before you rely on it as identity proof." },
  { title: "Authorized vehicle classes", description: "See exactly which vehicle classes the holder is licensed to operate." },
  { title: "Holder & address match", description: "Cross-check name and address against the official RTO record." },
  { title: "Alternate identity proof", description: "A reliable fallback where Aadhaar or PAN alone isn't sufficient." },
];

function DrivingLicenceVerificationPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA DRIVING LICENCE VERIFICATION"
        title="Verify driving licences. Confirm who's behind the wheel."
        description="Confirm licence validity, authorized vehicle classes and holder details straight from official RTO records."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="Verifications" value="2.1M+" tone="ink" hint="Processed" />
            <MetricCard label="Verified Rate" value="97.8%" tone="emerald" hint="First attempt" />
            <MetricCard label="Latency" value="1.6s" tone="cyan" hint="Median" />
            <MetricCard label="Coverage" value="All States" tone="blue" hint="RTO records" />
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="Why Driving Licence Verification"
          title={
            <>
              Verified identity, <span className="gradient-text">straight from the RTO.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="product-card tone-violet">
              <div className="icon-tile">
                <Car className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductCTA
        title="Verify your first licence today."
        description="Sandbox verification is free. Ship compliant onboarding in days, not months."
      />
    </>
  );
}
