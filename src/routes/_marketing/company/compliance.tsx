import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2, Lock, ShieldCheck } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const Route = createFileRoute("/_marketing/company/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance — DOVIXORA" },
      { name: "description", content: "How DOVIXORA approaches security and regulatory compliance." },
    ],
  }),
  component: CompliancePage,
});

const points = [
  { icon: Lock, title: "Encryption everywhere", description: "Data is encrypted in transit and at rest with 256-bit encryption." },
  { icon: ShieldCheck, title: "Access controls", description: "Role-based access and audit logging on every API key and dashboard action." },
  { icon: FileCheck2, title: "Data minimization", description: "Only the fields a verification workflow needs are requested, stored or returned." },
];

function CompliancePage() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <SectionHeading
        kicker="Legal"
        title="Compliance"
        description="How DOVIXORA approaches security and regulatory compliance across the platform."
      />
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {points.map(({ icon: Icon, title, description }) => (
          <article key={title} className="product-card tone-blue">
            <div className="icon-tile">
              <Icon className="size-5" />
            </div>
            <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          </article>
        ))}
      </div>
      <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        DOVIXORA's verification workflows are designed to align with applicable Indian data-protection
        practices for identity and financial verification. For enterprise compliance documentation, reach
        out through the contact page.
      </p>
    </Container>
  );
}
