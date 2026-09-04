import { createFileRoute } from "@tanstack/react-router";
import { Boxes, KeyRound, Network, PackageCheck, Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ApiCodePanel, type CodeToken } from "@/components/products/api-code-panel";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/api-platform")({
  head: () => ({
    meta: [
      { title: "API Platform — DOVIXORA" },
      { name: "description", content: "One API platform. Every verification capability." },
    ],
  }),
  component: ApiPlatformPage,
});

const flow: FlowStep[] = [
  { icon: Send, label: "Request", sublabel: "From your application", tone: "cyan" },
  { icon: KeyRound, label: "Authentication", sublabel: "API key or OAuth", tone: "blue" },
  { icon: Network, label: "DOVIXORA API Gateway", sublabel: "Routing & rate limiting", tone: "blue", emphasis: true },
  { icon: Boxes, label: "Product APIs", sublabel: "Identity · Document · Business · Bank", tone: "cyan" },
  { icon: PackageCheck, label: "Response", sublabel: "Typed & validated", tone: "emerald" },
];

const features = [
  { title: "Unified authentication", description: "One API key or OAuth flow authorizes every DOVIXORA product." },
  { title: "Typed SDKs & webhooks", description: "Generated clients for your stack, plus signed, replayable webhooks." },
  { title: "Sandbox-first design", description: "Every endpoint is fully testable in sandbox before you go live." },
  { title: "Consistent versioning", description: "Predictable, backwards-compatible releases across every product." },
];

const requestTokens: readonly CodeToken[] = [
  ["plain", "GET "],
  ["string", "/v1/platform/status"],
  ["plain", "\nAuthorization: "],
  ["string", "Bearer sk_live_***"],
  ["plain", "\nX-Api-Version: "],
  ["string", '"2026-01-01"'],
];

const responseTokens: readonly CodeToken[] = [
  ["plain", "{\n  "],
  ["keyword", '"gateway"'],
  ["plain", ": "],
  ["success", '"operational"'],
  ["plain", ",\n  "],
  ["keyword", '"products"'],
  ["plain", ": ["],
  ["string", '"identity"'],
  ["plain", ", "],
  ["string", '"document"'],
  ["plain", ", "],
  ["string", '"business"'],
  ["plain", ", "],
  ["string", '"bank"'],
  ["plain", "],\n  "],
  ["keyword", '"latency_ms"'],
  ["plain", ": "],
  ["number", "18"],
  ["plain", "\n}"],
];

function ApiPlatformPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA API PLATFORM"
        title="One API platform. Every verification capability."
        description="A single gateway, authentication layer and SDK surface for every DOVIXORA product — identity to employment."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              kicker="Platform Status"
              title={
                <>
                  One gateway. <span className="gradient-text">Every product, live.</span>
                </>
              }
              description="Check platform health or route any product request through the same authenticated gateway."
            />
          </div>
          <ApiCodePanel
            method="GET"
            path="/v1/platform/status"
            request={requestTokens}
            response={responseTokens}
            status="200 OK"
          />
        </div>
      </section>

      <section className="border-y border-line bg-panel/30">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading
            kicker="Why API Platform"
            title={
              <>
                Technical infrastructure, <span className="gradient-text">not a pile of SDKs.</span>
              </>
            }
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <article key={feature.title} className="product-card tone-blue">
                <div className="icon-tile">
                  <Network className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ProductCTA
        title="Build on the full platform."
        description="One integration unlocks identity, document, business, bank and employment verification."
      />
    </>
  );
}
