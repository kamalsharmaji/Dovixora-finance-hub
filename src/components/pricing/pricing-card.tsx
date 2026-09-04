import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number | null;
  features: readonly string[];
  ctaLabel: string;
  ctaTo: string;
  popular?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  yearly: boolean;
}

function PricingCard({ tier, yearly }: PricingCardProps) {
  const isCustom = tier.monthlyPrice === null;
  const isFree = tier.monthlyPrice === 0;
  const displayPrice = isCustom
    ? "Custom"
    : isFree
      ? "₹0"
      : `₹${(yearly ? Math.round(tier.monthlyPrice! * 0.8) : tier.monthlyPrice!).toLocaleString("en-IN")}`;

  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 ${
        tier.popular
          ? "border-yellow-deep/60 bg-panel shadow-[0_0_0_1px_rgba(245,197,24,0.35),0_20px_60px_-20px_rgba(212,169,0,0.35)]"
          : "border-line bg-panel/50 hover:border-yellow-deep/30"
      }`}
    >
      {tier.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 border-transparent bg-yellow px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-charcoal">
          Most Popular
        </Badge>
      )}

      <h3 className="font-display text-lg font-bold text-foreground">{tier.name}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{tier.description}</p>

      <div className="mt-6">
        <span className="font-display text-4xl font-extrabold text-foreground">{displayPrice}</span>
        {!isCustom && !isFree && (
          <span className="ml-1 text-sm text-muted-foreground">/mo{yearly ? ", billed yearly" : ""}</span>
        )}
        {isFree && <span className="ml-1 text-sm text-muted-foreground">forever</span>}
      </div>

      <ul className="mt-6 grid gap-2.5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-muted-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-cyan" /> {feature}
          </li>
        ))}
      </ul>

      <Button asChild className="mt-8 w-full" variant={tier.popular ? "default" : "secondary"}>
        <Link to={tier.ctaTo}>
          {tier.ctaLabel} <ArrowRight className="size-4" />
        </Link>
      </Button>
    </div>
  );
}

export { PricingCard };
