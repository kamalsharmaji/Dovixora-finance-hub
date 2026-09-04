import { Link } from "@tanstack/react-router";
import { Github, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface SdkData {
  name: string;
  icon: LucideIcon;
  description: string;
  installCommand: string;
  pmAltCommand?: string;
  available?: boolean;
}

interface SdkCardProps {
  sdk: SdkData;
  compact?: boolean;
}

function SdkCard({ sdk, compact = false }: SdkCardProps) {
  return (
    <article className="product-card tone-blue h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="icon-tile">
          <sdk.icon className="size-5" />
        </div>
        {!sdk.available && (
          <Badge variant="outline" className="border-line font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            Coming soon
          </Badge>
        )}
      </div>
      <h3 className="mt-5 font-display text-lg font-bold">{sdk.name}</h3>
      {!compact && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sdk.description}</p>}

      <div className="mt-4 rounded-lg border border-line bg-background/40 px-3 py-2.5 font-mono text-xs text-cyan">
        {sdk.installCommand}
      </div>
      {sdk.pmAltCommand && (
        <div className="mt-2 rounded-lg border border-line bg-background/40 px-3 py-2.5 font-mono text-xs text-muted-foreground">
          {sdk.pmAltCommand}
        </div>
      )}

      {!compact && (
        <div className="mt-6 flex flex-wrap gap-2">
          {sdk.available ? (
            <Button asChild size="sm">
              <Link to="/developers/documentation">View Docs</Link>
            </Button>
          ) : (
            <Button size="sm" variant="secondary" disabled>
              View Docs
            </Button>
          )}
          <Button size="sm" variant="outline" disabled aria-label={`${sdk.name} GitHub repository — coming soon`}>
            <Github className="size-4" /> GitHub
          </Button>
        </div>
      )}
    </article>
  );
}

export { SdkCard };
