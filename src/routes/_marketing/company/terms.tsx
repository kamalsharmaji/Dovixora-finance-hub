import { createFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const Route = createFileRoute("/_marketing/company/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — DOVIXORA" },
      { name: "description", content: "The terms governing use of the DOVIXORA platform and APIs." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <SectionHeading kicker="Legal" title="Terms of Service" description="Last updated September 2026" />
      <div className="mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          These Terms of Service govern access to and use of DOVIXORA's verification APIs, dashboard and
          related services. By creating an account or calling our APIs, you agree to these terms.
        </p>
        <p>
          <strong className="text-foreground">Acceptable use.</strong> You agree to use DOVIXORA only for
          lawful verification purposes, with appropriate end-user consent, and not to attempt to circumvent
          rate limits, security controls or authentication mechanisms.
        </p>
        <p>
          <strong className="text-foreground">Account responsibility.</strong> You are responsible for
          safeguarding API keys issued to your account and for all activity performed under them.
        </p>
        <p>
          <strong className="text-foreground">Service availability.</strong> DOVIXORA is provided on an
          "as available" basis. We aim for high uptime but do not guarantee uninterrupted service.
        </p>
        <p>
          <strong className="text-foreground">Termination.</strong> Either party may terminate access at
          any time; outstanding obligations, including payment for usage already incurred, survive
          termination.
        </p>
        <p>Questions about these terms can be sent to our team through the contact page.</p>
      </div>
    </Container>
  );
}
