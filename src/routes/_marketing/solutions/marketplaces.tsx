import { createFileRoute } from "@tanstack/react-router";
import {
  Banknote,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Fingerprint,
  Landmark,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  Store,
  User,
  Users,
  Zap,
} from "lucide-react";

import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";
import { SolutionBenefits } from "@/components/solutions/solution-benefits";
import { SolutionMetrics, type SolutionMetric } from "@/components/solutions/solution-metrics";
import { SolutionUseCases, type UseCaseItem } from "@/components/solutions/solution-use-cases";

export const Route = createFileRoute("/_marketing/solutions/marketplaces")({
  head: () => ({
    meta: [
      { title: "Marketplace Solutions — DOVIXORA" },
      { name: "description", content: "Infrastructure that moves money across your marketplace." },
    ],
  }),
  component: MarketplacesPage,
});

const flow: FlowStep[] = [
  { icon: User, label: "Buyer", sublabel: "Places an order", tone: "cyan" },
  { icon: Store, label: "Marketplace", sublabel: "Your platform", tone: "cyan" },
  { icon: ShoppingCart, label: "DOVIXORA", sublabel: "Payment & payout engine", tone: "blue", emphasis: true },
  { icon: User, label: "Seller", sublabel: "Verified merchant", tone: "cyan" },
  { icon: Banknote, label: "Payout", sublabel: "Settled to seller", tone: "emerald" },
];

const metrics: readonly SolutionMetric[] = [
  { icon: Zap, value: "Fast Payouts", label: "Same-day seller settlement", tone: "blue" },
  { icon: ShieldCheck, value: "Real-time Verification", label: "Sellers verified instantly", tone: "cyan" },
  { icon: CheckCircle2, value: "Reliable Status", label: "Payment status you can trust", tone: "emerald" },
];

const benefits = [
  { icon: Fingerprint, label: "Seller verification" },
  { icon: CreditCard, label: "Payment processing" },
  { icon: Banknote, label: "Automated payouts" },
  { icon: Landmark, label: "Bank verification" },
  { icon: ShieldAlert, label: "Fraud monitoring" },
  { icon: ClipboardCheck, label: "Reconciliation" },
];

const useCases: readonly UseCaseItem[] = [
  { icon: Users, title: "Gig Platforms", description: "Verify and pay out independent workers the moment a job is complete." },
  { icon: ShoppingCart, title: "E-commerce Marketplaces", description: "Process buyer payments and route seller payouts from one ledger." },
  { icon: Briefcase, title: "Service Platforms", description: "Verify service providers and automate milestone-based payouts." },
  { icon: Building2, title: "B2B Marketplaces", description: "Handle high-value transactions with bank-grade verification." },
];

function MarketplacesPage() {
  return (
    <>
      <ProductHero
        eyebrow="FOR MARKETPLACES"
        title="Infrastructure that moves money across your marketplace."
        description="Manage payments, payouts, verification and automation across buyers, sellers and platforms."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "Talk to Our Team", to: "/company/contact" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <SolutionMetrics metrics={metrics} />

      <SolutionBenefits
        kicker="Features"
        title={
          <>
            Everything a marketplace needs, <span className="gradient-text">in one layer.</span>
          </>
        }
        items={benefits}
      />

      <SolutionUseCases
        kicker="Use Cases"
        title={
          <>
            Built for every <span className="gradient-text">marketplace model.</span>
          </>
        }
        items={useCases}
      />

      <ProductCTA
        title="Build the next generation of verification workflows."
        description="Connect your business to the infrastructure powering modern verification workflows."
        primaryLabel="Start Building"
        secondaryLabel="Talk to Our Team"
      />
    </>
  );
}
