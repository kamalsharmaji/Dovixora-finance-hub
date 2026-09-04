import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";

import { Container } from "@/components/ui/container";

interface HeroCta {
  label: string;
  to: string;
}

interface ProductHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  visual?: ReactNode;
}

function ProductHero({ eyebrow, title, description, primaryCta, secondaryCta, visual }: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="ambient-light ambient-violet" />
      <div className="ambient-light ambient-cyan" />
      <Container
        className={`relative grid items-center gap-12 py-16 sm:py-20 lg:py-24 ${
          visual ? "lg:grid-cols-2 lg:gap-16" : ""
        }`}
      >
        <div>
          <span className="eyebrow-pill">
            <Zap className="size-3.5" /> {eyebrow}
          </span>
          <h1 className="hero-title mt-6 text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && <HeroCtaLink cta={primaryCta} className="gradient-button gradient-button-large" />}
              {secondaryCta && <HeroCtaLink cta={secondaryCta} className="outline-button" />}
            </div>
          )}
        </div>
        {visual && <div>{visual}</div>}
      </Container>
    </section>
  );
}

function HeroCtaLink({ cta, className }: { cta: HeroCta; className: string }) {
  if (cta.to.startsWith("#")) {
    return (
      <a href={cta.to} className={className}>
        {cta.label} {className.includes("gradient-button") && <ArrowRight className="size-4" />}
      </a>
    );
  }
  return (
    <Link to={cta.to} className={className}>
      {cta.label} {className.includes("gradient-button") && <ArrowRight className="size-4" />}
    </Link>
  );
}

export { ProductHero };
