import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Landmark, Wallet, Webhook } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/bank-upi-verification")({
  head: () => ({
    meta: [
      { title: "Bank & UPI Verification — DOVIXORA" },
      { name: "description", content: "Confirm bank accounts and UPI IDs before you pay out." },
    ],
  }),
  component: BankUpiVerificationPage,
});

const flow: FlowStep[] = [
  { icon: Wallet, label: "Account / UPI ID", sublabel: "Payee details", tone: "cyan" },
  { icon: Webhook, label: "Verification API", sublabel: "POST /v1/verify/bank", tone: "blue" },
  { icon: Landmark, label: "DOVIXORA Bank Verification", sublabel: "Penny-drop & UPI lookup", tone: "blue", emphasis: true },
  { icon: CheckCircle2, label: "Verified Account", sublabel: "Name match confirmed", tone: "emerald" },
];

const features = [
  { title: "Penny-drop verification", description: "Confirm bank account ownership with a real-time name match." },
  { title: "UPI ID verification", description: "Validate any UPI handle instantly before sending money." },
  { title: "IFSC & bank lookup", description: "Resolve branch and bank details from any IFSC code." },
  { title: "Payout-safe by default", description: "Catch typos and mismatched accounts before funds move." },
];

function BankUpiVerificationPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA BANK & UPI VERIFICATION"
        title="Never send money to the wrong account."
        description="Confirm bank accounts and UPI IDs before you pay out — accounts, ledgers and transfers on real, verified infrastructure."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="Accounts Verified" value="6.7M+" tone="ink" />
            <MetricCard label="Match Rate" value="98.9%" tone="emerald" hint="Name match" />
            <MetricCard label="Latency" value="1.2s" tone="cyan" hint="Median" />
            <MetricCard label="Uptime" value="99.99%" tone="blue" />
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="Why Bank & UPI Verification"
          title={
            <>
              Payouts, <span className="gradient-text">without the guesswork.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="product-card tone-violet">
              <div className="icon-tile">
                <Landmark className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductCTA
        title="Verify your first account today."
        description="Sandbox verification is free. Ship payout-safe workflows in days, not months."
      />
    </>
  );
}
