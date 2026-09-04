import { createFileRoute } from "@tanstack/react-router";

import { AdminDashboard } from "@/components/console/dashboards/admin-dashboard";
import { BusinessDashboard } from "@/components/console/dashboards/business-dashboard";
import { MemberDashboard } from "@/components/console/dashboards/member-dashboard";
import { SuperAdminDashboard } from "@/components/console/dashboards/super-admin-dashboard";
import { useConsoleSession } from "@/components/console/session-context";

export const Route = createFileRoute("/console/")({
  head: () => ({ meta: [{ title: "Console — DOVIXORA" }] }),
  component: ConsoleOverview,
});

function ConsoleOverview() {
  const { session } = useConsoleSession();

  switch (session.role) {
    case "super_admin":
      return <SuperAdminDashboard />;
    case "admin":
      return <AdminDashboard />;
    case "business_owner":
      return <BusinessDashboard />;
    case "team_member":
      return <MemberDashboard />;
  }
}
