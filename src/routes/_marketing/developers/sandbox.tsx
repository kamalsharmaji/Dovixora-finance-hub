import { createFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/ui/container";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";
import { SandboxConsole } from "@/components/developers/sandbox-console";

export const Route = createFileRoute("/_marketing/developers/sandbox")({
  head: () => ({
    meta: [
      { title: "Sandbox — DOVIXORA" },
      { name: "description", content: "Build, test and experiment without touching production." },
    ],
  }),
  component: SandboxPage,
});

function SandboxPage() {
  return (
    <>
      <ProductHero
        eyebrow="DEVELOPER SANDBOX"
        title="DOVIXORA Sandbox"
        description="Build, test and experiment without touching production."
      />

      <Container className="pb-16 sm:pb-20 lg:pb-24">
        <div className="mb-6 flex items-center justify-between rounded-xl border border-line bg-panel/50 px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Sandbox Environment
          </span>
          <span className="status-dot">
            <span /> Active
          </span>
        </div>

        <SandboxConsole />
      </Container>

      <ProductCTA
        title="Build your next financial product with DOVIXORA."
        description="Start building with powerful APIs and infrastructure designed for scale."
        primaryLabel="Start Building Free"
        secondaryLabel="Talk to Our Team"
      />
    </>
  );
}
