import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";

interface ProductCtaProps {
  kicker?: string;
  title: ReactNode;
  description: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

function ProductCTA({
  kicker = "Get started",
  title,
  description,
  primaryLabel = "Start Building Free",
  primaryTo = "/signup",
  secondaryLabel = "Talk to Our Team",
  secondaryTo = "/company/contact",
}: ProductCtaProps) {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="cta-panel">
        <div className="cta-lines" />
        <div className="relative z-10 text-center">
          <span className="section-kicker">{kicker}</span>
          <h2 className="section-title mx-auto mt-3 max-w-2xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to={primaryTo} className="light-button">
              {primaryLabel} <ArrowRight className="size-4" />
            </Link>
            <Link to={secondaryTo} className="outline-button">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}

export { ProductCTA };
