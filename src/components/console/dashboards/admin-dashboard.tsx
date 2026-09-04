import { ArrowRight, Building2, ClipboardCheck, Clock, LifeBuoy } from "lucide-react";

import { ConsoleLink } from "@/components/console/console-link";
import { KpiCard } from "@/components/console/kpi-card";
import { kpiColors } from "@/components/console/palette";
import { useConsoleSession } from "@/components/console/session-context";

const reviewQueue = [
  { client: "Nova Health", type: "Full KYC", waiting: "2h 14m", sla: "warn" },
  { client: "Kite Markets", type: "Aadhaar Verification", waiting: "0h 42m", sla: "ok" },
  { client: "Meridian Pay", type: "Business Verification", waiting: "5h 03m", sla: "breach" },
  { client: "Solstice Labs", type: "Employment Verification", waiting: "1h 10m", sla: "ok" },
] as const;

// .transaction-row small/b have hardcoded CSS colors that beat Tailwind color
// utilities, so status colors below are applied as inline styles instead.
const slaColors: Record<string, string> = {
  ok: "var(--success)",
  warn: "var(--warning)",
  breach: "var(--error)",
};

const myClients = [
  { name: "Nova Health", plan: "Growth", status: "Active" },
  { name: "Kite Markets", plan: "Scale", status: "Active" },
  { name: "Meridian Pay", plan: "Growth", status: "Onboarding" },
  { name: "Solstice Labs", plan: "Starter", status: "Active" },
] as const;

function AdminDashboard() {
  const { session } = useConsoleSession();

  return (
    <div>
      <div className="max-w-2xl">
        <span className="section-kicker">Overview</span>
        <h1 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Welcome back, {session.name.split(" ")[0]}.
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your queue, your assigned clients and your open tickets — at a glance.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard icon={Building2} value="14" label="Assigned Clients" color={kpiColors.blue} />
        <KpiCard icon={ClipboardCheck} value="7" label="Pending Reviews" color={kpiColors.amber} />
        <KpiCard icon={LifeBuoy} value="4" label="Open Tickets" color={kpiColors.violet} />
        <KpiCard icon={Clock} value="38m" label="Avg. Resolution Time" color={kpiColors.teal} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="dashboard-activity">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold">My review queue</span>
            <ConsoleLink to="/console/review-queue" className="text-xs text-emerald-bright hover:underline">
              Open queue
            </ConsoleLink>
          </div>
          <div className="mt-4 space-y-3">
            {reviewQueue.map((item) => (
              <div key={item.client} className="transaction-row">
                <span className="transaction-avatar">{item.client.slice(0, 1)}</span>
                <span className="min-w-0 flex-1">
                  <strong className="block truncate">{item.client}</strong>
                  <small style={{ color: slaColors[item.sla] }}>{item.waiting} waiting</small>
                </span>
                <b>{item.type}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-activity">
          <span className="font-display text-sm font-semibold">My assigned clients</span>
          <div className="mt-4 space-y-3">
            {myClients.map((client) => (
              <div key={client.name} className="transaction-row">
                <span className="transaction-avatar">{client.name.slice(0, 1)}</span>
                <span className="min-w-0 flex-1">
                  <strong className="block truncate">{client.name}</strong>
                  <small style={{ color: "var(--muted-foreground)" }}>{client.plan} plan</small>
                </span>
                <b style={{ color: client.status === "Active" ? "var(--success)" : "var(--warning)" }}>
                  {client.status}
                </b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ConsoleLink to="/console/review-queue" className="group product-card tone-blue">
          <div className="flex items-start justify-between gap-4">
            <div className="icon-tile">
              <ClipboardCheck className="size-5" />
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
          </div>
          <h3 className="mt-4 font-display text-base font-bold">Start next review</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Oldest submission in your queue first.</p>
        </ConsoleLink>
        <ConsoleLink to="/console/support" className="group product-card tone-cyan">
          <div className="flex items-start justify-between gap-4">
            <div className="icon-tile">
              <LifeBuoy className="size-5" />
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
          </div>
          <h3 className="mt-4 font-display text-base font-bold">Open a ticket</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Respond to an assigned client.</p>
        </ConsoleLink>
        <ConsoleLink to="/console/clients" className="group product-card tone-violet">
          <div className="flex items-start justify-between gap-4">
            <div className="icon-tile">
              <Building2 className="size-5" />
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
          </div>
          <h3 className="mt-4 font-display text-base font-bold">Contact a client</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Reach out from your client list.</p>
        </ConsoleLink>
      </div>
    </div>
  );
}

export { AdminDashboard };
