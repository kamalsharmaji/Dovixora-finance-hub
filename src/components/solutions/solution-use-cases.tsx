import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export interface UseCaseItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface SolutionUseCasesProps {
  kicker: string;
  title: ReactNode;
  items: readonly UseCaseItem[];
}

function SolutionUseCases({ kicker, title, items }: SolutionUseCasesProps) {
  return (
    <section className="border-y border-line bg-panel/30">
      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading kicker={kicker} title={title} />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="step-card">
              <div className="step-icon">
                <item.icon className="size-5" />
              </div>
              <h3 className="mt-6 font-display text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export { SolutionUseCases };
