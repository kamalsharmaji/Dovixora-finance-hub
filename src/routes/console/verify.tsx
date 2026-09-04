import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Car, CreditCard, FolderLock, Loader2, QrCode, Briefcase as UanIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Can } from "@/components/console/permission-gate";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";
import { requestsForOrg, useServiceRequests } from "@/lib/service-requests-store";

export const Route = createFileRoute("/console/verify")({
  head: () => ({ meta: [{ title: "Run Verification — DOVIXORA Console" }] }),
  component: VerifyPage,
});

const allProducts = [
  { value: "aadhaar", label: "Aadhaar Verification", icon: QrCode, placeholder: "XXXX XXXX 1234" },
  { value: "pan", label: "PAN Verification", icon: CreditCard, placeholder: "ABCPX1234K" },
  { value: "driving-licence", label: "Driving Licence", icon: Car, placeholder: "RJ14 20230012345" },
  { value: "uan", label: "UAN Verification", icon: UanIcon, placeholder: "100123456789" },
  { value: "full-kyc", label: "Full KYC", icon: BadgeCheck, placeholder: "Reference ID" },
  { value: "digilocker", label: "DigiLocker", icon: FolderLock, placeholder: "Consent token" },
] as const;

interface RunResult {
  id: string;
  product: string;
  input: string;
  status: "Verified" | "Review";
  time: string;
}

function VerifyPage() {
  const requests = useServiceRequests();
  const activeProductIds = useMemo(
    () => new Set(requestsForOrg(requests, "atlas-studio").filter((r) => r.status === "Active").map((r) => r.productId)),
    [requests],
  );
  const products = useMemo(() => allProducts.filter((p) => activeProductIds.has(p.value)), [activeProductIds]);

  const [productValue, setProductValue] = useState<(typeof allProducts)[number]["value"] | "">(products[0]?.value ?? "");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [runs, setRuns] = useState<RunResult[]>([]);

  const product = products.find((item) => item.value === productValue) ?? products[0];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() || !product) return;

    setLoading(true);
    setTimeout(() => {
      const status = Math.random() > 0.15 ? "Verified" : "Review";
      setRuns((prev) => [
        { id: crypto.randomUUID(), product: product.label, input: input.trim(), status, time: "just now" },
        ...prev,
      ]);
      toast.success(`${product.label} ${status === "Verified" ? "verified" : "flagged for review"}`);
      setInput("");
      setLoading(false);
    }, 1100);
  };

  return (
    <div>
      <PageHeader title="Run Verification" subtitle="Test Aadhaar, PAN, DL, UAN, Full KYC or DigiLocker instantly." />

      <Can permission="api.view" fallback={<p className="mt-6 text-sm text-muted-foreground">You don't have permission to run verifications yet.</p>}>
        {!product ? (
          <div className="mt-6">
            <EmptyState
              icon={BadgeCheck}
              title="No active services yet"
              description="Request access to a verification service from the Products Catalogue to start running checks."
            />
            <Link to="/console/products" className="light-button mt-4 w-fit">
              Go to Products Catalogue
            </Link>
          </div>
        ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-panel/50 p-6">
            <div className="grid gap-1.5">
              <Label htmlFor="verify-product">Service</Label>
              <Select value={productValue} onValueChange={(value) => setProductValue(value as typeof productValue)}>
                <SelectTrigger id="verify-product"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {products.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 grid gap-1.5">
              <Label htmlFor="verify-input">{product.label} number</Label>
              <Input
                id="verify-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={product.placeholder}
                required
              />
            </div>

            <Button type="submit" className="mt-5 w-full" disabled={loading}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : <product.icon className="size-4" />}
              {loading ? "Verifying…" : "Run Verification"}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Sandbox mode — this consumes no real API credits and returns mock results.
            </p>
          </form>

          <div className="dashboard-activity">
            <span className="font-display text-sm font-semibold">Recent runs</span>
            {runs.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">Your verification results will appear here.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {runs.map((run) => (
                  <div key={run.id} className="transaction-row">
                    <span className="transaction-avatar">{run.product.slice(0, 1)}</span>
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate">{run.product}</strong>
                      <small style={{ color: "var(--muted-foreground)" }}>{run.input}</small>
                    </span>
                    <StatusBadge status={run.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        )}
      </Can>
    </div>
  );
}
