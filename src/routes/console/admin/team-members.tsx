import { createFileRoute } from "@tanstack/react-router";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/admin/team-members")({
  head: () => ({ meta: [{ title: "Team Members — DOVIXORA Console" }] }),
  component: AdminTeamMembersPage,
});

const members = [
  { name: "Meera Iyer", email: "meera@atlasstudio.io", role: "Owner", org: "Atlas Studio", status: "Active" },
  { name: "Rohit Sen", email: "rohit@atlasstudio.io", role: "Developer", org: "Atlas Studio", status: "Active" },
  { name: "Divya Nair", email: "divya@kitemarkets.com", role: "Owner", org: "Kite Markets", status: "Active" },
  { name: "Arjun Mehta", email: "arjun@meridianpay.com", role: "Member", org: "Meridian Pay", status: "Invited" },
  { name: "Sara Kim", email: "sara@solsticelabs.io", role: "Owner", org: "Solstice Labs", status: "Active" },
];

function AdminTeamMembersPage() {
  return (
    <div>
      <PageHeader title="Team Members" subtitle="Every team member across your assigned organizations." />
      <div className="mt-6 rounded-2xl border border-line bg-panel/40 p-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.email}>
                <TableCell>
                  <p className="font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </TableCell>
                <TableCell className="text-muted-foreground">{member.role}</TableCell>
                <TableCell className="text-muted-foreground">{member.org}</TableCell>
                <TableCell><StatusBadge status={member.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
