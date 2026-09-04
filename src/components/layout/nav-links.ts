import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AppWindow,
  BadgeCheck,
  Bookmark,
  BookOpen,
  Briefcase,
  Building2,
  Car,
  CreditCard,
  FlaskConical,
  FolderLock,
  History,
  Landmark,
  LifeBuoy,
  Mail,
  Newspaper,
  Package,
  QrCode,
  Store,
  Terminal,
} from "lucide-react";

export interface NavLink {
  label: string;
  to?: string;
  description?: string;
  icon?: LucideIcon;
  /** Not routed yet in this phase — rendered as a disabled placeholder, never a broken link. */
  comingSoon?: boolean;
}

export interface NavItem extends NavLink {
  to: string;
  children?: NavLink[];
}

export const navItems: NavItem[] = [
  {
    label: "Products",
    to: "/products",
    children: [
      { label: "Aadhaar Verification", to: "/products/aadhaar-verification", description: "Verify Aadhaar via QR, XML or eAadhaar without exposing the number.", icon: QrCode },
      { label: "PAN Verification", to: "/products/pan-verification", description: "Verify PAN instantly, from a lite check to a full profile pull.", icon: CreditCard },
      { label: "Driving Licence", to: "/products/driving-licence-verification", description: "Confirm licence validity and vehicle-class authorization.", icon: Car },
      { label: "UAN Verification", to: "/products/uan-verification", description: "Resolve UAN and pull verified EPFO employment history.", icon: Briefcase },
      { label: "Full KYC", to: "/products/full-kyc", description: "Identity, address and biometric checks in one orchestrated flow.", icon: BadgeCheck },
      { label: "DigiLocker", to: "/products/digilocker-verification", description: "Consent-based document pull straight from DigiLocker.", icon: FolderLock },
    ],
  },
  {
    label: "Solutions",
    to: "/solutions",
    children: [
      { label: "Fintech", to: "/solutions/fintech", description: "Launch financial products with built-in KYC and verification.", icon: Landmark },
      { label: "Marketplaces", to: "/solutions/marketplaces", description: "Verify buyers, sellers and payouts across your marketplace.", icon: Store },
      { label: "SaaS Platforms", to: "/solutions/saas", description: "Embed identity and business verification into your product.", icon: AppWindow },
      { label: "Enterprises", to: "/solutions/enterprises", description: "Verify employees, vendors and partners at enterprise scale.", icon: Building2 },
    ],
  },
  {
    label: "Developers",
    to: "/developers",
    children: [
      { label: "Documentation", to: "/developers/documentation", description: "Guides and concepts for integrating Dovixora.", icon: BookOpen },
      { label: "API Reference", to: "/developers/api-reference", description: "Complete reference for every endpoint.", icon: Terminal },
      { label: "SDKs", to: "/developers/sdks", description: "Typed client libraries for your stack.", icon: Package },
      { label: "Sandbox", to: "/developers/sandbox", description: "Build and test without touching production.", icon: FlaskConical },
      { label: "System Status", to: "/developers/status", description: "Live uptime and incident history.", icon: Activity },
    ],
  },
  {
    label: "Resources",
    to: "/company/blog",
    children: [
      { label: "Blog", to: "/company/blog", description: "Product updates and engineering notes.", icon: Newspaper },
      { label: "Guides", description: "In-depth walkthroughs for common integrations.", icon: Bookmark, comingSoon: true },
      { label: "Changelog", description: "What shipped, and when.", icon: History, comingSoon: true },
      { label: "Help Center", description: "Answers from the Dovixora support team.", icon: LifeBuoy, comingSoon: true },
    ],
  },
  {
    label: "Pricing",
    to: "/pricing",
  },
  {
    label: "Company",
    to: "/company/about",
    children: [
      { label: "About", to: "/company/about", description: "The verification infrastructure behind modern business.", icon: Building2 },
      { label: "Blog", to: "/company/blog", description: "Product updates and engineering notes.", icon: Newspaper },
      { label: "Contact", to: "/company/contact", description: "Talk to our team.", icon: Mail },
    ],
  },
];

export interface FooterLink {
  label: string;
  to: string;
}

export const footerColumns: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "Aadhaar Verification", to: "/products/aadhaar-verification" },
      { label: "PAN Verification", to: "/products/pan-verification" },
      { label: "Driving Licence Verification", to: "/products/driving-licence-verification" },
      { label: "UAN Verification", to: "/products/uan-verification" },
      { label: "Full KYC Verification", to: "/products/full-kyc" },
      { label: "DigiLocker", to: "/products/digilocker-verification" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Fintech", to: "/solutions/fintech" },
      { label: "Marketplaces", to: "/solutions/marketplaces" },
      { label: "SaaS Platforms", to: "/solutions/saas" },
      { label: "Enterprises", to: "/solutions/enterprises" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "Documentation", to: "/developers/documentation" },
      { label: "API Reference", to: "/developers/api-reference" },
      { label: "SDKs", to: "/developers/sdks" },
      { label: "Sandbox", to: "/developers/sandbox" },
      { label: "Status", to: "/developers/status" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/company/about" },
      { label: "Blog", to: "/company/blog" },
      { label: "Contact Us", to: "/company/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", to: "/company/terms" },
      { label: "Privacy Policy", to: "/company/privacy" },
      { label: "Refund Policy", to: "/company/refund-policy" },
      { label: "Compliance", to: "/company/compliance" },
    ],
  },
];
