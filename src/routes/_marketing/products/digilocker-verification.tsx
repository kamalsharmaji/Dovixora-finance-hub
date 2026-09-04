import { createFileRoute } from "@tanstack/react-router";
import { FolderLock, ShieldCheck, Webhook } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/digilocker-verification")({
  head: () => ({
    meta: [
      { title: "DigiLocker Verification — DOVIXORA" },
      { name: "description", content: "Consent-based access to a user's DigiLocker — list and pull issued documents in real time." },
    ],
  }),
  component: DigiLockerVerificationPage,
});

const flow: FlowStep[] = [
  { icon: FolderLock, label: "User Consent", sublabel: "User's own DigiLocker login", tone: "cyan" },
  { icon: Webhook, label: "Verification API", sublabel: "POST /v1/digilocker/pull", tone: "blue" },
  { icon: FolderLock, label: "DOVIXORA DigiLocker", sublabel: "Consent-based access", tone: "blue", emphasis: true },
  { icon: ShieldCheck, label: "Verified", sublabel: "Documents pulled", tone: "emerald" },
];

const features = [
  { title: "Consent-based, user-authorized access", description: "The user approves access through their own DigiLocker login — no credentials touch your systems." },
  { title: "Aadhaar & PAN pull", description: "Download Aadhaar and PAN in both XML and PDF format, straight from the source." },
  { title: "Full issued-document list", description: "See every document issued to the user's locker, with issuer and type." },
  { title: "Web & mobile SDKs", description: "Drop-in SDKs for web, Android, iOS and Flutter." },
];

function DigiLockerVerificationPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA DIGILOCKER"
        title="Pull verified documents. Straight from DigiLocker."
        description="Consent-based access to a user's DigiLocker — list issued documents and pull Aadhaar, PAN and more, with the user authorizing access through their own login."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="Documents Pulled" value="4.7M+" tone="ink" hint="Processed" />
            <MetricCard label="Consent Rate" value="94.6%" tone="emerald" hint="User-approved" />
            <MetricCard label="Latency" value="2.4s" tone="cyan" hint="Median" />
            <MetricCard label="SDKs" value="4" tone="blue" hint="Web · Android · iOS · Flutter" />
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="Why DigiLocker"
          title={
            <>
              Documents the user already has, <span className="gradient-text">verified at the source.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="product-card tone-violet">
              <div className="icon-tile">
                <FolderLock className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductCTA
        title="Pull your first document today."
        description="Sandbox verification is free. Ship compliant onboarding in days, not months."
      />
    </>
  );
}
