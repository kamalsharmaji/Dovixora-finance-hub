import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";

export interface DeveloperToolItem {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  to: string;
  tone?: "blue" | "cyan" | "violet";
}

interface DeveloperToolsProps {
  kicker?: string;
  title: ReactNode;
  items: readonly DeveloperToolItem[];
}

function DeveloperTools({ kicker = "Developer Tools", title, items }: DeveloperToolsProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
      <SectionHeading kicker={kicker} title={title} />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Link key={item.to} to={item.to} className="group block">
            <article className={`product-card tone-${item.tone ?? "blue"} h-full`}>
              <div className="icon-tile">
                <item.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <div className="mt-6 flex items-center gap-1.5 font-display text-sm font-semibold text-blue-bright">
                {item.ctaLabel}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export { DeveloperTools };
