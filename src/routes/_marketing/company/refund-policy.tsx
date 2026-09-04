import { createFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const Route = createFileRoute("/_marketing/company/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — DOVIXORA" },
      { name: "description", content: "DOVIXORA's policy on credits, billing and refunds." },
    ],
  }),
  component: RefundPolicyPage,
});

function RefundPolicyPage() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <SectionHeading kicker="Legal" title="Refund Policy" description="Last updated September 2026" />
      <div className="mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          DOVIXORA bills on a credit-based, pay-for-what-you-use model. This policy explains when credits
          and payments can be refunded.
        </p>
        <p>
          <strong className="text-foreground">Sandbox usage.</strong> Sandbox verifications are free and
          never billed, so no refund is applicable to sandbox activity.
        </p>
        <p>
          <strong className="text-foreground">Failed verifications.</strong> Credits are not consumed for
          requests that fail due to a platform-side error; if you believe you were billed in error, contact
          our team with the verification ID.
        </p>
        <p>
          <strong className="text-foreground">Unused credits.</strong> Purchased credit packs are
          non-refundable once consumed, but unused balances can be reviewed on request within 30 days of
          purchase.
        </p>
        <p>Reach out through the contact page for any billing dispute.</p>
      </div>
    </Container>
  );
}
