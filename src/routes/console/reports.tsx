import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, CheckCircle2, Timer, XCircle } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricCard } from "@/components/products/metric-card";
import { PageHeader } from "@/components/console/page-header";
import { UsageBarChart } from "@/components/console/usage-bar-chart";

export const Route = createFileRoute("/console/reports")({
  head: () => ({ meta: [{ title: "Usage Analytics — DOVIXORA Console" }] }),
  component: ReportsPage,
});

const ranges = ["Today", "7 Days", "30 Days", "Custom Range"] as const;
const rangeMultiplier: Record<(typeof ranges)[number], number> = { Today: 0.05, "7 Days": 0.35, "30 Days": 1, "Custom Range": 1 };

const dailyRequests = [820, 940, 1120, 980, 1340, 1260, 1510, 1420, 1680, 1590, 1780, 1910];

const topApis = [
  { name: "Aadhaar Verification", share: 34 },
  { name: "PAN Verification", share: 26 },
  { name: "Full KYC", share: 18 },
  { name: "DigiLocker", share: 12 },
  { name: "UAN Verification", share: 10 },
];

const errorBreakdown = [
  { code: "422 Invalid input", share: 46 },
  { code: "401 Unauthorized", share: 24 },
  { code: "429 Rate limited", share: 18 },
  { code: "500 Upstream error", share: 12 },
];

function ReportsPage() {
  const [range, setRange] = useState<(typeof ranges)[number]>("30 Days");
  const factor = rangeMultiplier[range];

  const totals = useMemo(() => {
    const total = Math.round(214800 * factor);
    const success = Math.round(total * 0.968);
    return { total, success, failed: total - success, avgLatency: 182 };
  }, [factor]);

  return (
    <div>
      <PageHeader
        title="Usage Analytics"
        subtitle="Request volume, reliability and performance across your API traffic."
        actions={
          <Select value={range} onValueChange={(value) => setRange(value as typeof range)}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              {ranges.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard icon={Activity} value={totals.total.toLocaleString()} label="Total requests" tone="blue" />
        <MetricCard icon={CheckCircle2} value={totals.success.toLocaleString()} label="Successful requests" tone="emerald" />
        <MetricCard icon={XCircle} value={totals.failed.toLocaleString()} label="Failed requests" tone="cyan" />
        <MetricCard icon={Timer} value={`${totals.avgLatency}ms`} label="Avg. response time" tone="ink" />
      </div>

      <div className="mt-8 dashboard-activity">
        <UsageBarChart values={dailyRequests.map((v) => Math.round(v * factor))} caption={`Requests over time — ${range.toLowerCase()}`} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="dashboard-activity">
          <span className="font-display text-sm font-semibold">Most used APIs</span>
          <div className="mt-4 grid gap-3">
            {topApis.map((api) => (
              <div key={api.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground">{api.name}</span>
                  <span className="font-mono text-muted-foreground">{api.share}%</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-emerald-bright" style={{ width: `${api.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-activity">
          <span className="font-display text-sm font-semibold">Error distribution</span>
          <div className="mt-4 grid gap-3">
            {errorBreakdown.map((error) => (
              <div key={error.code}>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground">{error.code}</span>
                  <span className="font-mono text-muted-foreground">{error.share}%</span>
                </div>
                <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                  <div className="h-full rounded-full" style={{ width: `${error.share}%`, background: "var(--error)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
