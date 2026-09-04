import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Building2,
  ClipboardCheck,
  Code2,
  KeyRound,
  ShieldCheck,
  TrendingUp,
  Users,
  UserPlus,
} from "lucide-react";

import { KpiCard } from "@/components/console/kpi-card";
import { kpiColors } from "@/components/console/palette";
import { organizations } from "@/components/console/org-data";
import { useConsoleSession } from "@/components/console/session-context";
import { StatusBadge } from "@/components/console/status-badge";
import { RequestsAreaChart } from "@/components/console/charts/requests-area-chart";
import { StatusDonut } from "@/components/console/charts/status-donut";

const kpis = [
  { icon: Building2, label: "Total Organizations", value: "1,248", color: kpiColors.blue, trend: { value: "18.2%", direction: "up" as const } },
  { icon: Users, label: "Total Users", value: "25,430", color: kpiColors.violet, trend: { value: "22.5%", direction: "up" as const } },
  { icon: Code2, label: "API Requests (Month)", value: "4.2M", color: kpiColors.amber, trend: { value: "34.6%", direction: "up" as const } },
  { icon: KeyRound, label: "Active API Keys", value: "8,721", color: kpiColors.teal, trend: { value: "12.7%", direction: "up" as const } },
  { icon: ShieldCheck, label: "API Success Rate", value: "99.99%", color: kpiColors.emerald, trend: { value: "0.02%", direction: "up" as const } },
  { icon: TrendingUp, label: "Monthly Revenue", value: "₹2.48 Cr", color: kpiColors.slate, trend: { value: "26.8%", direction: "up" as const } },
];

const requestVolume = [
  { label: "May 01", requests: 118000 },
  { label: "May 05", requests: 142000 },
  { label: "May 09", requests: 131000 },
  { label: "May 13", requests: 158000 },
  { label: "May 17", requests: 149000 },
  { label: "May 21", requests: 172000 },
  { label: "May 25", requests: 164000 },
  { label: "May 29", requests: 181000 },
  { label: "May 31", requests: 176000 },
];

const statusSlices = [
  { name: "Successful", value: 4190000, color: "var(--success)" },
  { name: "Failed", value: 2800, color: "var(--error)" },
  { name: "Pending", value: 1200, color: "var(--warning)" },
];

const systemHealth = [
  "API Gateway",
  "Database",
  "Verification Services",
  "Payment System",
  "Email Service",
  "Webhook Delivery",
];

const topApis = [
  { name: "Aadhaar Verification API", requests: "1.24M requests", trend: "+28.4%" },
  { name: "PAN Verification API", requests: "987K requests", trend: "+21.7%" },
  { name: "KYC Verification API", requests: "765K requests", trend: "+18.6%" },
  { name: "UAN Verification API", requests: "642K requests", trend: "+16.3%" },
];

const transactions = [
  { org: "Solstice Labs", desc: "Payment from Solstice Labs", amount: "₹85,000", time: "2 min ago" },
  { org: "Kite Markets", desc: "Subscription — Kite Markets", amount: "₹1,25,000", time: "18 min ago" },
  { org: "Meridian Pay", desc: "Payment from Meridian Pay", amount: "₹45,000", time: "32 min ago" },
  { org: "Nimbus Fintech", desc: "Subscription — Nimbus Fintech", amount: "₹65,000", time: "45 min ago" },
];

const recentErrors = [
  { time: "2 min ago", org: "Solstice Labs", api: "Aadhaar Verification", error: "Invalid Aadhaar Number" },
  { time: "8 min ago", org: "Kite Markets", api: "PAN Verification", error: "PAN format is invalid" },
  { time: "12 min ago", org: "Meridian Pay", api: "KYC Verification", error: "Document upload failed" },
  { time: "18 min ago", org: "Nimbus Fintech", api: "UAN Verification", error: "UAN not found" },
];

const activity = [
  { text: "New organization 'Solstice Labs' registered", time: "2 min ago", color: kpiColors.blue },
  { text: "Admin user 'Rahul Sharma' added", time: "15 min ago", color: kpiColors.violet },
  { text: "API key generated for 'Kite Markets'", time: "18 min ago", color: kpiColors.teal },
  { text: "Payment received from 'Meridian Pay'", time: "32 min ago", color: kpiColors.emerald },
  { text: "High API traffic detected", time: "45 min ago", color: kpiColors.rose },
];

const quickActions = [
  { icon: UserPlus, label: "Create Organization", to: "/console/clients", color: kpiColors.blue },
  { icon: Users, label: "Add Admin", to: "/console/users", color: kpiColors.violet },
  { icon: Activity, label: "Manage Services", to: "/console/products", color: kpiColors.amber },
  { icon: ClipboardCheck, label: "View API Logs", to: "/console/platform", color: kpiColors.teal },
];

function SuperAdminDashboard() {
  const { session } = useConsoleSession();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="section-kicker">Overview</span>
          <h1 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
            Welcome back, {session.name.split(" ")[0]} 👋
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Here's what's happening across the DOVIXORA platform.</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr_1fr]">
        <div className="rounded-2xl border border-line bg-panel p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-foreground">API Requests Overview</span>
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">Last 30 days</span>
          </div>
          <div className="mt-2">
            <RequestsAreaChart data={requestVolume} />
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-panel p-5">
          <span className="font-display text-sm font-semibold text-foreground">Requests by Status</span>
          <StatusDonut data={statusSlices} centerLabel="Total" />
          <div className="grid gap-2">
            {statusSlices.map((slice) => (
              <div key={slice.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-foreground">
                  <span className="size-2 rounded-full" style={{ background: slice.color }} />
                  {slice.name}
                </span>
                <span className="font-mono text-muted-foreground">{slice.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-panel p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-foreground">System Health</span>
            <Link to="/console/platform" className="text-xs text-emerald-bright hover:underline">View All</Link>
          </div>
          <div className="mt-4 grid gap-3">
            {systemHealth.map((service) => (
              <div key={service} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{service}</span>
                <StatusBadge status="Operational" tone="good" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-line bg-panel p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-foreground">Recent Organizations</span>
            <Link to="/console/clients" className="text-xs text-emerald-bright hover:underline">View All</Link>
          </div>
          <div className="mt-4 space-y-3">
            {organizations.slice(0, 5).map((org) => (
              <div key={org.id} className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted font-mono text-[10px] font-semibold text-foreground">
                  {org.name.slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{org.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{org.owner}</p>
                </div>
                <StatusBadge status={org.plan} tone={org.plan === "Enterprise" ? "good" : "neutral"} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-panel p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-foreground">Top API Products</span>
            <Link to="/console/reports" className="text-xs text-emerald-bright hover:underline">View All</Link>
          </div>
          <div className="mt-4 space-y-3">
            {topApis.map((api) => (
              <div key={api.name} className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg" style={{ background: `color-mix(in oklab, ${kpiColors.emerald} 14%, transparent)`, color: kpiColors.emerald }}>
                  <Code2 className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{api.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{api.requests}</p>
                </div>
                <span className="shrink-0 font-mono text-xs font-semibold text-success">{api.trend}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-panel p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-foreground">Recent Transactions</span>
            <Link to="/console/finance" className="text-xs text-emerald-bright hover:underline">View All</Link>
          </div>
          <div className="mt-4 space-y-3">
            {transactions.map((tx) => (
              <div key={tx.desc} className="flex items-center gap-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{tx.desc}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{tx.time}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-xs font-semibold text-foreground">{tx.amount}</p>
                  <StatusBadge status="Success" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-panel p-5">
          <span className="font-display text-sm font-semibold text-foreground">Quick Actions</span>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.to}
                className="flex flex-col items-start gap-2 rounded-xl border border-line p-3 transition-colors hover:border-emerald/25 hover:bg-emerald/5"
              >
                <span className="grid size-8 place-items-center rounded-lg" style={{ background: `color-mix(in oklab, ${action.color} 14%, transparent)`, color: action.color }}>
                  <action.icon className="size-4" />
                </span>
                <span className="text-xs font-semibold leading-tight text-foreground">{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-line bg-panel p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-foreground">Recent API Errors</span>
            <Link to="/console/platform" className="text-xs text-emerald-bright hover:underline">View All</Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 font-medium">Time</th>
                  <th className="pb-2 font-medium">Organization</th>
                  <th className="pb-2 font-medium">API</th>
                  <th className="pb-2 font-medium">Error</th>
                  <th className="pb-2 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentErrors.map((error, index) => (
                  <tr key={index} className="border-t border-line">
                    <td className="py-2.5 text-muted-foreground">{error.time}</td>
                    <td className="py-2.5 text-foreground">{error.org}</td>
                    <td className="py-2.5 text-muted-foreground">{error.api}</td>
                    <td className="py-2.5 text-muted-foreground">{error.error}</td>
                    <td className="py-2.5 text-right"><StatusBadge status="Failed" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-panel p-5">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-foreground">Platform Activity</span>
            <Link to="/console/compliance/audit" className="text-xs text-emerald-bright hover:underline">View All</Link>
          </div>
          <div className="relative mt-4 grid gap-4 pl-4">
            <span className="absolute bottom-2 left-[3px] top-2 w-px bg-line" aria-hidden="true" />
            {activity.map((entry, index) => (
              <div key={index} className="relative flex items-start gap-3">
                <span className="absolute -left-4 top-1 size-[7px] rounded-full ring-4 ring-panel" style={{ background: entry.color }} />
                <div className="min-w-0">
                  <p className="text-xs text-foreground">{entry.text}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{entry.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 flex items-center gap-1 font-mono text-[11px] text-muted-foreground/70">
        Signed in as {session.email} <ArrowRight className="size-3" />
      </p>
    </div>
  );
}

export { SuperAdminDashboard };
