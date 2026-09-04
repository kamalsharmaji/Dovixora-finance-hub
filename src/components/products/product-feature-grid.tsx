import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, type LucideIcon } from "lucide-react";

export type ProductCardTone = "blue" | "cyan" | "violet";

export interface ProductCardData {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: readonly string[];
  to: string;
  tone: ProductCardTone;
  featured?: boolean;
  /** Optional per-card icon-badge color override, e.g. "bg-orange-100 text-orange-600". */
  iconClassName?: string;
  /** Optional image (from /public) rendered instead of the Lucide icon. */
  image?: string;
}

interface ProductFeatureGridProps {
  items: readonly ProductCardData[];
  /** CTA label at the bottom of each card. Defaults to "Explore". */
  ctaLabel?: string;
  /** Single-row, narrower cards for laptop+ widths (no featured 2-col span). Defaults to false. */
  compact?: boolean;
}

function ProductFeatureGrid({ items, ctaLabel = "Explore", compact = false }: ProductFeatureGridProps) {
  return (
    <div
      className={
        compact
          ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          : "grid grid-cols-1 gap-4 md:grid-cols-3"
      }
    >
      {items.map((item) => (
        <ProductCard key={item.to} item={item} ctaLabel={ctaLabel} compact={compact} />
      ))}
    </div>
  );
}

function ProductCard({ item, ctaLabel, compact }: { item: ProductCardData; ctaLabel: string; compact: boolean }) {
  const Icon = item.icon;
  const isFeatured = item.featured && !compact;
  return (
    <Link to={item.to} className={`group block ${isFeatured ? "md:col-span-2" : ""}`}>
      <article
        className={`product-card tone-${item.tone} ${isFeatured ? "product-card-featured" : ""} h-full ${compact ? "!p-4" : ""}`}
      >
        <div className="flex items-start justify-between gap-5">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              aria-hidden="true"
              className={`rounded-xl object-contain shadow-sm transition-transform duration-300 group-hover:scale-105 ${compact ? "size-12" : "size-14"}`}
            />
          ) : (
            <div className={`icon-tile transition-colors ${compact ? "!size-9" : ""} ${item.iconClassName ?? ""}`}>
              <Icon className={compact ? "size-4" : "size-5"} />
            </div>
          )}
        </div>
        <h3 className={`mt-5 font-display font-bold ${compact ? "text-base" : "text-xl"}`}>{item.title}</h3>
        <p className={`mt-2 max-w-sm leading-relaxed text-muted-foreground ${compact ? "text-xs" : "text-sm"}`}>
          {item.description}
        </p>
        <ul className="mt-4 space-y-2">
          {item.highlights.map((highlight) => (
            <li key={highlight} className={`check-row text-muted-foreground ${compact ? "text-xs" : "text-sm"}`}>
              <Check className={compact ? "size-3.5 shrink-0" : undefined} /> {highlight}
            </li>
          ))}
        </ul>
        <div
          className={`mt-6 flex items-center gap-1.5 font-display font-semibold text-blue-bright ${compact ? "text-xs" : "text-sm"}`}
        >
          {ctaLabel}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </article>
    </Link>
  );
}

export { ProductFeatureGrid };
