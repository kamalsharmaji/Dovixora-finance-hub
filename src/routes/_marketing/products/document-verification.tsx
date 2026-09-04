import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FileSearch, ScanLine, Upload } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductArchitecture, type FlowStep } from "@/components/products/product-architecture";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductHero } from "@/components/products/product-hero";

export const Route = createFileRoute("/_marketing/products/document-verification")({
  head: () => ({
    meta: [
      { title: "Document Verification — DOVIXORA" },
      { name: "description", content: "Extract and validate data from IDs and documents with OCR." },
    ],
  }),
  component: DocumentVerificationPage,
});

const flow: FlowStep[] = [
  { icon: Upload, label: "Document Upload", sublabel: "ID, PAN, passbook, etc.", tone: "cyan" },
  { icon: ScanLine, label: "OCR API", sublabel: "POST /v1/documents/ocr", tone: "blue" },
  { icon: FileSearch, label: "DOVIXORA Document Verification", sublabel: "Extraction & validation engine", tone: "blue", emphasis: true },
  { icon: CheckCircle2, label: "Extracted & Verified", sublabel: "Structured data returned", tone: "emerald" },
];

const features = [
  { title: "High-accuracy OCR", description: "Extract structured fields from IDs, passbooks and certificates." },
  { title: "Tamper detection", description: "Flag edited, cropped or forged documents automatically." },
  { title: "Multi-document support", description: "PAN, Aadhaar, passport, driving licence and more, one API." },
  { title: "Structured JSON output", description: "Get clean, typed fields — never raw, unparsed text." },
];

function DocumentVerificationPage() {
  return (
    <>
      <ProductHero
        eyebrow="DOVIXORA DOCUMENT VERIFICATION"
        title="Turn any document into verified, structured data."
        description="Extract and validate data from IDs and documents with OCR — built for accuracy and tamper detection."
        primaryCta={{ label: "Start Building Free", to: "/signup" }}
        secondaryCta={{ label: "View API Reference", to: "/developers/api-reference" }}
        visual={<ProductArchitecture steps={flow} />}
      />

      <section className="border-y border-line bg-panel/30">
        <Container className="py-12">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MetricCard label="Documents Processed" value="14M+" tone="ink" />
            <MetricCard label="OCR Accuracy" value="99.2%" tone="emerald" hint="Field-level" />
            <MetricCard label="Latency" value="2.1s" tone="cyan" hint="Median" />
            <MetricCard label="Document Types" value="30+" tone="blue" />
          </div>
        </Container>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
        <SectionHeading
          kicker="Why Document Verification"
          title={
            <>
              Documents that verify <span className="gradient-text">themselves.</span>
            </>
          }
        />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="product-card tone-blue">
              <div className="icon-tile">
                <FileSearch className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ProductCTA
        title="Turn documents into data today."
        description="Sandbox OCR is free. Ship reliable document workflows in days, not months."
      />
    </>
  );
}
