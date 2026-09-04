import { createFileRoute } from "@tanstack/react-router";

import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";
import { SdkCard } from "@/components/developers/sdk-card";
import { sdks } from "@/components/developers/sdk-data";

export const Route = createFileRoute("/_marketing/developers/sdks")({
  head: () => ({
    meta: [
      { title: "SDKs — DOVIXORA" },
      { name: "description", content: "Build faster with libraries designed for modern development." },
    ],
  }),
  component: SdksPage,
});

function SdksPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA SDKS"
        title="Build faster with libraries designed for modern development."
        description="Official and community SDKs give you typed, idiomatic access to every DOVIXORA product."
        primaryCta={{ label: "Explore Documentation", to: "/developers/documentation" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
      />

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:pb-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sdks.map((sdk) => (
            <SdkCard key={sdk.name} sdk={sdk} />
          ))}
        </div>
      </section>

      <ProductCTA
        title="Build your next financial product with DOVIXORA."
        description="Start building with powerful APIs and infrastructure designed for scale."
        primaryLabel="Start Building Free"
        secondaryLabel="Talk to Our Team"
      />
    </>
  );
}
