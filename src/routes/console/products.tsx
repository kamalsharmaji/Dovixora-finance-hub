import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Briefcase,
  Building2,
  Car,
  CreditCard,
  ExternalLink,
  FileSearch,
  FolderLock,
  Landmark,
  Loader2,
  QrCode,
  ScanFace,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Can } from "@/components/console/permission-gate";
import { PageHeader } from "@/components/console/page-header";
import { useConsoleSession } from "@/components/console/session-context";
import { StatusBadge } from "@/components/console/status-badge";
import {
  completePayment,
  requestAccess,
  requestsForOrg,
  useServiceRequests,
  type RequestStatus,
} from "@/lib/service-requests-store";

export const Route = createFileRoute("/console/products")({
  head: () => ({ meta: [{ title: "Products Catalogue — DOVIXORA Console" }] }),
  component: ProductsPage,
});

const customerCatalogue = [
  { id: "aadhaar", name: "Aadhaar Verification", icon: QrCode, to: "/products/aadhaar-verification", description: "Verify identity using Aadhaar via authorized sources." },
  { id: "pan", name: "PAN Verification", icon: CreditCard, to: "/products/pan-verification", description: "Instant PAN verification with IT Department records." },
  { id: "driving-licence", name: "Driving Licence Verification", icon: Car, to: "/products/driving-licence-verification", description: "Verify driving licence details and validity." },
  { id: "uan", name: "UAN Verification", icon: Briefcase, to: "/products/uan-verification", description: "Validate UAN and employment details via EPFO." },
  { id: "full-kyc", name: "Full KYC", icon: BadgeCheck, to: "/products/full-kyc", description: "Complete KYC verification in a single request." },
  { id: "digilocker", name: "DigiLocker", icon: FolderLock, to: "/products/digilocker-verification", description: "Fetch and verify documents from DigiLocker." },
  { id: "business", name: "Business Verification", icon: Building2, to: "/products/business-verification", description: "Verify a business's registration and compliance status." },
  { id: "bank-upi", name: "Bank / UPI Verification", icon: Landmark, to: "/products/bank-upi-verification", description: "Verify bank accounts and UPI handles before payout." },
  { id: "employment", name: "Employment Verification", icon: UserCheck, to: "/products/employment-verification", description: "Confirm a candidate's employment history and status." },
  { id: "identity", name: "Identity Verification", icon: ScanFace, to: "/products/identity-verification", description: "Verify a person's identity against government records." },
  { id: "document", name: "Document Verification", icon: FileSearch, to: "/products/document-verification", description: "Validate the authenticity of uploaded documents." },
] as const;

const catalogueTabs = ["All Products", "Active", "Requires Action"] as const;
const ORG_ID = "atlas-studio";

/** Only these 6 have a documented endpoint in the API Reference / Run Verification tool —
 * the other 5 real products don't have a runnable flow yet, so don't dead-end into one. */
const RUNNABLE_PRODUCT_IDS = new Set(["aadhaar", "pan", "driving-licence", "uan", "full-kyc", "digilocker"]);

const statusTone: Record<RequestStatus | "Not Requested", "good" | "warn" | "critical" | "neutral"> = {
  Active: "good",
  Pending: "warn",
  "Payment Pending": "warn",
  Rejected: "critical",
  Suspended: "critical",
  "Not Requested": "neutral",
};

function CustomerProductsCatalogue() {
  const { session } = useConsoleSession();
  const requests = useServiceRequests();
  const myRequests = requestsForOrg(requests, ORG_ID);
  const [tab, setTab] = useState<(typeof catalogueTabs)[number]>("All Products");
  const [payDialog, setPayDialog] = useState<{ requestId: string; productName: string } | null>(null);
  const [paying, setPaying] = useState(false);

  const products = useMemo(() => {
    return customerCatalogue.map((product) => {
      const matches = myRequests.filter((r) => r.productId === product.id);
      const latest = matches[matches.length - 1];
      const status: RequestStatus | "Not Requested" = latest?.status ?? "Not Requested";
      return { ...product, status, request: latest };
    });
  }, [myRequests]);

  const filtered = useMemo(() => {
    if (tab === "Active") return products.filter((p) => p.status === "Active");
    if (tab === "Requires Action") return products.filter((p) => p.status !== "Active");
    return products;
  }, [tab, products]);

  const handleRequest = (productId: string, productName: string) => {
    requestAccess(ORG_ID, session.orgName, productId, productName);
    toast.success(`Access requested for ${productName} — an admin will review it shortly.`);
  };

  const handlePay = () => {
    if (!payDialog) return;
    setPaying(true);
    setTimeout(() => {
      completePayment(payDialog.requestId);
      toast.success(`${payDialog.productName} is now active`);
      setPaying(false);
      setPayDialog(null);
    }, 900);
  };

  return (
    <div>
      <PageHeader title="Products Catalogue" subtitle="Request, track and activate the verification services your organization uses." />

      <div className="mt-6 flex gap-1 rounded-xl border border-line bg-panel/40 p-1 w-fit">
        {catalogueTabs.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setTab(option)}
            className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
              tab === option ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <div key={product.id} className="flex flex-col rounded-2xl border border-line bg-panel p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
                <product.icon className="size-[18px]" />
              </span>
              <StatusBadge status={product.status} tone={statusTone[product.status]} />
            </div>
            <h3 className="mt-4 font-display text-sm font-bold text-foreground">{product.name}</h3>
            <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{product.description}</p>
            {product.status === "Rejected" && product.request?.rejectionReason && (
              <p className="mt-2 text-xs text-error">Reason: {product.request.rejectionReason}</p>
            )}
            <div className="mt-4 flex items-center gap-1 text-xs">
              <a
                href={product.to}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
              >
                Documentation <ExternalLink className="size-3 opacity-60" />
              </a>
            </div>

            {product.status === "Active" && RUNNABLE_PRODUCT_IDS.has(product.id) && (
              <Link to="/console/verify" className="light-button mt-3 justify-center text-sm">
                Run Verification
              </Link>
            )}
            {product.status === "Active" && !RUNNABLE_PRODUCT_IDS.has(product.id) && (
              <span className="mt-3 text-center text-xs text-muted-foreground">Active — API access via your key</span>
            )}
            {product.status === "Not Requested" && (
              <Can permission="organization.edit" fallback={<span className="mt-3 text-center text-xs text-muted-foreground">Ask your Organization Owner to request this.</span>}>
                <button type="button" onClick={() => handleRequest(product.id, product.name)} className="outline-button mt-3 justify-center text-sm">
                  Request Access
                </button>
              </Can>
            )}
            {product.status === "Pending" && (
              <button type="button" disabled className="outline-button mt-3 justify-center text-sm opacity-60">
                Awaiting Admin Approval
              </button>
            )}
            {product.status === "Payment Pending" && (
              <Can permission="billing.manage" fallback={<span className="mt-3 text-center text-xs text-muted-foreground">Approved — awaiting payment from your Owner.</span>}>
                <button
                  type="button"
                  onClick={() => setPayDialog({ requestId: product.request!.id, productName: product.name })}
                  className="light-button mt-3 justify-center text-sm"
                >
                  Complete Payment
                </button>
              </Can>
            )}
            {product.status === "Rejected" && (
              <Can permission="organization.edit">
                <button type="button" onClick={() => handleRequest(product.id, product.name)} className="outline-button mt-3 justify-center text-sm">
                  Request Again
                </button>
              </Can>
            )}
            {product.status === "Suspended" && (
              <Link to="/console/support" className="outline-button mt-3 justify-center text-sm">
                Contact Support
              </Link>
            )}
          </div>
        ))}
      </div>

      <Dialog open={payDialog !== null} onOpenChange={(open) => !open && setPayDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate {payDialog?.productName}</DialogTitle>
            <DialogDescription>One-time activation charge. This is a demo payment — no real charge is made.</DialogDescription>
          </DialogHeader>
          <div className="rounded-xl border border-line bg-panel/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Activation fee</span>
              <span className="font-mono font-semibold text-foreground">₹499</span>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handlePay} disabled={paying} className="w-full">
              {paying ? <Loader2 className="size-4 animate-spin" /> : null}
              {paying ? "Processing…" : "Pay ₹499"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const catalog = [
  { name: "Aadhaar Verification", icon: QrCode, plans: "All plans", enabled: true },
  { name: "PAN Verification", icon: CreditCard, plans: "All plans", enabled: true },
  { name: "Driving Licence Verification", icon: Car, plans: "Growth and above", enabled: true },
  { name: "UAN Verification", icon: Briefcase, plans: "Growth and above", enabled: true },
  { name: "Full KYC", icon: BadgeCheck, plans: "Growth and above", enabled: true },
  { name: "DigiLocker", icon: FolderLock, plans: "Growth and above", enabled: true },
  { name: "Business Verification", icon: Building2, plans: "Scale and above", enabled: true },
  { name: "Bank / UPI Verification", icon: Landmark, plans: "Scale and above", enabled: true },
  { name: "Employment Verification", icon: UserCheck, plans: "Scale and above", enabled: false },
  { name: "Identity Verification", icon: ScanFace, plans: "Enterprise", enabled: false },
];

const providers = [
  { name: "UIDAI Gateway", covers: "Aadhaar Verification", status: "Operational" },
  { name: "NSDL PAN Registry", covers: "PAN Verification", status: "Operational" },
  { name: "State Transport Authorities", covers: "Driving Licence", status: "Operational" },
  { name: "EPFO", covers: "UAN Verification", status: "Degraded" },
  { name: "DigiLocker API", covers: "DigiLocker, Full KYC", status: "Operational" },
  { name: "MCA / GSTN", covers: "Business Verification", status: "Operational" },
];

function ProductsPage() {
  const { session } = useConsoleSession();
  const [services, setServices] = useState(catalog);

  if (session.role === "business_owner" || session.role === "team_member") {
    return <CustomerProductsCatalogue />;
  }

  const toggle = (name: string) => {
    setServices((prev) => prev.map((s) => (s.name === name ? { ...s, enabled: !s.enabled } : s)));
    toast.success("Service configuration updated");
  };

  return (
    <div>
      <PageHeader title="Verification Services" subtitle="Enable services per plan and monitor the upstream providers behind them." />

      <Tabs defaultValue="catalog" className="mt-6">
        <TabsList>
          <TabsTrigger value="catalog">Catalog</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="providers">API Providers</TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="mt-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.name} className="rounded-2xl border border-line bg-panel p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
                    <service.icon className="size-[18px]" />
                  </span>
                  <Can permission="organization.edit" fallback={<StatusBadge status={service.enabled ? "Active" : "Inactive"} />}>
                    <Switch checked={service.enabled} onCheckedChange={() => toggle(service.name)} />
                  </Can>
                </div>
                <h3 className="mt-4 font-display text-sm font-bold text-foreground">{service.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{service.plans}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="configuration" className="mt-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-panel p-5">
              <span className="font-display text-sm font-semibold text-foreground">Request handling</span>
              <div className="mt-4 grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground">Auto-retry on provider timeout</p>
                    <p className="text-xs text-muted-foreground">Retries once before returning a failure.</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => toast.success("Setting updated")} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground">Manual review on low-confidence match</p>
                    <p className="text-xs text-muted-foreground">Routes uncertain results to the review queue.</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => toast.success("Setting updated")} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground">Sandbox mode for new organizations</p>
                    <p className="text-xs text-muted-foreground">New signups start in sandbox by default.</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={() => toast.success("Setting updated")} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-panel p-5">
              <span className="font-display text-sm font-semibold text-foreground">Rate limits</span>
              <div className="mt-4 grid gap-3">
                {[
                  { plan: "Starter", limit: "10 requests / min" },
                  { plan: "Growth", limit: "60 requests / min" },
                  { plan: "Scale", limit: "300 requests / min" },
                  { plan: "Enterprise", limit: "Custom" },
                ].map((row) => (
                  <div key={row.plan} className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{row.plan}</span>
                    <span className="font-mono text-xs text-muted-foreground">{row.limit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="providers" className="mt-4">
          <div className="rounded-2xl border border-line bg-panel/40 p-1">
            {providers.map((provider) => (
              <div key={provider.name} className="flex items-center gap-3 border-b border-line p-4 last:border-0">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                  <ShieldCheck className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{provider.name}</p>
                  <p className="text-xs text-muted-foreground">{provider.covers}</p>
                </div>
                <StatusBadge status={provider.status} />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
