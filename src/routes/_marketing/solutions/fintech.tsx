import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AppWindow,
  Briefcase,
  Building2,
  Eye,
  FileSearch,
  Fingerprint,
  HandCoins,
  Landmark,
  Layers,
  Network,
  TrendingUp,
  User,
  Wallet,
  Zap,
} from "lucide-react";

import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";
import { SolutionBenefits } from "@/components/solutions/solution-benefits";
import { SolutionMetrics, type SolutionMetric } from "@/components/solutions/solution-metrics";
import { SolutionUseCases, type UseCaseItem } from "@/components/solutions/solution-use-cases";
import { SolutionWorkflow, type WorkflowBranch } from "@/components/solutions/solution-workflow";

export const Route = createFileRoute("/_marketing/solutions/fintech")({
  head: () => ({
    meta: [
      { title: "Fintech Solutions — DOVIXORA" },
      { name: "description", content: "Launch financial products with built-in KYC and verification." },
    ],
  }),
  component: FintechPage,
});

const metrics: readonly SolutionMetric[] = [
  { icon: Activity, value: "99.99%", label: "Infrastructure uptime", tone: "blue" },
  { icon: Zap, value: "<100ms", label: "Average API response", tone: "cyan" },
  { icon: Eye, value: "24/7", label: "System monitoring", tone: "emerald" },
];

const benefits = [
  { icon: Fingerprint, label: "PAN & Aadhaar verification" },
  { icon: FileSearch, label: "Document OCR" },
  { icon: Landmark, label: "Bank & UPI verification" },
  { icon: Building2, label: "Business verification" },
  { icon: Network, label: "API infrastructure" },
  { icon: Activity, label: "Real-time monitoring" },
];

const useCases: readonly UseCaseItem[] = [
  { icon: HandCoins, title: "Digital Lending", description: "Underwrite, disburse and collect loans on one automated infrastructure layer." },
  { icon: TrendingUp, title: "Credit Underwriting", description: "Verify identity, income and employment before extending credit." },
  { icon: Wallet, title: "Neobanking", description: "Issue accounts and cards on top of DOVIXORA's identity and bank verification rails." },
  { icon: Layers, title: "Wealth Platforms", description: "Verify investors and move funds with infrastructure built for compliance." },
  { icon: Briefcase, title: "Embedded Finance", description: "Drop verification workflows into any product without a banking license." },
];

const workflowBranches: readonly WorkflowBranch[] = [
  { icon: Fingerprint, label: "Identity", tone: "blue" },
  { icon: FileSearch, label: "Document", tone: "cyan" },
  { icon: Landmark, label: "Bank & UPI", tone: "blue" },
  { icon: Building2, label: "Business", tone: "cyan" },
];

function FintechPage() {
  return (
    <>
      <ProductHero
        eyebrow="FOR FINTECH"
        title="Launch financial products with verification built in."
        description="Build lending, wealth and banking products with identity, document, business and bank verification on a unified infrastructure layer."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "Talk to Our Team", to: "/company/contact" }}
        visual={
          <SolutionWorkflow
            steps={[
              { icon: User, label: "Customer App", tone: "cyan" },
              { icon: AppWindow, label: "Fintech Platform", tone: "cyan" },
              { icon: Network, label: "DOVIXORA", tone: "blue", emphasis: true },
            ]}
            branches={workflowBranches}
          />
        }
      />

      <SolutionMetrics metrics={metrics} />

      <SolutionBenefits
        kicker="Features"
        title={
          <>
            Everything a fintech needs, <span className="gradient-text">in one layer.</span>
          </>
        }
        items={benefits}
      />

      <SolutionUseCases
        kicker="Use Cases"
        title={
          <>
            Built for every <span className="gradient-text">fintech model.</span>
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
