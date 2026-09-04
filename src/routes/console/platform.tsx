import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, Gauge, Server, Zap } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiLogsTable } from "@/components/console/api-logs-table";
import { RequestsAreaChart } from "@/components/console/charts/requests-area-chart";
import { KpiCard } from "@/components/console/kpi-card";
import { kpiColors } from "@/components/console/palette";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";
import { WebhooksPanel } from "@/components/console/webhooks-panel";

export const Route = createFileRoute("/console/platform")({
  head: () => ({ meta: [{ title: "API Management — DOVIXORA Console" }] }),
  component: PlatformPage,
});

const requestVolume = [
  { label: "10:00", requests: 4200 },
  { label: "10:05", requests: 4600 },
  { label: "10:10", requests: 4100 },
  { label: "10:15", requests: 5300 },
  { label: "10:20", requests: 4900 },
  { label: "10:25", requests: 5600 },
  { label: "10:30", requests: 6100 },
];

const errorLog = [
  { time: "2 min ago", org: "Solstice Labs", api: "Aadhaar Verification", error: "Invalid Aadhaar Number", code: 422 },
  { time: "8 min ago", org: "Kite Markets", api: "PAN Verification", error: "PAN format is invalid", code: 422 },
  { time: "12 min ago", org: "Meridian Pay", api: "KYC Verification", error: "Document upload failed", code: 500 },
  { time: "18 min ago", org: "Nimbus Fintech", api: "UAN Verification", error: "UAN not found", code: 404 },
  { time: "41 min ago", org: "Vantage Corp", api: "Aadhaar Verification", error: "Rate limit exceeded", code: 429 },
];

const services = [
  { name: "API Gateway", status: "Operational" },
  { name: "Database", status: "Operational" },
  { name: "Verification Services", status: "Operational" },
  { name: "Payment System", status: "Operational" },
  { name: "Email Service", status: "Operational" },
  { name: "Webhook Delivery", status: "Degraded" },
];

const incidents = [
  { title: "Elevated webhook delivery latency", status: "Investigating", time: "18 min ago" },
  { title: "EPFO provider timeout spike (resolved)", status: "Resolved", time: "Yesterday" },
];

function PlatformPage() {
  const [serviceStatus, setServiceStatus] = useState(services);

  const toggleDegrade = (name: string) => {
    setServiceStatus((prev) =>
      prev.map((s) => (s.name === name ? { ...s, status: s.status === "Operational" ? "Degraded" : "Operational" } : s)),
    );
    toast.success("Service status updated — this also updates the public status page");
  };

  return (
    <div>
      <PageHeader title="API Management" subtitle="Monitor traffic, inspect logs and manage platform incidents." />

      <Tabs defaultValue="monitoring" className="mt-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="logs">API Logs</TabsTrigger>
          <TabsTrigger value="errors">API Errors</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="status">System Status</TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="mt-4">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <KpiCard icon={Zap} label="Requests / sec" value="86" color={kpiColors.blue} />
            <KpiCard icon={Gauge} label="Avg. Latency" value="182ms" color={kpiColors.teal} />
            <KpiCard icon={Activity} label="Error Rate" value="0.03%" color={kpiColors.amber} />
            <KpiCard icon={Server} label="Uptime (30d)" value="99.99%" color={kpiColors.emerald} />
          </div>
          <div className="mt-6 rounded-2xl border border-line bg-panel p-5">
            <span className="font-display text-sm font-semibold text-foreground">Live request volume</span>
            <RequestsAreaChart data={requestVolume} color={kpiColors.blue} />
          </div>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <ApiLogsTable scope="platform" />
        </TabsContent>

        <TabsContent value="errors" className="mt-4">
          <div className="rounded-2xl border border-line bg-panel/40 p-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>API</TableHead>
                  <TableHead>Error</TableHead>
                  <TableHead className="text-right">Code</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {errorLog.map((error, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-muted-foreground">{error.time}</TableCell>
                    <TableCell className="text-foreground">{error.org}</TableCell>
                    <TableCell className="text-muted-foreground">{error.api}</TableCell>
                    <TableCell className="text-muted-foreground">{error.error}</TableCell>
                    <TableCell className="text-right"><StatusBadge status={String(error.code)} tone="critical" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="mt-4">
          <WebhooksPanel />
        </TabsContent>

        <TabsContent value="status" className="mt-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-panel p-5">
              <span className="font-display text-sm font-semibold text-foreground">Services</span>
              <div className="mt-4 grid gap-3">
                {serviceStatus.map((service) => (
                  <div key={service.name} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{service.name}</span>
                    <button type="button" onClick={() => toggleDegrade(service.name)}>
                      <StatusBadge status={service.status} tone={service.status === "Operational" ? "good" : "warn"} />
                    </button>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">Click a status badge to simulate an incident on the public status page.</p>
            </div>

            <div className="rounded-2xl border border-line bg-panel p-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-foreground">Incident history</span>
                <Button size="sm" onClick={() => toast.success("Incident published to the public status page")}>Publish Incident</Button>
              </div>
              <div className="mt-4 grid gap-3">
                {incidents.map((incident, index) => (
                  <div key={index} className="rounded-xl border border-line p-3">
                    <p className="text-sm text-foreground">{incident.title}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <StatusBadge status={incident.status} tone={incident.status === "Resolved" ? "good" : "warn"} />
                      <span className="text-xs text-muted-foreground">{incident.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
