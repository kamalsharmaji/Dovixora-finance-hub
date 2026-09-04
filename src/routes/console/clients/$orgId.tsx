import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/products/metric-card";
import { PageHeader } from "@/components/console/page-header";
import { findOrganization } from "@/components/console/org-data";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/clients/$orgId")({
  loader: ({ params }) => {
    const org = findOrganization(params.orgId);
    if (!org) throw notFound();
    return org;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? "Organization"} — DOVIXORA Console` }] }),
  component: OrganizationDetailPage,
});

function OrganizationDetailPage() {
  const org = Route.useLoaderData();
  const usagePercent = Math.round((org.apiUsageThisMonth / org.apiUsageLimit) * 100);

  return (
    <div>
      <Link to="/console/clients" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Organizations
      </Link>

      <div className="mt-4">
        <PageHeader
          title={org.name}
          subtitle={`Owned by ${org.owner} · ${org.plan} plan · Joined ${org.createdDate}`}
          actions={<StatusBadge status={org.status} />}
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Plan" value={org.plan} tone="blue" />
        <MetricCard label="Team members" value={String(org.users)} tone="cyan" />
        <MetricCard
          label="API usage this month"
          value={`${usagePercent}%`}
          hint={`${org.apiUsageThisMonth.toLocaleString()} / ${org.apiUsageLimit.toLocaleString()}`}
          tone={usagePercent > 90 ? "cyan" : "emerald"}
        />
        <MetricCard label="Status" value={org.status} tone="ink" />
      </div>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="usage">API Usage</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="dashboard-activity">
            <span className="font-display text-sm font-semibold">Summary</span>
            <p className="mt-2 text-sm text-muted-foreground">
              {org.name} is on the {org.plan} plan with {org.users} team member{org.users === 1 ? "" : "s"}, currently at{" "}
              {usagePercent}% of its monthly API allowance.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="users" className="mt-4">
          <div className="dashboard-activity text-sm text-muted-foreground">
            User list for {org.name} — reuses the platform Users table, scoped to this organization.
          </div>
        </TabsContent>
        <TabsContent value="services" className="mt-4">
          <div className="dashboard-activity text-sm text-muted-foreground">
            Verification products enabled for {org.name}: Aadhaar, PAN, Full KYC, DigiLocker.
          </div>
        </TabsContent>
        <TabsContent value="usage" className="mt-4">
          <div className="dashboard-activity text-sm text-muted-foreground">
            Detailed request/latency/error charts for {org.name} — same layout as the platform Analytics page.
          </div>
        </TabsContent>
        <TabsContent value="keys" className="mt-4">
          <div className="dashboard-activity text-sm text-muted-foreground">Live and sandbox API keys issued to {org.name}.</div>
        </TabsContent>
        <TabsContent value="billing" className="mt-4">
          <div className="dashboard-activity text-sm text-muted-foreground">
            {org.plan} plan · invoices and payment history for {org.name}.
          </div>
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <div className="dashboard-activity text-sm text-muted-foreground">Audit trail of sensitive actions taken on {org.name}'s account.</div>
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <div className="dashboard-activity text-sm text-muted-foreground">Organization profile, security policy and API version pin.</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
