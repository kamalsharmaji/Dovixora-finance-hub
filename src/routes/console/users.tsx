import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MoreHorizontal, Search, UserPlus, Users as UsersIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Can, PermissionDenied, useCan } from "@/components/console/permission-gate";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/users")({
  head: () => ({ meta: [{ title: "Users — DOVIXORA Console" }] }),
  component: UsersPage,
});

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
  createdDate: string;
}

const seedUsers: PlatformUser[] = [
  { id: "u1", name: "Meera Iyer", email: "meera@atlasstudio.io", role: "Organization Owner", organization: "Atlas Studio", status: "Active", lastActive: "12 min ago", createdDate: "Jan 14, 2026" },
  { id: "u2", name: "Rohit Sen", email: "rohit@atlasstudio.io", role: "Team Member", organization: "Atlas Studio", status: "Active", lastActive: "2 hrs ago", createdDate: "Feb 02, 2026" },
  { id: "u3", name: "Karan Bhatt", email: "karan@dovix.ai", role: "Admin", organization: "Dovix AI", status: "Active", lastActive: "8 min ago", createdDate: "Nov 03, 2025" },
  { id: "u4", name: "Divya Nair", email: "divya@kitemarkets.com", role: "Organization Owner", organization: "Kite Markets", status: "Active", lastActive: "1 day ago", createdDate: "Mar 21, 2026" },
  { id: "u5", name: "Arjun Mehta", email: "arjun@meridianpay.com", role: "Team Member", organization: "Meridian Pay", status: "Invited", lastActive: "—", createdDate: "Aug 30, 2026" },
  { id: "u6", name: "Sara Kim", email: "sara@solsticelabs.io", role: "Organization Owner", organization: "Solstice Labs", status: "Suspended", lastActive: "14 days ago", createdDate: "May 09, 2026" },
];

const roleOptions = ["All Roles", "Super Admin", "Admin", "Organization Owner", "Team Member"] as const;
const statusOptions = ["All Statuses", "Active", "Invited", "Suspended"] as const;

function UsersPage() {
  const canView = useCan("users.view");
  const [users, setUsers] = useState(seedUsers);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<(typeof roleOptions)[number]>("All Roles");
  const [status, setStatus] = useState<(typeof statusOptions)[number]>("All Statuses");

  const filtered = useMemo(() => {
    return users.filter((user) => {
      if (role !== "All Roles" && user.role !== role) return false;
      if (status !== "All Statuses" && user.status !== status) return false;
      if (query.trim()) {
        const haystack = `${user.name} ${user.email} ${user.organization}`.toLowerCase();
        if (!haystack.includes(query.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [users, role, status, query]);

  if (!canView) return <PermissionDenied requiredPermission="users.view" />;

  const setUserStatus = (id: string, next: PlatformUser["status"]) => {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, status: next } : user)));
    toast.success(next === "Suspended" ? "User suspended" : "User reactivated");
  };

  const removeUser = (id: string, name: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    toast.success(`${name} was removed`);
  };

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle="Manage users and access across your organization."
        actions={
          <Can permission="users.create">
            <Button onClick={() => toast("Invite flow isn't wired to a backend yet.")}>
              <UserPlus className="size-4" /> Invite User
            </Button>
          </Can>
        }
      />

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-panel/40 p-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search users…"
            className="pl-9"
          />
        </div>
        <Select value={role} onValueChange={(value) => setRole(value as typeof role)}>
          <SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            {roleOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={(value) => setStatus(value as typeof status)}>
          <SelectTrigger className="sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-panel/40 p-1">
        {filtered.length === 0 ? (
          <EmptyState icon={UsersIcon} title="No users found" description="Try a different search term or filter." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-muted font-mono text-[10px] font-semibold text-foreground">
                        {user.name.split(" ").map((p) => p[0]).join("")}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">{user.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.role}</TableCell>
                  <TableCell className="text-muted-foreground">{user.organization}</TableCell>
                  <TableCell><StatusBadge status={user.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                  <TableCell className="text-muted-foreground">{user.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="icon-button ml-auto">
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast(`Viewing ${user.name}`)}>View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast(`Editing ${user.name}`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast(`Change role for ${user.name}`)}>Change Role</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "Suspended" ? (
                          <DropdownMenuItem onClick={() => setUserStatus(user.id, "Active")}>Reactivate</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => setUserStatus(user.id, "Suspended")}>Suspend</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-error focus:text-error" onClick={() => removeUser(user.id, user.name)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
