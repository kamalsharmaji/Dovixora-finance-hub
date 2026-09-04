import type { ConsoleRole } from "@/lib/session";

export const PERMISSIONS = [
  "organization.view",
  "organization.edit",
  "organization.delete",
  "users.view",
  "users.create",
  "users.edit",
  "users.delete",
  "api.view",
  "api.create",
  "api.delete",
  "apikey.view",
  "apikey.create",
  "apikey.revoke",
  "team.view",
  "team.invite",
  "team.edit",
  "team.remove",
  "billing.view",
  "billing.manage",
  "analytics.view",
  "support.create",
  "support.manage",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

const ALL_PERMISSIONS: readonly Permission[] = PERMISSIONS;

const ROLE_PERMISSIONS: Record<ConsoleRole, readonly Permission[]> = {
  super_admin: ALL_PERMISSIONS,
  admin: [
    "organization.view",
    "organization.edit",
    "users.view",
    "users.create",
    "users.edit",
    "api.view",
    "apikey.view",
    "team.view",
    "team.edit",
    "billing.view",
    "analytics.view",
    "support.create",
    "support.manage",
  ],
  business_owner: [
    "organization.view",
    "organization.edit",
    "users.view",
    "api.view",
    "api.create",
    "apikey.view",
    "apikey.create",
    "apikey.revoke",
    "team.view",
    "team.invite",
    "team.edit",
    "team.remove",
    "billing.view",
    "billing.manage",
    "analytics.view",
    "support.create",
    "support.manage",
  ],
  team_member: ["api.view", "team.view", "analytics.view", "support.create"],
};

/**
 * Optional per-user grants layered on top of role defaults — this is how a Business
 * Owner can hand a Team Member things like `apikey.create` without changing their role.
 * Empty by default; the mock session model has nowhere to persist grants yet.
 */
export function hasPermission(role: ConsoleRole, permission: Permission, grants: readonly Permission[] = []): boolean {
  return ROLE_PERMISSIONS[role].includes(permission) || grants.includes(permission);
}

export function permissionsFor(role: ConsoleRole): readonly Permission[] {
  return ROLE_PERMISSIONS[role];
}
