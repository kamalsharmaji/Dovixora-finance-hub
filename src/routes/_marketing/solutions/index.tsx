import { createFileRoute } from "@tanstack/react-router";
import {
  AppWindow,
  Briefcase,
  Building2,
  CheckCircle2,
  FileSearch,
  Fingerprint,
  Landmark,
  Network,
  Store,
  User,
} from "lucide-react";

import { ProductFeatureGrid, type ProductCardData } from "@/components/products/product-feature-grid";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";
import { SolutionTrust } from "@/components/solutions/solution-trust";
import { SolutionWorkflow, type WorkflowBranch } from "@/components/solutions/solution-workflow";
import { SectionHeading } from "@/components/ui/section-heading";

export const Route = createFileRoute("/_marketing/solutions/")({
  head: () => ({
    meta: [
      { title: "Solutions — DOVIXORA" },
      { name: "description", content: "Infrastructure designed around how modern businesses build." },
    ],
  }),
  component: SolutionsPage,
});

const industries: readonly ProductCardData[] = [
  {
    icon: Landmark,
    title: "Fintech",
    description: "Launch lending, payments and wealth products with built-in KYC and verification.",
    highlights: ["Unified identity & bank verification", "KYC / KYB built in", "Automated onboarding"],
    to: "/solutions/fintech",
    tone: "blue",
    featured: true,
  },
  {
    icon: Store,
    title: "Marketplaces",
    description: "Verify buyers, sellers and platforms with automated, trustworthy payouts.",
    highlights: ["Seller verification", "Automated payouts", "Fraud monitoring"],
    to: "/solutions/marketplaces",
    tone: "cyan",
  },
  {
    icon: AppWindow,
    title: "SaaS Platforms",
    description: "Embed identity and business verification directly into your product with one API layer.",
    highlights: ["Faster integration", "Typed SDKs", "Sandbox testing"],
    to: "/solutions/saas",
    tone: "violet",
  },
  {
    icon: Building2,
    title: "Enterprise Infrastructure",
    description: "Verify employees, vendors and partners through secure, observable infrastructure.",
    highlights: ["Role-based access", "Audit trails", "High availability"],
    to: "/solutions/enterprises",
    tone: "blue",
  },
];

const workflowBranches: readonly WorkflowBranch[] = [
  { icon: Fingerprint, label: "Identity", tone: "blue" },
  { icon: FileSearch, label: "Document", tone: "cyan" },
  { icon: Landmark, label: "Bank & UPI", tone: "blue" },
  { icon: Briefcase, label: "Employment", tone: "cyan" },
];

function SolutionsHeroVisual() {
  return (
    <div
      className="glow-panel rounded-2xl border border-line bg-panel/50 p-6 backdrop-blur-md"
      role="img"
      aria-label="DOVIXORA connected to Fintech, Marketplaces, SaaS and Enterprise"
    >
      <div className="mx-auto max-w-xs">
        <div className="flex items-center justify-center gap-2 rounded-xl border border-blue/40 bg-blue/10 px-4 py-3 shadow-[0_0_0_1px_rgba(245,197,24,0.15)]">
          <Network className="size-4 text-blue-bright" />
          <span className="font-display text-sm font-bold text-foreground">DOVIXORA</span>
          <span className="status-dot ml-1">
            <span />
          </span>
        </div>
        <div className="mx-auto mt-2 h-6 w-px bg-line" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-2 gap-3 border-t border-line pt-5 sm:grid-cols-4">
        {industries.map((industry, index) => (
          <div key={industry.to} className="flex flex-col items-center gap-2">
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <span
              className={`grid size-10 place-items-center rounded-lg ${
                index % 2 === 0 ? "bg-blue/10 text-blue" : "bg-cyan/10 text-cyan"
              }`}
            >
              <industry.icon className="size-4" />
            </span>
            <span className="text-center font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              {industry.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionsPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA SOLUTIONS"
        title="Verification infrastructure designed around how you build."
        description="From fintech products to global platforms, DOVIXORA provides the verification layer that helps modern businesses move faster."
        primaryCta={{ label: "Explore Solutions", to: "#solutions-grid" }}
        secondaryCta={{ label: "Talk to Our Team", to: "/company/contact" }}
        visual={<SolutionsHeroVisual />}
      />

      <section id="solutions-grid" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          kicker="Built For Your Industry"
          title={
            <>
              One infrastructure layer. <span className="gradient-text">Four ways to build.</span>
            </>
          }
          description="DOVIXORA adapts to how your business verifies people and businesses — not the other way around."
        />
        <div className="mt-10">
          <ProductFeatureGrid items={industries} />
        </div>
      </section>

      <section className="border-y border-line bg-panel/30">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
          <SectionHeading
            align="center"
            kicker="Built For Complex Workflows"
            title={
              <>
                Complex workflows. <span className="gradient-text">Simple infrastructure.</span>
              </>
            }
            description="Every request — from customer to result — moves through one observable infrastructure layer."
          />
          <div className="mt-10">
            <SolutionWorkflow
              steps={[
                { icon: User, label: "Customer", sublabel: "Initiates an action", tone: "cyan" },
                { icon: AppWindow, label: "Your Product", sublabel: "Application layer", tone: "cyan" },
                { icon: Network, label: "DOVIXORA Infrastructure", sublabel: "Routing & orchestration", tone: "blue", emphasis: true },
              ]}
              branches={workflowBranches}
              result={{ icon: CheckCircle2, label: "Result", sublabel: "Delivered to your product", tone: "emerald" }}
            />
          </div>
        </div>
      </section>

      <SolutionTrust />

      <ProductCTA
        title="Build the next generation of verification workflows."
        description="Connect your business to the infrastructure powering modern verification workflows."
        primaryLabel="Start Building"
        secondaryLabel="Talk to Our Team"
      />
    </>
  );
}
