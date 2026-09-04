import { createFileRoute } from "@tanstack/react-router";
import { AppWindow, FlaskConical, Layers, Network, Package, Radio, Zap } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ApiCodePanel, type CodeToken } from "@/components/products/api-code-panel";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";
import { SolutionBenefits } from "@/components/solutions/solution-benefits";

export const Route = createFileRoute("/_marketing/solutions/saas")({
  head: () => ({
    meta: [
      { title: "SaaS Solutions — DOVIXORA" },
      { name: "description", content: "Verification infrastructure without infrastructure complexity." },
    ],
  }),
  component: SaasPage,
});

const flow: FlowStep[] = [
  { icon: AppWindow, label: "SaaS Application", sublabel: "Your product", tone: "cyan" },
  { icon: Network, label: "DOVIXORA API", sublabel: "One integration", tone: "blue", emphasis: true },
  { icon: Layers, label: "Verification Services", sublabel: "Identity · Document · Business · Bank", tone: "emerald" },
];

const benefits = [
  { icon: Zap, label: "Faster integration" },
  { icon: Network, label: "One API layer" },
  { icon: Layers, label: "Scalable infrastructure" },
  { icon: Radio, label: "Webhooks" },
  { icon: Package, label: "SDKs" },
  { icon: FlaskConical, label: "Sandbox testing" },
];

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
  ["keyword", '"verification_id"'],
  ["plain", ": "],
  ["string", '"ver_5K1qp8"'],
  ["plain", ",\n  "],
  ["keyword", '"status"'],
  ["plain", ": "],
  ["success", '"verified"'],
  ["plain", ",\n  "],
  ["keyword", '"confidence"'],
  ["plain", ": "],
  ["number", "0.98"],
  ["plain", "\n}"],
];

function SaasPage() {
  return (
    <>
      <ProductHero
        eyebrow="FOR SAAS PLATFORMS"
        title="Verification infrastructure without infrastructure complexity."
        description="Embed identity, document, business and bank verification directly into your SaaS platform."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "Talk to Our Team", to: "/company/contact" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <SolutionBenefits
        kicker="Benefits"
        title={
          <>
            Ship verification features <span className="gradient-text">without the overhead.</span>
          </>
        }
        items={benefits}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                kicker="Developer Experience"
                title={
                  <>
                    One call. <span className="gradient-text">Verified in seconds.</span>
                  </>
                }
                description="Every DOVIXORA endpoint returns typed, predictable responses your product can trust in production."
              />
            </div>
            <ApiCodePanel
              method="POST"
              path="/v1/verify/pan"
              request={requestTokens}
              response={responseTokens}
              status="200 OK"
            />
          </div>
        </Container>
      </section>

      <ProductCTA
        title="Build the next generation of verification workflows."
        description="Connect your business to the infrastructure powering modern verification workflows."
        primaryLabel="Start Building"
        secondaryLabel="Talk to Our Team"
      />
    </>
  );
}
