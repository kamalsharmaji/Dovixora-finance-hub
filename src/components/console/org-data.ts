export interface Organization {
  id: string;
  name: string;
  owner: string;
  plan: "Starter" | "Growth" | "Scale" | "Enterprise";
  users: number;
  apiUsageThisMonth: number;
  apiUsageLimit: number;
  status: "Active" | "Onboarding" | "Suspended";
  createdDate: string;
}

export const organizations: readonly Organization[] = [
  { id: "atlas-studio", name: "Atlas Studio", owner: "Meera Iyer", plan: "Growth", users: 6, apiUsageThisMonth: 38240, apiUsageLimit: 50000, status: "Active", createdDate: "Jan 14, 2026" },
  { id: "kite-markets", name: "Kite Markets", owner: "Divya Nair", plan: "Scale", users: 14, apiUsageThisMonth: 182300, apiUsageLimit: 250000, status: "Active", createdDate: "Feb 20, 2026" },
  { id: "meridian-pay", name: "Meridian Pay", owner: "Arjun Mehta", plan: "Growth", users: 3, apiUsageThisMonth: 4210, apiUsageLimit: 50000, status: "Onboarding", createdDate: "Aug 25, 2026" },
  { id: "solstice-labs", name: "Solstice Labs", owner: "Sara Kim", plan: "Starter", users: 2, apiUsageThisMonth: 412, apiUsageLimit: 5000, status: "Suspended", createdDate: "May 09, 2026" },
  { id: "harbor-fintech", name: "Harbor Fintech", owner: "Daniel Osei", plan: "Enterprise", users: 41, apiUsageThisMonth: 940120, apiUsageLimit: 2000000, status: "Active", createdDate: "Oct 02, 2025" },
];

export function findOrganization(id: string): Organization | undefined {
  return organizations.find((org) => org.id === id);
}
