import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Briefcase, Car, CreditCard, FolderLock, QrCode } from "lucide-react";

import { Container } from "@/components/ui/container";
import { DeveloperMetrics, type DeveloperMetric } from "@/components/developers/developer-metrics";

export const Route = createFileRoute("/_marketing/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — DOVIXORA" }] }),
  component: DashboardPage,
});

const metrics: readonly DeveloperMetric[] = [
  { icon: QrCode, value: "8,420", label: "Aadhaar verifications this month", tone: "blue" },
  { icon: CreditCard, value: "6,204", label: "PAN verifications this month", tone: "cyan" },
  { icon: Car, value: "2,918", label: "Driving licence checks", tone: "emerald" },
  { icon: Briefcase, value: "1,362", label: "UAN verifications", tone: "blue" },
];

const recentVerifications = [
  { name: "Atlas Studio", type: "PAN Verification", status: "Verified" },
  { name: "Kite Markets", type: "Aadhaar Verification", status: "Verified" },
  { name: "Nova Health", type: "Full KYC", status: "Review" },
  { name: "Meridian Pay", type: "DigiLocker Pull", status: "Verified" },
] as const;

const quickLinks = [
  { icon: QrCode, title: "Run a verification", description: "Test Aadhaar, PAN, DL, UAN or Full KYC checks in sandbox.", to: "/developers/sandbox" },
  { icon: BadgeCheck, title: "Explore the API", description: "Browse every verification endpoint and parameter.", to: "/developers/api-reference" },
  { icon: FolderLock, title: "Read the docs", description: "Guides for integrating DOVIXORA into your product.", to: "/developers/documentation" },
] as const;

function DashboardPage() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-2xl">
        <span className="section-kicker">Dashboard</span>
        <h1 className="section-title mt-3">
          Welcome back to <span className="gradient-text">DOVIXORA.</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          This is a frontend preview of your dashboard — sandbox data only, no live account is connected.
        </p>
      </div>

      <div className="mt-10">
        <DeveloperMetrics metrics={metrics} />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="dashboard-activity">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold">Recent verifications</span>
            <span className="text-xs text-cyan">Live</span>
          </div>
          <div className="mt-4 space-y-3">
            {recentVerifications.map((item) => (
              <div key={item.name} className="transaction-row">
                <span className="transaction-avatar">{item.name.slice(0, 1)}</span>
                <span className="min-w-0 flex-1">
                  <strong className="block truncate">{item.name}</strong>
                  <small>{item.status}</small>
                </span>
                <b>{item.type}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          {quickLinks.map((link) => (
            <Link key={link.to} to={link.to} className="group product-card tone-blue">
              <div className="flex items-start justify-between gap-4">
                <div className="icon-tile">
                  <link.icon className="size-5" />
                </div>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
              </div>
              <h3 className="mt-4 font-display text-base font-bold">{link.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
