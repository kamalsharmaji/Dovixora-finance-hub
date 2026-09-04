import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AlertTriangle,
  Bell,
  Boxes,
  Building2,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileClock,
  FileText,
  Flag,
  FlaskConical,
  Gauge,
  KeyRound,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  MessageCircleQuestion,
  Network,
  Package,
  Plug,
  Receipt,
  Server,
  Settings,
  SlidersHorizontal,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  UserCog,
  UserPlus,
  Users,
  Wallet,
  Webhook,
  Zap,
  BookOpen,
} from "lucide-react";

import type { Permission } from "@/lib/permissions";
import type { ConsoleRole } from "@/lib/session";

export interface ConsoleNavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  /** Hides the item unless the viewer's role has this permission — used for finer-than-role visibility (e.g. a Team Member only sees API Keys once granted). */
  permission?: Permission;
  /** Points at a public marketing/docs page rather than a console route — rendered as an
   * explicit "opens in a new tab" link so it never swaps out the dashboard shell. */
  external?: boolean;
}

export interface ConsoleNavGroup {
  heading?: string;
  items: ConsoleNavItem[];
}

const superAdminNav: ConsoleNavGroup[] = [
  { heading: "Overview", items: [{ label: "Dashboard", to: "/console", icon: LayoutDashboard }] },
  {
    heading: "Platform Management",
    items: [
      { label: "Organizations", to: "/console/clients", icon: Building2 },
      { label: "Service Requests", to: "/console/service-requests", icon: ClipboardList },
      { label: "Users", to: "/console/users", icon: Users },
      { label: "Admin Management", to: "/console/users", icon: UserCog },
      { label: "Roles & Permissions", to: "/console/roles", icon: ClipboardCheck },
    ],
  },
  {
    heading: "Services",
    items: [
      { label: "Verification Services", to: "/console/products", icon: Boxes },
      { label: "API Products", to: "/console/products", icon: Package },
      { label: "Service Configuration", to: "/console/products", icon: SlidersHorizontal },
      { label: "API Providers", to: "/console/products", icon: Network },
    ],
  },
  {
    heading: "API Management",
    items: [
      { label: "API Monitoring", to: "/console/platform", icon: Activity },
      { label: "API Logs", to: "/console/platform", icon: FileClock },
      { label: "API Errors", to: "/console/platform", icon: AlertTriangle },
      { label: "Webhooks", to: "/console/platform", icon: Webhook },
      { label: "System Status", to: "/console/platform", icon: Server },
    ],
  },
  {
    heading: "Financial",
    items: [
      { label: "Subscriptions", to: "/console/finance", icon: Wallet },
      { label: "Billing", to: "/console/finance", icon: Receipt },
      { label: "Payments", to: "/console/finance", icon: CreditCard },
      { label: "Invoices", to: "/console/finance", icon: FileText },
      { label: "Revenue Analytics", to: "/console/finance", icon: TrendingUp },
    ],
  },
  {
    heading: "Security",
    items: [
      { label: "Security Center", to: "/console/security", icon: ShieldCheck },
      { label: "Audit Logs", to: "/console/compliance/audit", icon: FileClock },
      { label: "Access Logs", to: "/console/compliance/audit", icon: KeyRound },
      { label: "API Key Monitoring", to: "/console/compliance/audit", icon: KeyRound },
      { label: "Suspicious Activity", to: "/console/compliance/audit", icon: ShieldAlert },
    ],
  },
  {
    heading: "Support",
    items: [
      { label: "Support Tickets", to: "/console/support", icon: LifeBuoy },
      { label: "Customer Issues", to: "/console/support", icon: MessageCircleQuestion },
      { label: "Knowledge Base", to: "/console/support", icon: BookOpen },
    ],
  },
  {
    heading: "System",
    items: [
      { label: "Platform Settings", to: "/console/system", icon: Settings },
      { label: "Feature Flags", to: "/console/system", icon: Flag },
      { label: "Email Templates", to: "/console/system", icon: Mail },
      { label: "Notification Settings", to: "/console/system", icon: Bell },
      { label: "Integrations", to: "/console/system", icon: Plug },
    ],
  },
];

const adminNav: ConsoleNavGroup[] = [
  { heading: "Overview", items: [{ label: "Dashboard", to: "/console", icon: LayoutDashboard }] },
  {
    heading: "Organization",
    items: [
      { label: "Organizations", to: "/console/clients", icon: Building2 },
      { label: "Service Requests", to: "/console/service-requests", icon: ClipboardList },
      { label: "Organization Users", to: "/console/users", icon: Users },
    ],
  },
  {
    heading: "User Management",
    items: [
      { label: "Users", to: "/console/users", icon: Users },
      { label: "Team Members", to: "/console/admin/team-members", icon: UserPlus },
      { label: "Roles & Permissions", to: "/console/roles", icon: ClipboardCheck },
    ],
  },
  {
    heading: "Services",
    items: [
      { label: "Available Services", to: "/console/products", icon: Boxes },
      { label: "Service Access", to: "/console/products", icon: SlidersHorizontal },
      { label: "API Products", to: "/console/products", icon: Package },
    ],
  },
  {
    heading: "API Management",
    items: [
      { label: "API Keys", to: "/console/admin/api-keys", icon: KeyRound },
      { label: "API Logs", to: "/console/developer/logs", icon: FileClock },
      { label: "Webhooks", to: "/console/developer/webhooks", icon: Webhook },
      { label: "Usage Analytics", to: "/console/reports", icon: TrendingUp },
    ],
  },
  {
    heading: "Billing",
    items: [
      { label: "Subscriptions", to: "/console/finance", icon: Wallet },
      { label: "Invoices", to: "/console/finance", icon: FileText },
      { label: "Payments", to: "/console/finance", icon: CreditCard },
    ],
  },
  { heading: "Support", items: [{ label: "Support Tickets", to: "/console/support", icon: LifeBuoy }] },
  {
    heading: "Settings",
    items: [
      { label: "Profile Settings", to: "/console/settings", icon: Settings },
      { label: "Notifications", to: "/console/settings", icon: Bell },
    ],
  },
];

const orgNav: ConsoleNavGroup[] = [
  { heading: "Overview", items: [{ label: "Dashboard", to: "/console", icon: LayoutDashboard }] },
  {
    heading: "Verification Services",
    items: [
      { label: "Products Catalogue", to: "/console/products", icon: Boxes },
      { label: "Run Verification", to: "/console/verify", icon: Zap },
    ],
  },
  {
    heading: "Developer",
    items: [
      { label: "API Keys", to: "/console/developer/keys", icon: KeyRound, permission: "apikey.view" },
      { label: "API Catalogue", to: "/console/api-catalogue", icon: Boxes },
      { label: "API Logs", to: "/console/developer/logs", icon: FileClock },
      { label: "Webhooks", to: "/console/developer/webhooks", icon: Webhook },
      { label: "API Documentation", to: "/developers/documentation", icon: BookOpen, external: true },
      { label: "SDKs", to: "/developers/sdks", icon: Package, external: true },
      { label: "Sandbox", to: "/developers/sandbox", icon: FlaskConical, external: true },
    ],
  },
  {
    heading: "Analytics",
    items: [
      { label: "Usage Analytics", to: "/console/reports", icon: TrendingUp },
      { label: "Request History", to: "/console/verify/history", icon: FileClock },
    ],
  },
  {
    heading: "Team",
    items: [
      { label: "Team Members", to: "/console/team", icon: Users },
      { label: "Invitations", to: "/console/team/invitations", icon: UserPlus },
      { label: "Roles & Permissions", to: "/console/roles", icon: ClipboardCheck },
    ],
  },
  {
    heading: "Billing",
    items: [
      { label: "Subscription", to: "/console/billing", icon: Wallet },
      { label: "Usage & Limits", to: "/console/billing", icon: Gauge },
      { label: "Payment Methods", to: "/console/billing", icon: CreditCard },
      { label: "Invoices", to: "/console/billing", icon: FileText },
    ],
  },
  {
    heading: "Support",
    items: [
      { label: "Support Tickets", to: "/console/support", icon: LifeBuoy },
      { label: "Documentation", to: "/developers/documentation", icon: BookOpen, external: true },
    ],
  },
  {
    heading: "Settings",
    items: [
      { label: "Organization Profile", to: "/console/settings", icon: Building2 },
      { label: "Security", to: "/console/security", icon: ShieldCheck },
      { label: "Notifications", to: "/console/settings", icon: Bell },
    ],
  },
];

const memberNav: ConsoleNavGroup[] = [
  { heading: "Overview", items: [{ label: "Dashboard", to: "/console", icon: LayoutDashboard }] },
  { heading: "Services", items: [{ label: "Available Verification Services", to: "/console/verify", icon: Zap }] },
  {
    heading: "Developer",
    items: [
      { label: "API Keys", to: "/console/developer/keys", icon: KeyRound, permission: "apikey.view" },
      { label: "API Catalogue", to: "/console/api-catalogue", icon: Boxes },
      { label: "API Logs", to: "/console/developer/logs", icon: FileClock },
      { label: "Webhooks", to: "/console/developer/webhooks", icon: Webhook },
    ],
  },
  { heading: "Analytics", items: [{ label: "Usage", to: "/console/reports", icon: TrendingUp }] },
  { heading: "Team", items: [{ label: "Team Members", to: "/console/team", icon: Users }] },
  {
    heading: "Support",
    items: [
      { label: "Support Tickets", to: "/console/support", icon: LifeBuoy },
      { label: "Documentation", to: "/developers/documentation", icon: BookOpen, external: true },
    ],
  },
  {
    heading: "Settings",
    items: [
      { label: "My Profile", to: "/console/settings", icon: Settings },
      { label: "Notifications", to: "/console/settings", icon: Bell },
    ],
  },
];

export function getConsoleNav(role: ConsoleRole): ConsoleNavGroup[] {
  switch (role) {
    case "super_admin":
      return superAdminNav;
    case "admin":
      return adminNav;
    case "business_owner":
      return orgNav;
    case "team_member":
      return memberNav;
  }
}
