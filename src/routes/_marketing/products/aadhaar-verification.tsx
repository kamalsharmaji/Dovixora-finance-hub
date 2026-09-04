import { createFileRoute } from "@tanstack/react-router";
import { Fingerprint, QrCode, ShieldCheck, Webhook } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/aadhaar-verification")({
  head: () => ({
    meta: [
      { title: "Aadhaar Verification — DOVIXORA" },
      { name: "description", content: "Verify Aadhaar via secure QR, offline XML or eAadhaar without ever handling the raw number." },
    ],
  }),
  component: AadhaarVerificationPage,
});

const flow: FlowStep[] = [
  { icon: QrCode, label: "QR / XML / eAadhaar", sublabel: "Secure input, no raw number", tone: "cyan" },
  { icon: Webhook, label: "Verification API", sublabel: "POST /v1/verify/aadhaar", tone: "blue" },
  { icon: Fingerprint, label: "DOVIXORA Identity", sublabel: "UIDAI-backed engine", tone: "blue", emphasis: true },
  { icon: ShieldCheck, label: "Verified", sublabel: "Masked & compliant", tone: "emerald" },
];

const features = [
  { title: "Masked by default", description: "The Aadhaar number never leaves in the clear — only a masked identifier and verified demographics." },
  { title: "QR, XML & eAadhaar support", description: "Verify from a secure QR scan, an offline XML share, or a signed eAadhaar PDF." },
  { title: "Face image extraction", description: "Pull the enrolled photograph for downstream liveness or face-match checks." },
  { title: "Tamper & signature checks", description: "Signed documents are validated before any data is trusted." },
];

function AadhaarVerificationPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA AADHAAR VERIFICATION"
        title="Verify Aadhaar. Without touching the number."
        description="Verify Aadhaar through secure QR, offline XML or eAadhaar — get back verified demographics and a masked identity, never the raw number in the clear."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="Verifications" value="6.4M+" tone="ink" hint="Processed" />
            <MetricCard label="Verified Rate" value="99.1%" tone="emerald" hint="First attempt" />
            <MetricCard label="Latency" value="1.4s" tone="cyan" hint="Median" />
            <MetricCard label="Masking" value="100%" tone="blue" hint="Numbers never exposed" />
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="Why Aadhaar Verification"
          title={
            <>
              Privacy-first verification, <span className="gradient-text">official-source accurate.</span>
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
        title="Verify your first Aadhaar today."
        description="Sandbox verification is free. Ship compliant onboarding in days, not months."
      />
    </>
  );
}
