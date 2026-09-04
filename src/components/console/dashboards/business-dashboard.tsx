import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CreditCard,
  ExternalLink,
  FolderLock,
  KeyRound,
  QrCode,
  UserPlus,
} from "lucide-react";

import { ConsoleLink } from "@/components/console/console-link";
import { useConsoleSession } from "@/components/console/session-context";
import { RequestsAreaChart } from "@/components/console/charts/requests-area-chart";
import { MetricCard } from "@/components/products/metric-card";
import { requestsForOrg, useServiceRequests } from "@/lib/service-requests-store";

const productMetrics = [
  { icon: QrCode, value: "1,240", label: "Aadhaar this month", tone: "blue" as const },
  { icon: CreditCard, value: "864", label: "PAN this month", tone: "cyan" as const },
  { icon: BadgeCheck, value: "312", label: "Full KYC this month", tone: "emerald" as const },
  { icon: Briefcase, value: "96", label: "UAN this month", tone: "blue" as const },
];

const creditUsage = [
  { label: "Aug 21", requests: 2600 },
  { label: "Aug 23", requests: 3100 },
  { label: "Aug 25", requests: 2900 },
  { label: "Aug 27", requests: 3600 },
  { label: "Aug 29", requests: 3300 },
  { label: "Aug 31", requests: 4200 },
  { label: "Sep 02", requests: 3900 },
];

const recentVerifications = [
  { name: "Rahul Sharma", type: "Full KYC", status: "Verified" },
  { name: "Priya Menon", type: "PAN Verification", status: "Verified" },
  { name: "Vikram Das", type: "Aadhaar Verification", status: "Review" },
  { name: "Ayesha Khan", type: "DigiLocker Pull", status: "Verified" },
  { name: "Sanjay Rao", type: "Driving Licence", status: "Failed" },
] as const;

// .transaction-row small has a hardcoded CSS color (always success-green) that beats
// Tailwind color utilities, so status colors are applied as inline styles instead.
const statusColors: Record<string, string> = {
  Verified: "var(--success)",
  Review: "var(--warning)",
  Failed: "var(--error)",
};

const teamActivity = [
  { name: "Rohit Sen", action: "ran a PAN verification", time: "12 min ago" },
  { name: "Meera Iyer", action: "generated a new API key", time: "1 hr ago" },
  { name: "Rohit Sen", action: "invited a new team member", time: "3 hrs ago" },
] as const;

const quickLinks = [
  { icon: BadgeCheck, title: "Run a verification", description: "Aadhaar, PAN, DL, UAN or Full KYC — instantly.", to: "/console/verify" },
  { icon: UserPlus, title: "Invite a teammate", description: "Add a developer or viewer to your organization.", to: "/console/team" },
  { icon: KeyRound, title: "Generate an API key", description: "Create a live or sandbox key for your app.", to: "/console/developer/keys" },
  { icon: FolderLock, title: "Read the docs", description: "Guides for integrating DOVIXORA into your product.", to: "/developers/documentation", external: true },
] as const;

function BusinessDashboard() {
  const { session } = useConsoleSession();
  const myRequests = requestsForOrg(useServiceRequests(), "atlas-studio");
  const activeCount = myRequests.filter((r) => r.status === "Active").length;
  const pendingCount = myRequests.filter((r) => r.status === "Pending").length;
  const paymentDueCount = myRequests.filter((r) => r.status === "Payment Pending").length;

  return (
    <div>
      <div className="max-w-2xl">
        <span className="section-kicker">Overview</span>
        <h1 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
          Welcome back, {session.name.split(" ")[0]}.
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Here's how {session.orgName} is using DOVIXORA this month.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {productMetrics.map((metric) => (
          <MetricCard key={metric.label} icon={metric.icon} value={metric.value} label={metric.label} tone={metric.tone} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="dashboard-metric">
          <span>Active services</span>
          <strong className="metric-emerald">{activeCount}</strong>
          <small className="normal-case tracking-normal text-muted-foreground">
            <ConsoleLink to="/console/products" className="hover:text-foreground hover:underline">
              View catalogue
            </ConsoleLink>
          </small>
        </div>
        <div className="dashboard-metric">
          <span>Pending requests</span>
          <strong className="metric-ink">{pendingCount}</strong>
          <small className="normal-case tracking-normal text-muted-foreground">Awaiting admin review</small>
        </div>
        <div className="dashboard-metric">
          <span>Payment required</span>
          <strong className={paymentDueCount > 0 ? "text-warning" : "metric-ink"}>{paymentDueCount}</strong>
          <small className="normal-case tracking-normal text-muted-foreground">
            {paymentDueCount > 0 ? (
              <ConsoleLink to="/console/products" className="hover:text-foreground hover:underline">
                Complete payment
              </ConsoleLink>
            ) : (
              "Nothing due"
            )}
          </small>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="dashboard-metric">
          <span>Current plan</span>
          <strong className="metric-emerald">Growth</strong>
          <small className="normal-case tracking-normal text-muted-foreground">
            <ConsoleLink to="/console/billing" className="hover:text-foreground hover:underline">
              Manage plan
            </ConsoleLink>
          </small>
        </div>
        <div className="dashboard-metric">
          <span>Credits remaining</span>
          <strong className="metric-ink">38,240 / 50,000</strong>
          <small className="normal-case tracking-normal text-muted-foreground">Resets in 14 days</small>
        </div>
        <div className="dashboard-metric">
          <span>Next invoice</span>
          <strong className="metric-ink">₹2,999</strong>
          <small className="normal-case tracking-normal text-muted-foreground">Due Sep 18, 2026</small>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-panel p-5">
        <span className="font-display text-sm font-semibold text-foreground">API Credit Usage</span>
        <RequestsAreaChart data={creditUsage} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="dashboard-activity">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold">Recent verifications</span>
            <ConsoleLink to="/console/verify/history" className="text-xs text-emerald-bright hover:underline">
              View all
            </ConsoleLink>
          </div>
          <div className="mt-4 space-y-3">
            {recentVerifications.map((item) => (
              <div key={item.name} className="transaction-row">
                <span className="transaction-avatar">{item.name.slice(0, 1)}</span>
                <span className="min-w-0 flex-1">
                  <strong className="block truncate">{item.name}</strong>
                  <small style={{ color: statusColors[item.status] }}>{item.status}</small>
                </span>
                <b>{item.type}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-activity">
          <span className="font-display text-sm font-semibold">Team activity</span>
          <div className="mt-4 space-y-3">
            {teamActivity.map((entry, index) => (
              <div key={index} className="transaction-row">
                <span className="transaction-avatar">{entry.name.slice(0, 1)}</span>
                <span className="min-w-0 flex-1">
                  <strong className="block truncate">{entry.name}</strong>
                  <small style={{ color: "var(--muted-foreground)" }}>{entry.action}</small>
                </span>
                <b className="text-muted-foreground">{entry.time}</b>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) =>
          "external" in link && link.external ? (
            <a key={link.to} href={link.to} target="_blank" rel="noopener noreferrer" className="group product-card tone-blue">
              <div className="flex items-start justify-between gap-4">
                <div className="icon-tile">
                  <link.icon className="size-5" />
                </div>
                <ExternalLink className="size-4 shrink-0 text-muted-foreground opacity-60" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold">{link.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{link.description}</p>
            </a>
          ) : (
            <ConsoleLink key={link.to} to={link.to} className="group product-card tone-blue">
              <div className="flex items-start justify-between gap-4">
                <div className="icon-tile">
                  <link.icon className="size-5" />
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold">{link.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{link.description}</p>
            </ConsoleLink>
          ),
        )}
      </div>
    </div>
  );
}

export { BusinessDashboard };
