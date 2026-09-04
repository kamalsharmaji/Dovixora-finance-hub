import type { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";

import { useConsoleSession } from "@/components/console/session-context";
import { hasPermission, type Permission } from "@/lib/permissions";

interface CanProps {
  permission: Permission;
  children: ReactNode;
  fallback?: ReactNode;
}

/** Gates a button, link or section behind a permission — renders nothing (or a fallback) otherwise. */
function Can({ permission, children, fallback = null }: CanProps) {
  const allowed = useCan(permission);
  return allowed ? <>{children}</> : <>{fallback}</>;
}

/** Hook form of `Can`, for gating whole pages (render `<PermissionDenied />` instead) or non-JSX logic. */
function useCan(permission: Permission): boolean {
  const { session } = useConsoleSession();
  return hasPermission(session.role, permission);
}

/** Full-page state for when a role reaches a route it doesn't have permission for. */
function PermissionDenied({ requiredPermission }: { requiredPermission?: Permission }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-panel/40 px-6 py-24 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-error/10 text-error">
        <ShieldAlert className="size-5" />
      </span>
      <h1 className="mt-4 font-display text-lg font-semibold text-foreground">You don't have access to this page</h1>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        {requiredPermission
          ? `This section requires the "${requiredPermission}" permission. Ask an organization owner or admin for access.`
          : "Ask an organization owner or admin for access."}
      </p>
    </div>
  );
}

export { Can, PermissionDenied, useCan };
