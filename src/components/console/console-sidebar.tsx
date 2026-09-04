import { useLocation } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { ConsoleLink } from "@/components/console/console-link";
import { getConsoleNav } from "@/components/console/console-nav";
import { hasPermission } from "@/lib/permissions";
import type { ConsoleRole } from "@/lib/session";
import { useServiceRequests } from "@/lib/service-requests-store";

interface ConsoleSidebarProps {
  role: ConsoleRole;
  onNavigate?: () => void;
}

function ConsoleSidebar({ role, onNavigate }: ConsoleSidebarProps) {
  const location = useLocation();
  // The only numeric sidebar badge — the real pending-request count from the shared store,
  // never a hardcoded placeholder.
  const pendingRequestCount = useServiceRequests().filter((r) => r.status === "Pending").length;
  const groups = getConsoleNav(role)
    .map((group) => ({ ...group, items: group.items.filter((item) => !item.permission || hasPermission(role, item.permission)) }))
    .filter((group) => group.items.length > 0);

  return (
    <nav aria-label="Console" className="flex flex-col gap-5">
      {groups.map((group, groupIndex) => (
        <div key={group.heading ?? `group-${groupIndex}`}>
          {group.heading && (
            <p className="mb-1.5 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
              {group.heading}
            </p>
          )}
          <div className="grid gap-0.5">
            {group.items.map((item) => {
              const isActive =
                item.to === "/console" ? location.pathname === "/console" : location.pathname.startsWith(item.to);

              // Public docs/marketing pages open in a new tab so a sidebar click never
              // swaps out the dashboard shell (sidebar + top bar) — see console-nav.ts.
              if (item.external) {
                return (
                  <a
                    key={`${item.label}-${item.to}`}
                    href={item.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    <ExternalLink className="size-3.5 shrink-0 opacity-50" />
                  </a>
                );
              }

              return (
                <ConsoleLink
                  key={`${item.label}-${item.to}`}
                  to={item.to}
                  onClick={onNavigate}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald/10 text-emerald-bright"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="size-4 shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {item.to === "/console/service-requests" && pendingRequestCount > 0 && (
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-muted font-mono text-[10px] font-semibold text-foreground">
                      {pendingRequestCount}
                    </span>
                  )}
                </ConsoleLink>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export { ConsoleSidebar };
