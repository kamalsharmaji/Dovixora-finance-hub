import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export interface SolutionBenefitItem {
  icon: LucideIcon;
  label: string;
}

interface SolutionBenefitsProps {
  kicker: string;
  title: ReactNode;
  description?: string;
  items: readonly SolutionBenefitItem[];
}

function SolutionBenefits({ kicker, title, description, items }: SolutionBenefitsProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-24">
      <SectionHeading kicker={kicker} title={title} description={description} />
      <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-line bg-panel/50 px-4 py-3.5"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-blue/10 text-blue">
              <item.icon className="size-4" />
            </span>
            <span className="font-display text-sm font-semibold text-foreground">{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { SolutionBenefits };
