import { createFileRoute } from "@tanstack/react-router";
import { Building2, CheckCircle2, FileCheck, Webhook } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/business-verification")({
  head: () => ({
    meta: [
      { title: "Business Verification — DOVIXORA" },
      { name: "description", content: "Verify company registration, GST and business legitimacy." },
    ],
  }),
  component: BusinessVerificationPage,
});

const flow: FlowStep[] = [
  { icon: FileCheck, label: "GST / CIN Number", sublabel: "Business identifier", tone: "cyan" },
  { icon: Webhook, label: "Verification API", sublabel: "POST /v1/verify/gst", tone: "blue" },
  { icon: Building2, label: "DOVIXORA Business Verification", sublabel: "Registry lookup engine", tone: "blue", emphasis: true },
  { icon: CheckCircle2, label: "Verified Business", sublabel: "Legitimacy confirmed", tone: "emerald" },
];

const features = [
  { title: "GST & CIN verification", description: "Confirm business registration against official government registries." },
  { title: "Director & UBO checks", description: "Verify company directors and ultimate beneficial owners." },
  { title: "Business address validation", description: "Match registered address against submitted business details." },
  { title: "Ongoing monitoring", description: "Get notified if a verified business's status changes." },
];

function BusinessVerificationPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA BUSINESS VERIFICATION"
        title="Know exactly who you're doing business with."
        description="Verify company registration, GST and business legitimacy before onboarding any merchant or partner."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="Businesses Verified" value="3.4M+" tone="ink" />
            <MetricCard label="Verified Rate" value="97.1%" tone="emerald" hint="First attempt" />
            <MetricCard label="Latency" value="2.4s" tone="cyan" hint="Median" />
            <MetricCard label="Registries Covered" value="15+" tone="blue" />
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="Why Business Verification"
          title={
            <>
              Onboard businesses <span className="gradient-text">with confidence.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="product-card tone-violet">
              <div className="icon-tile">
                <Building2 className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductCTA
        title="Verify your first business today."
        description="Sandbox verification is free. Onboard merchants and partners with confidence."
      />
    </>
  );
}
