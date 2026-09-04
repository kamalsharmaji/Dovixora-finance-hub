import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, FileText, TrendingUp, Wallet } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KpiCard } from "@/components/console/kpi-card";
import { kpiColors } from "@/components/console/palette";
import { organizations } from "@/components/console/org-data";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";
import { RequestsAreaChart } from "@/components/console/charts/requests-area-chart";

export const Route = createFileRoute("/console/finance")({
  head: () => ({ meta: [{ title: "Financial — DOVIXORA Console" }] }),
  component: FinancePage,
});

const revenueByMonth = [
  { label: "Apr", requests: 176 },
  { label: "May", requests: 194 },
  { label: "Jun", requests: 208 },
  { label: "Jul", requests: 221 },
  { label: "Aug", requests: 248 },
];

const planCatalog = [
  { plan: "Starter", price: "Free", orgs: 42, credits: "500 / mo" },
  { plan: "Growth", price: "₹2,999 / mo", orgs: 86, credits: "50,000 / mo" },
  { plan: "Scale", price: "₹9,999 / mo", orgs: 38, credits: "Unlimited" },
  { plan: "Enterprise", price: "Custom", orgs: 16, credits: "Custom" },
];

const invoices = [
  { org: "Harbor Fintech", amount: "₹4,20,000", status: "Paid", date: "Aug 28, 2026", invoice: "INV-HF-0892" },
  { org: "Kite Markets", amount: "₹9,999", status: "Paid", date: "Aug 24, 2026", invoice: "INV-KM-1043" },
  { org: "Atlas Studio", amount: "₹2,999", status: "Paid", date: "Aug 18, 2026", invoice: "INV-AS-0721" },
  { org: "Solstice Labs", amount: "₹0", status: "Failed", date: "Aug 09, 2026", invoice: "INV-SL-0338" },
];

const payments = [
  { org: "Harbor Fintech", amount: "₹4,20,000", method: "Bank Transfer", status: "Success", time: "4 days ago" },
  { org: "Kite Markets", amount: "₹9,999", method: "Visa •••• 4242", status: "Success", time: "9 days ago" },
  { org: "Atlas Studio", amount: "₹2,999", method: "Visa •••• 4242", status: "Success", time: "2 weeks ago" },
  { org: "Solstice Labs", amount: "₹0", method: "Mastercard •••• 9021", status: "Failed", time: "3 weeks ago" },
];

function FinancePage() {
  return (
    <div>
      <PageHeader title="Financial" subtitle="Subscriptions, billing, payments and revenue across the platform." />

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KpiCard icon={TrendingUp} label="Monthly Revenue" value="₹2.48 Cr" color={kpiColors.emerald} trend={{ value: "26.8%", direction: "up" }} />
        <KpiCard icon={Wallet} label="Active Subscriptions" value="182" color={kpiColors.blue} trend={{ value: "9.1%", direction: "up" }} />
        <KpiCard icon={CreditCard} label="Failed Payments" value="3" color={kpiColors.rose} trend={{ value: "1.2%", direction: "down" }} />
        <KpiCard icon={FileText} label="Outstanding Invoices" value="₹42,000" color={kpiColors.amber} />
      </div>

      <Tabs defaultValue="subscriptions" className="mt-8">
        <TabsList className="flex-wrap">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="mt-4">
          <div className="rounded-2xl border border-line bg-panel/40 p-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Organizations</TableHead>
                  <TableHead>Included Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {planCatalog.map((row) => (
                  <TableRow key={row.plan}>
                    <TableCell className="font-medium text-foreground">{row.plan}</TableCell>
                    <TableCell className="text-muted-foreground">{row.price}</TableCell>
                    <TableCell className="text-muted-foreground">{row.orgs}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{row.credits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="mt-4">
          <div className="rounded-2xl border border-line bg-panel p-5">
            <span className="font-display text-sm font-semibold text-foreground">Revenue growth</span>
            <RequestsAreaChart data={revenueByMonth} color={kpiColors.emerald} />
          </div>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <div className="rounded-2xl border border-line bg-panel/40 p-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-foreground">{row.org}</TableCell>
                    <TableCell className="font-mono text-foreground">{row.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{row.method}</TableCell>
                    <TableCell><StatusBadge status={row.status} /></TableCell>
                    <TableCell className="text-muted-foreground">{row.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="mt-4">
          <div className="rounded-2xl border border-line bg-panel/40 p-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((row) => (
                  <TableRow key={row.invoice}>
                    <TableCell className="font-mono text-xs text-emerald-bright">{row.invoice}</TableCell>
                    <TableCell className="font-medium text-foreground">{row.org}</TableCell>
                    <TableCell className="font-mono text-foreground">{row.amount}</TableCell>
                    <TableCell><StatusBadge status={row.status} /></TableCell>
                    <TableCell className="text-muted-foreground">{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <span className="font-display text-sm font-semibold text-foreground">Organizations by usage</span>
        <div className="mt-3 rounded-2xl border border-line bg-panel/40 p-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>API Usage</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium text-foreground">{org.name}</TableCell>
                  <TableCell className="text-muted-foreground">{org.plan}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {org.apiUsageThisMonth.toLocaleString()} / {org.apiUsageLimit.toLocaleString()}
                  </TableCell>
                  <TableCell><StatusBadge status={org.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
