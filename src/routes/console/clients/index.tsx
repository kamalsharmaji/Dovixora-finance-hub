import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, MoreHorizontal, Search } from "lucide-react";
import { toast } from "sonner";

import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PageHeader } from "@/components/console/page-header";
import { organizations } from "@/components/console/org-data";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/clients/")({
  head: () => ({ meta: [{ title: "Organizations — DOVIXORA Console" }] }),
  component: OrganizationsPage,
});

function OrganizationsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return organizations;
    return organizations.filter((org) => `${org.name} ${org.owner}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div>
      <PageHeader title="Organizations" subtitle="Every business account on the platform." />

      <div className="mt-6 max-w-xs">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search organizations…" className="pl-9" />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-panel/40 p-1">
        {filtered.length === 0 ? (
          <EmptyState icon={Building2} title="No organizations found" description="Try a different search term." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>API Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <Link to="/console/clients/$orgId" params={{ orgId: org.id }} className="flex items-center gap-2.5 font-medium text-foreground hover:text-emerald-bright">
                      <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-muted font-mono text-[10px] font-semibold">
                        {org.name.slice(0, 1)}
                      </span>
                      {org.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{org.owner}</TableCell>
                  <TableCell className="text-muted-foreground">{org.plan}</TableCell>
                  <TableCell className="text-muted-foreground">{org.users}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {org.apiUsageThisMonth.toLocaleString()} / {org.apiUsageLimit.toLocaleString()}
                  </TableCell>
                  <TableCell><StatusBadge status={org.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{org.createdDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="icon-button ml-auto">
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to="/console/clients/$orgId" params={{ orgId: org.id }}>View Organization</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast(`Managing users for ${org.name}`)}>Manage Users</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast(`Viewing usage for ${org.name}`)}>View Usage</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-error focus:text-error"
                          onClick={() => toast(org.status === "Suspended" ? `${org.name} reactivated` : `${org.name} suspended`)}
                        >
                          {org.status === "Suspended" ? "Reactivate" : "Suspend"}
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
