import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Can, PermissionDenied, useCan } from "@/components/console/permission-gate";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";
import { useConsoleSession } from "@/components/console/session-context";

export const Route = createFileRoute("/console/billing")({
  head: () => ({ meta: [{ title: "Billing — DOVIXORA Console" }] }),
  component: BillingPage,
});

const invoices = [
  { date: "Aug 18, 2026", amount: "₹2,999", status: "Paid", invoice: "INV-2026-08" },
  { date: "Jul 18, 2026", amount: "₹2,999", status: "Paid", invoice: "INV-2026-07" },
  { date: "Jun 18, 2026", amount: "₹2,999", status: "Paid", invoice: "INV-2026-06" },
  { date: "May 18, 2026", amount: "₹2,999", status: "Failed", invoice: "INV-2026-05" },
] as const;

function BillingPage() {
  const { session } = useConsoleSession();
  const canView = useCan("billing.view");
  const used = 38240;
  const limit = 50000;
  const percent = Math.round((used / limit) * 100);

  if (!canView) return <PermissionDenied requiredPermission="billing.view" />;

  return (
    <div>
      <PageHeader title="Billing & Subscription" subtitle={`Manage ${session.orgName}'s plan, usage and payment history.`} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl border border-line bg-panel/50 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">Current plan</span>
              <h2 className="mt-1 font-display text-2xl font-bold text-emerald-bright">Growth</h2>
              <p className="mt-1 text-sm text-muted-foreground">₹2,999 / month · Next billing date Sep 18, 2026</p>
            </div>
            <Can permission="billing.manage">
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => toast("Plan comparison isn't wired to a backend yet.")}>Upgrade Plan</Button>
                <Button variant="outline" onClick={() => toast("Plan change flow isn't wired to a backend yet.")}>Change Plan</Button>
              </div>
            </Can>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">API requests used</span>
              <span className="font-mono text-foreground">{used.toLocaleString()} / {limit.toLocaleString()}</span>
            </div>
            <Progress value={percent} className="mt-2" />
          </div>

          <Can permission="billing.manage">
            <button
              type="button"
              onClick={() => toast("Cancellation isn't wired to a backend yet.")}
              className="mt-6 text-sm font-medium text-error hover:underline"
            >
              Cancel subscription
            </button>
          </Can>
        </div>

        <div className="rounded-2xl border border-line bg-panel/50 p-6">
          <span className="font-display text-sm font-semibold">Payment method</span>
          <div className="mt-3 flex items-center justify-between rounded-xl border border-line bg-background p-4">
            <div>
              <p className="font-medium text-foreground">Visa •••• 4242</p>
              <p className="text-xs text-muted-foreground">Expires 09/28</p>
            </div>
            <Can permission="billing.manage">
              <Button variant="outline" size="sm" onClick={() => toast("Payment method update isn't wired to a backend yet.")}>
                Update
              </Button>
            </Can>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <span className="font-display text-sm font-semibold">Payment history</span>
        <div className="mt-3 rounded-2xl border border-line bg-panel/40 p-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((row) => (
                <TableRow key={row.invoice}>
                  <TableCell className="text-muted-foreground">{row.date}</TableCell>
                  <TableCell className="font-mono text-foreground">{row.amount}</TableCell>
                  <TableCell><StatusBadge status={row.status} /></TableCell>
                  <TableCell>
                    <button type="button" onClick={() => toast(`Downloading ${row.invoice}…`)} className="font-mono text-xs text-emerald-bright hover:underline">
                      {row.invoice}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
