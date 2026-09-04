import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, UserPlus, Users as UsersIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Can } from "@/components/console/permission-gate";
import { PageHeader } from "@/components/console/page-header";
import { useConsoleSession } from "@/components/console/session-context";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/team")({
  head: () => ({ meta: [{ title: "Team Members — DOVIXORA Console" }] }),
  component: TeamPage,
});

type TeamRole = "Owner" | "Admin" | "Developer" | "Member" | "Viewer";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  permissions: string[];
  lastActive: string;
  status: "Active" | "Invited";
}

const permissionOptions = ["Run verifications", "Manage API keys", "View billing", "Invite teammates"];

function seedTeam(orgName: string): TeamMember[] {
  return [
    { id: "t1", name: "Meera Iyer", email: `meera@${orgName}`, role: "Owner", permissions: permissionOptions, lastActive: "12 min ago", status: "Active" },
    { id: "t2", name: "Rohit Sen", email: `rohit@${orgName}`, role: "Developer", permissions: ["Run verifications", "Manage API keys"], lastActive: "2 hrs ago", status: "Active" },
    { id: "t3", name: "Ishaan Kapoor", email: `ishaan@${orgName}`, role: "Member", permissions: ["Run verifications"], lastActive: "1 day ago", status: "Active" },
    { id: "t4", name: "Priya Das", email: `priya@${orgName}`, role: "Viewer", permissions: [], lastActive: "—", status: "Invited" },
  ];
}

function TeamPage() {
  const { session } = useConsoleSession();
  const domain = session.orgName.toLowerCase().replace(/[^a-z0-9]/g, "") + ".io";
  const [team, setTeam] = useState<TeamMember[]>(() => seedTeam(domain));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "Member" as TeamRole, permissions: [] as string[] });

  const togglePermission = (permission: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  const handleInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setTeam((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: form.name.trim(), email: form.email.trim(), role: form.role, permissions: form.permissions, lastActive: "—", status: "Invited" },
    ]);
    toast.success(`Invitation sent to ${form.email.trim()}`);
    setForm({ name: "", email: "", role: "Member", permissions: [] });
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Team Members"
        subtitle="Manage your organization team and permissions."
        actions={
          <Can permission="team.invite">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="size-4" /> Invite Team Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite a team member</DialogTitle>
                  <DialogDescription>They'll get an email invite to join {session.orgName}.</DialogDescription>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={handleInvite}>
                  <div className="grid gap-1.5">
                    <Label htmlFor="invite-name">Name</Label>
                    <Input
                      id="invite-name"
                      value={form.name}
                      onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                      placeholder="Jordan Lee"
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="invite-email">Email</Label>
                    <Input
                      id="invite-email"
                      type="email"
                      value={form.email}
                      onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                      placeholder="jordan@company.com"
                      required
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="invite-role">Role</Label>
                    <Select value={form.role} onValueChange={(value) => setForm((prev) => ({ ...prev, role: value as TeamRole }))}>
                      <SelectTrigger id="invite-role"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {(["Admin", "Developer", "Member", "Viewer"] as const).map((role) => (
                          <SelectItem key={role} value={role}>{role}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Permissions</Label>
                    {permissionOptions.map((permission) => (
                      <label key={permission} className="flex items-center gap-2.5 text-sm text-foreground">
                        <Checkbox
                          checked={form.permissions.includes(permission)}
                          onCheckedChange={() => togglePermission(permission)}
                        />
                        {permission}
                      </label>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button type="submit">Send Invitation</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </Can>
        }
      />

      {team.length === 0 ? (
        <div className="mt-6">
          <EmptyState icon={UsersIcon} title="No team members yet" description="Invite your first teammate to get started." />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.id} className="security-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-muted font-mono text-xs font-semibold text-foreground">
                    {member.name.split(" ").map((p) => p[0]).join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-bold text-foreground">{member.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <StatusBadge status={member.role} tone={member.role === "Owner" ? "good" : "neutral"} />
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {member.permissions.length > 0 ? (
                  member.permissions.map((permission) => (
                    <span key={permission} className="rounded-full border border-line px-2 py-0.5 text-[11px] text-muted-foreground">
                      {permission}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-muted-foreground">No permissions granted yet</span>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="size-3.5" /> {member.lastActive}</span>
                <StatusBadge status={member.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
