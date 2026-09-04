import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Car, CreditCard, ExternalLink, FolderLock, QrCode, Search, Briefcase as UanIcon } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/api-catalogue")({
  head: () => ({ meta: [{ title: "API Catalogue — DOVIXORA Console" }] }),
  component: ApiCataloguePage,
});

const endpoints = [
  { id: "verify-aadhaar", category: "Aadhaar Verification", icon: QrCode, method: "POST", path: "/v1/verify/aadhaar", description: "Verify Aadhaar via secure QR, offline XML or eAadhaar without exposing the raw number." },
  { id: "verify-pan", category: "PAN Verification", icon: CreditCard, method: "POST", path: "/v1/verify/pan", description: "Verify a PAN number against official identity registries." },
  { id: "verify-dl", category: "Driving Licence", icon: Car, method: "POST", path: "/v1/verify/dl", description: "Confirm driving licence validity and authorized vehicle classes from RTO records." },
  { id: "verify-uan", category: "UAN Verification", icon: UanIcon, method: "POST", path: "/v1/verify/uan", description: "Resolve a UAN from PAN, Aadhaar or mobile and pull verified EPFO employment history." },
  { id: "verify-kyc", category: "Full KYC", icon: BadgeCheck, method: "POST", path: "/v1/verify/kyc", description: "Run identity, address and biometric checks in a single orchestrated KYC flow." },
  { id: "digilocker-pull", category: "DigiLocker", icon: FolderLock, method: "POST", path: "/v1/digilocker/pull", description: "Consent-based pull of issued documents from a user's DigiLocker." },
] as const;

const categories = ["All", ...endpoints.map((e) => e.category)] as const;

function ApiCataloguePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const filtered = useMemo(() => {
    return endpoints.filter((endpoint) => {
      if (category !== "All" && endpoint.category !== category) return false;
      if (query.trim() && !`${endpoint.category} ${endpoint.path}`.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [query, category]);

  return (
    <div>
      <PageHeader title="API Catalogue" subtitle="Every documented DOVIXORA endpoint, grouped by verification service." />

      <div className="mt-6 flex flex-wrap gap-2 border-b border-line pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              cat === category ? "bg-emerald/10 text-emerald-bright" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-4 max-w-xs">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search endpoints…" className="pl-9" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState icon={Search} title="No endpoints found" description="Try a different search term or category." />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((endpoint) => (
            <div key={endpoint.id} className="flex flex-col rounded-2xl border border-line bg-panel p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
                  <endpoint.icon className="size-[18px]" />
                </span>
                <StatusBadge status="Active" />
              </div>
              <h3 className="mt-4 font-display text-sm font-bold text-foreground">{endpoint.category}</h3>
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                <span className="font-semibold text-emerald-bright">{endpoint.method}</span> {endpoint.path}
              </p>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">{endpoint.description}</p>
              <div className="mt-4 flex gap-2">
                <Link to="/console/verify" className="light-button !px-3 !py-1.5 flex-1 justify-center text-xs">
                  Try It
                </Link>
                <a
                  href="/developers/api-reference"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="outline-button !px-3 !py-1.5 flex-1 justify-center text-xs"
                >
                  Docs <ExternalLink className="size-3 opacity-60" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
