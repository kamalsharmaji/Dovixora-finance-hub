export type ConsoleRole = "super_admin" | "admin" | "business_owner" | "team_member";

export interface ConsoleSession {
  name: string;
  email: string;
  role: ConsoleRole;
  orgName: string;
}

const STORAGE_KEY = "dovixora.console.session";

export function readSession(): ConsoleSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ConsoleSession) : null;
  } catch {
    return null;
  }
}

export function writeSession(session: ConsoleSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export const roleLabels: Record<ConsoleRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  business_owner: "Business Owner",
  team_member: "Team Member",
};

export const roleDescriptions: Record<ConsoleRole, string> = {
  super_admin: "Full platform control — Dovix AI",
  admin: "Operations & support — Dovix AI",
  business_owner: "Your organization's account",
  team_member: "Invited seat on an organization",
};

/** Demo accounts — this app has no real backend yet, so login assigns one of these. */
export const demoAccounts: Record<ConsoleRole, ConsoleSession> = {
  super_admin: { name: "Ananya Rao", email: "ananya@dovix.ai", role: "super_admin", orgName: "Dovix AI" },
  admin: { name: "Karan Bhatt", email: "karan@dovix.ai", role: "admin", orgName: "Dovix AI" },
  business_owner: { name: "Meera Iyer", email: "meera@atlasstudio.io", role: "business_owner", orgName: "Atlas Studio" },
  team_member: { name: "Rohit Sen", email: "rohit@atlasstudio.io", role: "team_member", orgName: "Atlas Studio" },
};
