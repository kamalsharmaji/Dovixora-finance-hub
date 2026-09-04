import { createFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export const Route = createFileRoute("/_marketing/company/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — DOVIXORA" },
      { name: "description", content: "How DOVIXORA collects, uses and protects data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <SectionHeading kicker="Legal" title="Privacy Policy" description="Last updated September 2026" />
      <div className="mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          This policy explains what data DOVIXORA collects when you use our website, dashboard and APIs,
          and how that data is handled.
        </p>
        <p>
          <strong className="text-foreground">Data we process.</strong> Verification requests may include
          identity, document, business, bank or employment data supplied by you or your end users, solely
          to perform the requested verification.
        </p>
        <p>
          <strong className="text-foreground">Masking & retention.</strong> Sensitive identifiers are
          masked wherever the verification workflow allows it, and retained only as long as needed to
          deliver the service or meet compliance obligations.
        </p>
        <p>
          <strong className="text-foreground">Sharing.</strong> Data is shared only with the official
          registries and sources required to complete a verification — never sold to third parties.
        </p>
        <p>
          <strong className="text-foreground">Your rights.</strong> You may request access to, correction
          of, or deletion of your account data by contacting our team.
        </p>
      </div>
    </Container>
  );
}
