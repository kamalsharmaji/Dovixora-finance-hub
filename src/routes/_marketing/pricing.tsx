import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductCTA } from "@/components/products/product-cta";
import { Reveal } from "@/components/ui/reveal";
import { FeatureComparison, type ComparisonRow } from "@/components/pricing/feature-comparison";
import { PricingCard, type PricingTier } from "@/components/pricing/pricing-card";
import { PricingToggle } from "@/components/pricing/pricing-toggle";
import { SolutionTrust } from "@/components/solutions/solution-trust";

export const Route = createFileRoute("/_marketing/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — DOVIXORA" },
      { name: "description", content: "Simple, transparent pricing that scales with your business." },
    ],
  }),
  component: PricingPage,
});

const tiers: readonly PricingTier[] = [
  {
    name: "Starter",
    description: "For early-stage builders.",
    monthlyPrice: 0,
    features: ["Sandbox access", "Community support", "Core verification APIs", "500 API credits/mo"],
    ctaLabel: "Start Building Free",
    ctaTo: "/signup",
  },
  {
    name: "Growth",
    description: "For growing teams shipping to production.",
    monthlyPrice: 2999,
    features: ["Production access", "Priority support", "All verification products", "50,000 API credits/mo", "Webhooks included"],
    ctaLabel: "Start Building Free",
    ctaTo: "/signup",
    popular: true,
  },
  {
    name: "Scale",
    description: "For high-volume businesses.",
    monthlyPrice: 9999,
    features: ["Everything in Growth", "Dedicated infrastructure", "Advanced analytics", "Unlimited API credits", "99.99% uptime SLA"],
    ctaLabel: "Start Building Free",
    ctaTo: "/signup",
  },
  {
    name: "Enterprise",
    description: "For complex, regulated organizations.",
    monthlyPrice: null,
    features: ["Everything in Scale", "Dedicated account team", "Custom compliance & audit", "White-glove onboarding"],
    ctaLabel: "Talk to Sales",
    ctaTo: "/company/contact",
  },
];

const comparisonColumns = tiers.map((tier) => tier.name);

const comparisonRows: readonly ComparisonRow[] = [
  { label: "Aadhaar Verification API", values: [true, true, true, true] },
  { label: "PAN Verification API", values: [true, true, true, true] },
  { label: "Driving Licence Verification", values: [false, true, true, true] },
  { label: "UAN Verification", values: [false, true, true, true] },
  { label: "Full KYC & DigiLocker", values: [false, true, true, true] },
  { label: "Monthly API credits", values: ["500", "50,000", "Unlimited", "Unlimited"] },
  { label: "Uptime SLA", values: [false, false, "99.99%", "Custom"] },
  { label: "Dedicated support", values: [false, false, true, true] },
  { label: "Custom compliance", values: [false, false, false, true] },
];

const faqs = [
  { question: "Can I change plans later?", answer: "Yes — you can upgrade, downgrade or cancel at any time from your dashboard. Changes apply from your next billing cycle." },
  { question: "Is there a free tier?", answer: "Yes. The Starter plan is free forever and includes sandbox access plus 500 API credits per month in production." },
  { question: "What happens if I exceed usage limits?", answer: "We'll notify you as you approach your plan's credit limit. You can upgrade instantly, or overage is billed at standard per-credit rates." },
  { question: "Do you offer enterprise support?", answer: "Yes. Enterprise plans include a dedicated account team, custom SLAs and priority incident response." },
  { question: "Is pricing based on API usage?", answer: "Yes — every plan includes a monthly API credit allowance. Each verification call consumes one credit; usage beyond your allowance is billed per credit." },
] as const;

function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-pill mx-auto">
              <Sparkles className="size-3.5" /> Simple, transparent pricing
            </span>
            <h1 className="hero-title mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Pricing that <span className="gradient-text">scales with you.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Start free in sandbox, then pay per API credit as you move to production. No hidden fees.
            </p>
          </div>
        </Reveal>

        <Reveal delay="delay-1" className="mt-8 flex justify-center">
          <PricingToggle yearly={yearly} onChange={setYearly} />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <Reveal key={tier.name} delay={index === 1 ? "delay-1" : index === 3 ? "delay-2" : undefined}>
              <PricingCard tier={tier} yearly={yearly} />
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="border-y border-line bg-panel/30">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading align="center" kicker="Compare Plans" title="Every plan, side by side." />
          <div className="mt-10">
            <FeatureComparison columns={comparisonColumns} rows={comparisonRows} />
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading align="center" kicker="FAQ" title="Frequently asked questions." />
        <div className="mx-auto mt-10 max-w-2xl">
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="border-line">
                <AccordionTrigger className="font-display text-base font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>

      <SolutionTrust />

      <ProductCTA
        kicker="Enterprise"
        title="Need a custom plan for your organization?"
        description="Talk to our team about volume pricing, custom SLAs and dedicated infrastructure."
        primaryLabel="Talk to Sales"
        primaryTo="/company/contact"
        secondaryLabel="Start Building Free"
        secondaryTo="/signup"
      />
    </>
  );
}
