import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AppWindow,
  BarChart3,
  Briefcase,
  BookOpen,
  Car,
  Check,
  Code2,
  CreditCard,
  FlaskConical,
  Gauge,
  Network,
  Package,
  QrCode,
  Server,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ApiCodePanel, type CodeToken } from "@/components/products/api-code-panel";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";
import { DeveloperMetrics, type DeveloperMetric } from "@/components/developers/developer-metrics";
import { DeveloperTools, type DeveloperToolItem } from "@/components/developers/developer-tools";
import { SdkCard } from "@/components/developers/sdk-card";
import { sdks } from "@/components/developers/sdk-data";
import { SolutionWorkflow, type WorkflowBranch } from "@/components/solutions/solution-workflow";

export const Route = createFileRoute("/_marketing/developers/")({
  head: () => ({
    meta: [
      { title: "Developers — DOVIXORA" },
      { name: "description", content: "Build verification infrastructure with APIs your developers will love." },
    ],
  }),
  component: DevelopersPage,
});

const metrics: readonly DeveloperMetric[] = [
  { icon: Activity, value: "99.99%", label: "Platform uptime", tone: "blue" },
  { icon: Gauge, value: "<100ms", label: "Average API latency", tone: "cyan" },
  { icon: BarChart3, value: "10M+", label: "API requests processed", tone: "emerald" },
  { icon: Server, value: "24/7", label: "Developer infrastructure", tone: "blue" },
];

const apiFeatures = [
  "RESTful APIs",
  "Predictable endpoints",
  "Versioned APIs",
  "Idempotency support",
  "Webhooks",
  "Production-ready security",
];

const tools: readonly DeveloperToolItem[] = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Clear guides and implementation examples.",
    ctaLabel: "Read Documentation",
    to: "/developers/documentation",
    tone: "blue",
  },
  {
    icon: Code2,
    title: "API Reference",
    description: "Explore every endpoint and parameter.",
    ctaLabel: "View API Reference",
    to: "/developers/api-reference",
    tone: "cyan",
  },
  {
    icon: Package,
    title: "SDKs",
    description: "Official SDKs for modern development stacks.",
    ctaLabel: "Explore SDKs",
    to: "/developers/sdks",
    tone: "violet",
  },
  {
    icon: FlaskConical,
    title: "Sandbox",
    description: "Build and test without touching production.",
    ctaLabel: "Open Sandbox",
    to: "/developers/sandbox",
    tone: "blue",
  },
];

const workflowBranches: readonly WorkflowBranch[] = [
  { icon: QrCode, label: "Aadhaar", tone: "blue" },
  { icon: CreditCard, label: "PAN", tone: "cyan" },
  { icon: Car, label: "Driving Licence", tone: "blue" },
  { icon: Briefcase, label: "UAN", tone: "cyan" },
];

const requestTokens: readonly CodeToken[] = [
  ["plain", "POST "],
  ["string", "/v1/verify/pan"],
  ["plain", "\n\n{\n  "],
  ["keyword", '"pan_number"'],
  ["plain", ": "],
  ["string", '"ABCPX1234K"'],
  ["plain", ",\n  "],
  ["keyword", '"consent"'],
  ["plain", ": "],
  ["success", "true"],
  ["plain", "\n}"],
];

const responseTokens: readonly CodeToken[] = [
  ["plain", "{\n  "],
  ["keyword", '"id"'],
  ["plain", ": "],
  ["string", '"ver_7Hd82k"'],
  ["plain", ",\n  "],
  ["keyword", '"status"'],
  ["plain", ": "],
  ["success", '"verified"'],
  ["plain", ",\n  "],
  ["keyword", '"name_match"'],
  ["plain", ": "],
  ["success", "true"],
  ["plain", "\n}"],
];

function DevelopersHeroVisual() {
  return (
    <div>
      <SolutionWorkflow
        steps={[{ icon: AppWindow, label: "Developer App", sublabel: "Your application", tone: "cyan" }, { icon: Network, label: "DOVIXORA API Gateway", sublabel: "Auth · Routing · Rate limits", tone: "blue", emphasis: true }]}
        branches={workflowBranches}
      />
      <div className="mx-auto mt-4 grid max-w-2xl grid-cols-3 gap-2">
        <div className="metric-chip">
          <span>POST /v1/verify/pan</span>
          <strong>200 OK</strong>
        </div>
        <div className="metric-chip">
          <span>API latency</span>
          <strong>42ms</strong>
        </div>
        <div className="metric-chip">
          <span>Uptime</span>
          <strong>99.99%</strong>
        </div>
      </div>
    </div>
  );
}

function DevelopersPage() {
  return (
    <>
      <ProductHero
        eyebrow="DEVELOPER PLATFORM"
        title={
          <>
            Build verification infrastructure with{" "}
            <span className="gradient-text">APIs your developers will love.</span>
          </>
        }
        description="Ship Aadhaar, PAN, driving licence, UAN, full KYC and DigiLocker verification workflows with clean APIs, powerful SDKs and production-ready infrastructure."
        primaryCta={{ label: "Explore Documentation", to: "/developers/documentation" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<DevelopersHeroVisual />}
      />

      <DeveloperMetrics metrics={metrics} />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              kicker="API-First"
              title={
                <>
                  Designed API-first. <span className="gradient-text">Built for production.</span>
                </>
              }
            />
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {apiFeatures.map((feature) => (
                <li key={feature} className="check-row font-display text-sm">
                  <Check /> {feature}
                </li>
              ))}
            </ul>
          </div>
          <ApiCodePanel method="POST" path="/v1/verify/pan" request={requestTokens} response={responseTokens} />
        </div>
      </section>

      <section className="border-y border-line bg-panel/30 nexora-grid">
        <DeveloperTools
          title={
            <>
              Everything developers need <span className="gradient-text">to move faster.</span>
            </>
          }
          items={tools}
        />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="SDKs"
          title={
            <>
              Start with the tools <span className="gradient-text">you already use.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {sdks.map((sdk) => (
            <SdkCard key={sdk.name} sdk={sdk} compact />
          ))}
        </div>
      </section>

      <ProductCTA
        title="Build your next verification product with DOVIXORA."
        description="Start building with powerful APIs and infrastructure designed for scale."
        primaryLabel="Start Building Free"
        secondaryLabel="Talk to Our Team"
      />
    </>
  );
}
