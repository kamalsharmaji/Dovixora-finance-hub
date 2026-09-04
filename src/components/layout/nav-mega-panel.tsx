import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";

import type { NavItem } from "@/components/layout/nav-links";
import { Badge } from "@/components/ui/badge";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

interface NavMegaPanelProps {
  item: NavItem;
}

function MegaIcon({ icon: Icon }: { icon: LucideIcon | undefined }) {
  if (!Icon) return null;
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-md bg-cyan/10 text-cyan transition-colors group-hover:bg-cyan/15">
      <Icon className="size-4" />
    </span>
  );
}

function NavMegaPanel({ item }: NavMegaPanelProps) {
  const children = item.children ?? [];
  const isWide = children.length > 4;

  return (
    <div className={isWide ? "w-140 p-3" : "w-105 p-3"}>
      <ul className="grid grid-cols-2 gap-1">
        {children.map((child) =>
          child.comingSoon || !child.to ? (
            <li key={child.label}>
              <div className="flex cursor-default items-start gap-3 rounded-lg p-3 opacity-60">
                <MegaIcon icon={child.icon} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-display text-sm font-semibold text-foreground">{child.label}</p>
                    <Badge
                      variant="outline"
                      className="shrink-0 border-line px-1.5 py-0 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"
                    >
                      Soon
                    </Badge>
                  </div>
                  {child.description && (
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{child.description}</p>
                  )}
                </div>
              </div>
            </li>
          ) : (
            <li key={child.label}>
              <NavigationMenuLink asChild>
                <Link
                  to={child.to}
                  className="group flex items-start gap-3 rounded-lg p-3 outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
                >
                  <MegaIcon icon={child.icon} />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold text-foreground">{child.label}</p>
                    {child.description && (
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{child.description}</p>
                    )}
                  </div>
                </Link>
              </NavigationMenuLink>
            </li>
          ),
        )}
      </ul>

      <div className="mt-1 flex items-center justify-between rounded-lg border border-line bg-background/40 px-3 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          Explore {item.label.toLowerCase()}
        </span>
        <NavigationMenuLink asChild>
          <Link
            to={item.to}
            className="inline-flex items-center gap-1 rounded-sm text-xs font-semibold text-yellow-deep outline-none transition-colors hover:text-yellow-hover focus-visible:ring-2 focus-visible:ring-ring"
          >
            View all <ArrowRight className="size-3" />
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
}

export { NavMegaPanel };
