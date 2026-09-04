import { createFileRoute } from "@tanstack/react-router";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/admin/api-keys")({
  head: () => ({ meta: [{ title: "API Keys — DOVIXORA Console" }] }),
  component: AdminApiKeysPage,
});

const keys = [
  { org: "Nova Health", key: "sk_live_••••2a41", environment: "Live", created: "Jan 22, 2026", lastUsed: "6 min ago", status: "Active" },
  { org: "Kite Markets", key: "sk_live_••••7be0", environment: "Live", created: "Feb 09, 2026", lastUsed: "22 min ago", status: "Active" },
  { org: "Meridian Pay", key: "sk_test_••••c412", environment: "Sandbox", created: "Aug 25, 2026", lastUsed: "Never", status: "Active" },
  { org: "Solstice Labs", key: "sk_live_••••90bd", environment: "Live", created: "May 09, 2026", lastUsed: "14 days ago", status: "Revoked" },
];

function AdminApiKeysPage() {
  return (
    <div>
      <PageHeader title="API Keys" subtitle="Read-only view of keys across your assigned organizations." />
      <div className="mt-6 rounded-2xl border border-line bg-panel/40 p-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((row) => (
              <TableRow key={row.key}>
                <TableCell className="font-medium text-foreground">{row.org}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{row.key}</TableCell>
                <TableCell><StatusBadge status={row.environment} tone={row.environment === "Live" ? "good" : "neutral"} /></TableCell>
                <TableCell className="text-muted-foreground">{row.created}</TableCell>
                <TableCell className="text-muted-foreground">{row.lastUsed}</TableCell>
                <TableCell><StatusBadge status={row.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
