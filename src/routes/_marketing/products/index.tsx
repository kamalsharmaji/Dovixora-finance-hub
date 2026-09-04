import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AppWindow,
  BadgeCheck,
  Briefcase,
  Car,
  CreditCard,
  FolderLock,
  Network,
  QrCode,
  Radio,
  Webhook,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ApiCodePanel, type CodeToken } from "@/components/products/api-code-panel";
import { FlowConnector, FlowNode } from "@/components/products/flow-node";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductFeatureGrid, type ProductCardData } from "@/components/products/product-feature-grid";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/")({
  head: () => ({
    meta: [
      { title: "Products — DOVIXORA" },
      { name: "description", content: "Aadhaar, PAN, Driving Licence, UAN, Full KYC and DigiLocker verification — one unified API." },
    ],
  }),
  component: ProductsPage,
});

const products: readonly ProductCardData[] = [
  {
    icon: QrCode,
    title: "Aadhaar Verification",
    description: "Verify identity using Aadhaar via authorized sources.",
    highlights: ["QR, XML & eAadhaar support", "Masked by default", "Real-time demographic match"],
    to: "/products/aadhaar-verification",
    tone: "blue",
    featured: true,
  },
  {
    icon: CreditCard,
    title: "PAN Verification",
    description: "Instant PAN verification with IT Department records.",
    highlights: ["Lite to comprehensive checks", "Aadhaar-linkage status", "Name, DOB & address match"],
    to: "/products/pan-verification",
    tone: "cyan",
  },
  {
    icon: Car,
    title: "Driving Licence",
    description: "Verify driving licence details and validity.",
    highlights: ["Licence validity & expiry", "Authorized vehicle classes", "Holder & address match"],
    to: "/products/driving-licence-verification",
    tone: "violet",
  },
  {
    icon: Briefcase,
    title: "UAN Verification",
    description: "Validate UAN and employment details via EPFO.",
    highlights: ["UAN resolution", "Complete employer history", "PF contribution recency"],
    to: "/products/uan-verification",
    tone: "blue",
  },
  {
    icon: BadgeCheck,
    title: "Full KYC",
    description: "Complete KYC verification in a single request.",
    highlights: ["Identity + address + biometric, unified", "Liveness & face-match built in", "CKYC-ready output"],
    to: "/products/full-kyc",
    tone: "cyan",
  },
  {
    icon: FolderLock,
    title: "DigiLocker",
    description: "Fetch and verify documents from DigiLocker.",
    highlights: ["Consent-based, user-authorized access", "Aadhaar & PAN pull", "Web & mobile SDKs"],
    to: "/products/digilocker-verification",
    tone: "violet",
  },
];

const infrastructureNodes = [
  { icon: QrCode, label: "Aadhaar" },
  { icon: CreditCard, label: "PAN" },
  { icon: Car, label: "Driving Licence" },
  { icon: Briefcase, label: "UAN" },
  { icon: BadgeCheck, label: "Full KYC" },
  { icon: FolderLock, label: "DigiLocker" },
] as const;

const developerFeatures = [
  { icon: Webhook, label: "REST APIs" },
  { icon: Network, label: "SDKs" },
  { icon: Radio, label: "Webhooks" },
  { icon: AppWindow, label: "Sandbox" },
  { icon: Activity, label: "Real-time monitoring" },
] as const;

const requestTokens: readonly CodeToken[] = [
  ["plain", "POST "],
  ["string", "/v1/verify/pan"],
  ["plain", "\nAuthorization: "],
  ["string", "Bearer sk_live_***"],
  ["plain", "\nContent-Type: "],
  ["string", "application/json"],
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
  ["string", '"ver_9F3kd2"'],
  ["plain", ",\n  "],
  ["keyword", '"status"'],
  ["plain", ": "],
  ["success", '"verified"'],
  ["plain", ",\n  "],
  ["keyword", '"name_match"'],
  ["plain", ": "],
  ["success", "true"],
  ["plain", ",\n  "],
  ["comment", "// resolved in"],
  ["plain", "\n  "],
  ["keyword", '"latency_ms"'],
  ["plain", ": "],
  ["number", "42"],
  ["plain", "\n}"],
];

function ProductsHeroVisual() {
  return (
    <div
      className="glow-panel rounded-2xl border border-line bg-panel/50 p-6 backdrop-blur-md"
      role="img"
      aria-label="DOVIXORA connected to Aadhaar, PAN, Driving Licence, UAN, Full KYC and DigiLocker verification"
    >
      <div className="mx-auto max-w-xs">
        <div className="flex items-center justify-center gap-2 rounded-xl border border-blue/40 bg-blue/10 px-4 py-3 shadow-[0_0_0_1px_rgba(245,197,24,0.15)]">
          <Network className="size-4 text-blue-bright" />
          <span className="font-display text-sm font-bold text-foreground">DOVIXORA</span>
          <span className="status-dot ml-1">
            <span />
          </span>
        </div>
        <FlowConnector />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {products.map((product, index) => (
          <div key={product.to} className="flex flex-col items-center gap-2">
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <span
              className={`grid size-10 place-items-center rounded-lg ${
                index % 3 === 0 ? "bg-blue/10 text-blue" : index % 3 === 1 ? "bg-cyan/10 text-cyan" : "bg-emerald/10 text-emerald"
              }`}
            >
              <product.icon className="size-4" />
            </span>
            <span className="text-center font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              {product.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA PRODUCTS"
        title="Infrastructure for every verification workflow."
        description="Verify Aadhaar, PAN, driving licences, UAN, full KYC and DigiLocker documents through one unified infrastructure layer."
        primaryCta={{ label: "Explore Products", to: "#product-grid" }}
        secondaryCta={{ label: "View Documentation", to: "/developers/documentation" }}
        visual={<ProductsHeroVisual />}
      />

      <section id="product-grid" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
        <SectionHeading
          kicker="Product Ecosystem"
          title={
            <>
              Six products. <span className="gradient-text">One infrastructure layer.</span>
            </>
          }
          description="Every product shares the same authentication, observability and reliability guarantees."
        />
        <div className="mt-10">
          <ProductFeatureGrid items={products} />
        </div>
      </section>

      <section className="border-y border-line bg-panel/30">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading
            align="center"
            kicker="Unified Infrastructure"
            title={
              <>
                One infrastructure layer. <span className="gradient-text">Every verification workflow.</span>
              </>
            }
            description="Applications talk to a single DOVIXORA gateway that fans requests out to the right verification rail."
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="mx-auto max-w-xs">
              <FlowNode icon={AppWindow} label="Applications" sublabel="Your product" tone="cyan" />
              <FlowConnector />
              <FlowNode
                icon={Network}
                label="DOVIXORA Infrastructure"
                sublabel="Gateway · Auth · Routing"
                tone="blue"
                emphasis
              />
            </div>
            <div className="mx-auto mt-2 h-6 w-px bg-line" aria-hidden="true" />
            <div className="grid grid-cols-2 gap-3 border-t border-line pt-5 sm:grid-cols-3 lg:grid-cols-6">
              {infrastructureNodes.map((node, index) => (
                <div key={node.label} className="flex flex-col items-center gap-2 text-center">
                  <span className="h-3 w-px bg-line" aria-hidden="true" />
                  <span
                    className={`grid size-9 place-items-center rounded-md ${
                      index % 2 === 0 ? "bg-blue/10 text-blue" : "bg-emerald/10 text-emerald"
                    }`}
                  >
                    <node.icon className="size-4" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              kicker="Developer Experience"
              title={
                <>
                  Built for developers. <span className="gradient-text">Designed for scale.</span>
                </>
              }
              description="Every product ships with the same predictable, typed developer experience."
            />
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {developerFeatures.map((feature) => (
                <li key={feature.label} className="check-row font-display text-sm">
                  <feature.icon className="size-4 text-cyan" /> {feature.label}
                </li>
              ))}
            </ul>
          </div>
          <ApiCodePanel method="POST" path="/v1/verify/pan" request={requestTokens} response={responseTokens} />
        </div>
      </section>

      <ProductCTA
        title="Ready to build on DOVIXORA?"
        description="Start in sandbox today and ship to production without changing your architecture."
      />
    </>
  );
}
