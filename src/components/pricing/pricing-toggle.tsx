import { Badge } from "@/components/ui/badge";

interface PricingToggleProps {
  yearly: boolean;
  onChange: (yearly: boolean) => void;
}

function PricingToggle({ yearly, onChange }: PricingToggleProps) {
  return (
    <div
      role="group"
      aria-label="Billing period"
      className="inline-flex items-center gap-1 rounded-full border border-line bg-panel/60 p-1"
    >
      <button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={!yearly}
        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          !yearly ? "bg-yellow text-charcoal" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={yearly}
        className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          yearly ? "bg-yellow text-charcoal" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        Yearly
        <Badge
          variant="outline"
          className={`border-emerald/40 px-1.5 py-0 text-[10px] font-semibold ${yearly ? "bg-charcoal/10 text-charcoal" : "bg-emerald/10 text-emerald"}`}
        >
          Save 20%
        </Badge>
      </button>
    </div>
  );
}

export { PricingToggle };
