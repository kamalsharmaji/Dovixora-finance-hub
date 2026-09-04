import type { LucideIcon } from "lucide-react";

export interface ServiceStatus {
  icon: LucideIcon;
  name: string;
  status: "Operational";
}

interface StatusServiceCardProps {
  service: ServiceStatus;
}

const bars = Array.from({ length: 24 }, (_, index) => index);

function StatusServiceCard({ service }: StatusServiceCardProps) {
  return (
    <article className="rounded-xl border border-line bg-panel/50 p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 font-display text-sm font-semibold text-foreground">
          <service.icon className="size-4 text-muted-foreground" />
          {service.name}
        </span>
        <span className="status-dot">
          <span /> {service.status}
        </span>
      </div>
      <div className="mt-4 flex h-5 items-end gap-[3px]" aria-hidden="true">
        {bars.map((bar) => (
          <span key={bar} className="h-full w-full rounded-[1px] bg-emerald/70" />
        ))}
      </div>
    </article>
  );
}

export { StatusServiceCard };
