import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { PageHeader } from "@/components/console/page-header";
import { useConsoleSession } from "@/components/console/session-context";

export const Route = createFileRoute("/console/roles")({
  head: () => ({ meta: [{ title: "Roles & Permissions — DOVIXORA Console" }] }),
  component: RolesPage,
});

const modules = ["Organization", "Users", "Team", "Services", "API", "API Keys", "Analytics", "Billing", "Support", "Settings"] as const;
const actions = ["View", "Create", "Edit", "Delete", "Manage"] as const;
type Module = (typeof modules)[number];
type Action = (typeof actions)[number];

const roleNames = ["Super Admin", "Admin", "Organization Owner", "Developer", "Team Member", "Viewer"] as const;
type RoleName = (typeof roleNames)[number];

type Matrix = Record<Module, Record<Action, boolean>>;

function buildMatrix(grant: (module: Module, action: Action) => boolean): Matrix {
  return Object.fromEntries(
    modules.map((module) => [module, Object.fromEntries(actions.map((action) => [action, grant(module, action)])) as Record<Action, boolean>]),
  ) as Matrix;
}

const seedMatrices: Record<RoleName, Matrix> = {
  "Super Admin": buildMatrix(() => true),
  Admin: buildMatrix((module, action) => {
    if (action === "Delete") return false;
    if (module === "Settings" && action === "Manage") return false;
    return true;
  }),
  "Organization Owner": buildMatrix((module, action) => {
    if (["Users"].includes(module) && action !== "View") return false;
    return true;
  }),
  Developer: buildMatrix((module, action) => {
    if (["API", "API Keys", "Services", "Analytics"].includes(module)) return true;
    return action === "View";
  }),
  "Team Member": buildMatrix((module, action) => {
    if (["Services", "Analytics", "Support"].includes(module)) return action === "View" || action === "Create";
    return action === "View" && module !== "Billing" && module !== "Settings";
  }),
  Viewer: buildMatrix((module, action) => action === "View" && module !== "Billing" && module !== "Settings"),
};

function RolesPage() {
  const { session } = useConsoleSession();
  const canEdit = session.role === "super_admin";
  // An organization only ever sees its own team's roles — Dovix's internal
  // Super Admin / Admin roles aren't something a customer should see or edit.
  const isPlatformViewer = session.role === "super_admin" || session.role === "admin";
  const visibleRoles = isPlatformViewer ? roleNames : roleNames.filter((role) => role !== "Super Admin" && role !== "Admin");
  const [selectedRole, setSelectedRole] = useState<RoleName>(isPlatformViewer ? "Organization Owner" : "Developer");
  const [matrices, setMatrices] = useState(seedMatrices);

  const matrix = matrices[selectedRole];

  const toggle = (module: Module, action: Action) => {
    if (!canEdit) {
      toast("Only Super Admin can edit role permissions.");
      return;
    }
    setMatrices((prev) => ({
      ...prev,
      [selectedRole]: { ...prev[selectedRole], [module]: { ...prev[selectedRole][module], [action]: !prev[selectedRole][module][action] } },
    }));
  };

  return (
    <div>
      <PageHeader
        title="Roles & Permissions"
        subtitle={canEdit ? "Define what each role can see and do across DOVIXORA." : "View what each role can see and do across DOVIXORA."}
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
        <div className="grid gap-1 rounded-2xl border border-line bg-panel/40 p-2">
          {visibleRoles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                role === selectedRole ? "bg-emerald/10 text-emerald-bright" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-line bg-panel/40 p-1">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="p-3 text-left font-mono text-[11px] uppercase tracking-wide text-muted-foreground">Module</th>
                {actions.map((action) => (
                  <th key={action} className="p-3 text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                    {action}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {modules.map((module) => (
                <tr key={module} className="border-t border-line">
                  <td className="p-3 font-medium text-foreground">{module}</td>
                  {actions.map((action) => (
                    <td key={action} className="p-3 text-center">
                      <Checkbox
                        checked={matrix[module][action]}
                        onCheckedChange={() => toggle(module, action)}
                        disabled={!canEdit}
                        className="mx-auto"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
