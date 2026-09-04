import { ArrowRight, BadgeCheck, ExternalLink, FlaskConical, LifeBuoy, Zap } from "lucide-react";

import { ConsoleLink } from "@/components/console/console-link";
import { useConsoleSession } from "@/components/console/session-context";
import { MetricCard } from "@/components/products/metric-card";

const myActivity = [
  { action: "Ran a PAN verification", time: "24 min ago", status: "Verified" },
  { action: "Generated a sandbox key", time: "2 hrs ago", status: "Success" },
  { action: "Ran an Aadhaar verification", time: "Yesterday", status: "Verified" },
] as const;

function MemberDashboard() {
  const { session } = useConsoleSession();

  return (
    <div>
      <div className="max-w-2xl">
        <span className="section-kicker">Overview</span>
        <h1 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Hey {session.name.split(" ")[0]}, welcome to {session.orgName}.
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          You have a Team Member seat — here's your personal usage on DOVIXORA.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard icon={BadgeCheck} value="18" label="Verifications run by you" tone="blue" />
        <MetricCard icon={FlaskConical} value="42" label="Sandbox calls this month" tone="cyan" />
      </div>

      <div className="mt-8 dashboard-activity">
        <span className="font-display text-sm font-semibold">My recent activity</span>
        <div className="mt-4 space-y-3">
          {myActivity.map((entry, index) => (
            <div key={index} className="transaction-row">
              <span className="transaction-avatar">{session.name.slice(0, 1)}</span>
              <span className="min-w-0 flex-1">
                <strong className="block truncate">{entry.action}</strong>
                <small className="text-success">{entry.status}</small>
              </span>
              <b className="text-muted-foreground">{entry.time}</b>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ConsoleLink to="/console/verify" className="group product-card tone-blue">
          <div className="flex items-start justify-between gap-4">
            <div className="icon-tile">
              <Zap className="size-5" />
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
          </div>
          <h3 className="mt-4 font-display text-base font-bold">Run a verification</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">If your Owner has granted access.</p>
        </ConsoleLink>
        <a href="/developers/sandbox" target="_blank" rel="noopener noreferrer" className="group product-card tone-cyan">
          <div className="flex items-start justify-between gap-4">
            <div className="icon-tile">
              <FlaskConical className="size-5" />
            </div>
            <ExternalLink className="size-4 shrink-0 text-muted-foreground opacity-60" />
          </div>
          <h3 className="mt-4 font-display text-base font-bold">Open Sandbox</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Test API calls safely, no live data.</p>
        </a>
        <ConsoleLink to="/console/support" className="group product-card tone-violet">
          <div className="flex items-start justify-between gap-4">
            <div className="icon-tile">
              <LifeBuoy className="size-5" />
            </div>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
          </div>
          <h3 className="mt-4 font-display text-base font-bold">Raise a ticket</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">Stuck on something? Ask for help.</p>
        </ConsoleLink>
      </div>
    </div>
  );
}

export { MemberDashboard };
