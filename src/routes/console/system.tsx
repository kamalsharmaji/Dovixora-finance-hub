import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Plug } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/console/page-header";
import { PermissionDenied } from "@/components/console/permission-gate";
import { useConsoleSession } from "@/components/console/session-context";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/system")({
  head: () => ({ meta: [{ title: "System — DOVIXORA Console" }] }),
  component: SystemPage,
});

const featureFlags = [
  { name: "New sandbox console", description: "Roll out the redesigned sandbox to a subset of orgs.", enabled: true },
  { name: "Instant PAN lite check", description: "Sub-second PAN verification for Growth+ plans.", enabled: true },
  { name: "Multi-currency billing", description: "Bill international orgs in local currency.", enabled: false },
  { name: "AI-assisted review queue", description: "Suggest a decision for manual KYC reviews.", enabled: false },
];

const emailTemplates = [
  { name: "Welcome email", updated: "Aug 12, 2026" },
  { name: "Team invitation", updated: "Jul 30, 2026" },
  { name: "Payment receipt", updated: "Jul 02, 2026" },
  { name: "Payment failed", updated: "Jul 02, 2026" },
  { name: "Usage limit warning", updated: "Jun 18, 2026" },
];

const integrations = [
  { name: "Slack", description: "Post platform alerts to a Slack channel.", connected: true },
  { name: "PagerDuty", description: "Page on-call when SLA breaches occur.", connected: true },
  { name: "Zapier", description: "Trigger workflows from DOVIXORA events.", connected: false },
  { name: "Segment", description: "Forward product analytics events.", connected: false },
];

function SystemPage() {
  const { session } = useConsoleSession();
  const [flags, setFlags] = useState(featureFlags);

  if (session.role !== "super_admin") {
    return <PermissionDenied />;
  }

  const toggleFlag = (name: string) => {
    setFlags((prev) => prev.map((f) => (f.name === name ? { ...f, enabled: !f.enabled } : f)));
    toast.success("Feature flag updated");
  };

  return (
    <div>
      <PageHeader title="System" subtitle="Platform-wide configuration, feature rollout, and integrations." />

      <Tabs defaultValue="settings" className="mt-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          <TabsTrigger value="flags">Feature Flags</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
          <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="mt-4">
          <div className="max-w-lg rounded-2xl border border-line bg-panel p-5">
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="platform-name">Platform name</Label>
                <Input id="platform-name" defaultValue="DOVIXORA" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="support-email">Support email</Label>
                <Input id="support-email" defaultValue="info@dovix.ai" />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="api-version">Default API version</Label>
                <Input id="api-version" defaultValue="2026-01-01" />
              </div>
              <Button type="button" className="w-fit" onClick={() => toast.success("Platform settings saved")}>Save changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="flags" className="mt-4">
          <div className="grid gap-3">
            {flags.map((flag) => (
              <div key={flag.name} className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-panel p-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{flag.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{flag.description}</p>
                </div>
                <Switch checked={flag.enabled} onCheckedChange={() => toggleFlag(flag.name)} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          <div className="rounded-2xl border border-line bg-panel/40 p-1">
            {emailTemplates.map((template) => (
              <div key={template.name} className="flex items-center gap-3 border-b border-line p-4 last:border-0">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                  <Mail className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{template.name}</p>
                  <p className="text-xs text-muted-foreground">Updated {template.updated}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => toast("Template editor isn't wired to a backend yet.")}>Edit</Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <div className="max-w-lg grid gap-3">
            {["New organization sign-up", "Payment failed", "Usage limit reached", "Suspicious activity detected"].map((event) => (
              <div key={event} className="flex items-center justify-between rounded-2xl border border-line bg-panel p-4">
                <span className="text-sm text-foreground">{event}</span>
                <Switch defaultChecked onCheckedChange={() => toast.success("Notification setting updated")} />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {integrations.map((integration) => (
              <div key={integration.name} className="rounded-2xl border border-line bg-panel p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                    <Plug className="size-4" />
                  </span>
                  <StatusBadge status={integration.connected ? "Connected" : "Not connected"} tone={integration.connected ? "good" : "neutral"} />
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">{integration.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{integration.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
