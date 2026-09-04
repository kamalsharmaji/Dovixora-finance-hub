import { createFileRoute } from "@tanstack/react-router";

import { ApiLogsTable } from "@/components/console/api-logs-table";
import { PageHeader } from "@/components/console/page-header";

export const Route = createFileRoute("/console/developer/logs")({
  head: () => ({ meta: [{ title: "API Logs — DOVIXORA Console" }] }),
  component: DeveloperLogsPage,
});

function DeveloperLogsPage() {
  return (
    <div>
      <PageHeader title="API Logs" subtitle="Every request your organization has made, most recent first." />
      <div className="mt-6">
        <ApiLogsTable scope="organization" />
      </div>
    </div>
  );
}
