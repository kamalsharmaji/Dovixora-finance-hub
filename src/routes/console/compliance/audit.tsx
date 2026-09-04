import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/compliance/audit")({
  head: () => ({ meta: [{ title: "Audit & Access — DOVIXORA Console" }] }),
  component: AuditPage,
});

const auditTrail = [
  { time: "2 min ago", actor: "Ananya Rao", action: "Suspended organization 'Solstice Labs'" },
  { time: "18 min ago", actor: "Karan Bhatt", action: "Resolved KYC review for 'Nova Health'" },
  { time: "1 hr ago", actor: "Ananya Rao", action: "Created Admin seat for 'Priya Sharma'" },
  { time: "3 hrs ago", actor: "System", action: "Auto-suspended 'Vantage Corp' — payment failed 3x" },
];

const accessLogs = [
  { time: "Sep 2, 2026 · 09:14", user: "ananya@dovix.ai", ip: "103.21.244.10", action: "Login", status: "Success" },
  { time: "Sep 2, 2026 · 09:02", user: "karan@dovix.ai", ip: "182.75.10.4", action: "Login", status: "Success" },
  { time: "Sep 1, 2026 · 23:47", user: "unknown@—", ip: "91.208.132.9", action: "Login", status: "Blocked" },
];

const apiKeyMonitoring = [
  { key: "sk_live_••••8f21", org: "Atlas Studio", volume: "12,400 calls / 24h", flagged: false },
  { key: "sk_live_••••3ac9", org: "Kite Markets", volume: "58,120 calls / 24h", flagged: false },
  { key: "sk_live_••••90bd", org: "Vantage Corp", volume: "1,240,000 calls / 24h", flagged: true },
];

const suspiciousActivity = [
  { org: "Vantage Corp", signal: "1240x normal request volume in the last hour", severity: "Critical" },
  { org: "Unknown", signal: "12 failed login attempts from a single IP", severity: "Warning" },
  { org: "Solstice Labs", signal: "API key used from an unrecognized country", severity: "Warning" },
];

function AuditPage() {
  return (
    <div>
      <PageHeader title="Audit & Access" subtitle="Sensitive platform actions, login access, and anomaly detection." />

      <Tabs defaultValue="audit" className="mt-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="access">Access Logs</TabsTrigger>
          <TabsTrigger value="keys">API Key Monitoring</TabsTrigger>
          <TabsTrigger value="suspicious">Suspicious Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="audit" className="mt-4">
          <div className="rounded-2xl border border-line bg-panel/40 p-1">
            {auditTrail.map((entry, index) => (
              <div key={index} className="flex items-start gap-3 border-b border-line p-4 last:border-0">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-bright" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">{entry.action}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{entry.actor} · {entry.time}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="access" className="mt-4">
          <div className="rounded-2xl border border-line bg-panel/40 p-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessLogs.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-muted-foreground">{row.time}</TableCell>
                    <TableCell className="text-foreground">{row.user}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{row.ip}</TableCell>
                    <TableCell className="text-muted-foreground">{row.action}</TableCell>
                    <TableCell><StatusBadge status={row.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="keys" className="mt-4">
          <div className="rounded-2xl border border-line bg-panel/40 p-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeyMonitoring.map((row) => (
                  <TableRow key={row.key}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{row.key}</TableCell>
                    <TableCell className="text-foreground">{row.org}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{row.volume}</TableCell>
                    <TableCell><StatusBadge status={row.flagged ? "Flagged" : "Normal"} tone={row.flagged ? "critical" : "good"} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="suspicious" className="mt-4">
          <div className="grid gap-3">
            {suspiciousActivity.map((entry, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-2xl border p-4"
                style={{
                  borderColor: entry.severity === "Critical" ? "color-mix(in oklab, var(--error) 30%, var(--line))" : "color-mix(in oklab, var(--warning) 30%, var(--line))",
                  background: entry.severity === "Critical" ? "color-mix(in oklab, var(--error) 5%, transparent)" : "color-mix(in oklab, var(--warning) 5%, transparent)",
                }}
              >
                <AlertTriangle className="mt-0.5 size-4 shrink-0" style={{ color: entry.severity === "Critical" ? "var(--error)" : "var(--warning)" }} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{entry.org}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{entry.signal}</p>
                </div>
                <StatusBadge status={entry.severity} tone={entry.severity === "Critical" ? "critical" : "warn"} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
