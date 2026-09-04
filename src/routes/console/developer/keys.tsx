import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, KeyRound, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEnvironment } from "@/components/console/environment-context";
import { Can, PermissionDenied, useCan } from "@/components/console/permission-gate";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/developer/keys")({
  head: () => ({ meta: [{ title: "API Keys — DOVIXORA Console" }] }),
  component: ApiKeysPage,
});

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  environment: "Live" | "Sandbox";
  created: string;
  lastUsed: string;
  status: "Active" | "Revoked";
}

function randomSecret(env: "Live" | "Sandbox") {
  const body = Array.from({ length: 24 }, () => "abcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 36)]).join("");
  return `${env === "Live" ? "sk_live" : "sk_test"}_${body}`;
}

const seedKeys: ApiKey[] = [
  { id: "k1", name: "Production backend", prefix: "sk_live_••••8f21", environment: "Live", created: "Jan 14, 2026", lastUsed: "4 min ago", status: "Active" },
  { id: "k2", name: "Staging", prefix: "sk_test_••••11ac", environment: "Sandbox", created: "Mar 02, 2026", lastUsed: "Yesterday", status: "Active" },
  { id: "k3", name: "Old mobile build", prefix: "sk_live_••••90bd", environment: "Live", created: "Sep 18, 2025", lastUsed: "5 days ago", status: "Revoked" },
];

function ApiKeysPage() {
  const canView = useCan("apikey.view");
  const { environment } = useEnvironment();
  const [keys, setKeys] = useState(seedKeys);
  const [open, setOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", environment: "Sandbox" as "Live" | "Sandbox" });
  const [revealSecret, setRevealSecret] = useState<string | null>(null);

  if (!canView) return <PermissionDenied requiredPermission="apikey.view" />;

  const visibleKeys = keys.filter((key) => key.environment === (environment === "sandbox" ? "Sandbox" : "Live"));

  const handleGenerate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim()) return;

    const secret = randomSecret(form.environment);
    setKeys((prev) => [
      { id: crypto.randomUUID(), name: form.name.trim(), prefix: `${secret.slice(0, 12)}••••${secret.slice(-4)}`, environment: form.environment, created: "Just now", lastUsed: "Never", status: "Active" },
      ...prev,
    ]);
    setRevealSecret(secret);
    setForm({ name: "", environment: "Sandbox" });
    setOpen(false);
  };

  const revoke = (id: string, name: string) => {
    setKeys((prev) => prev.map((key) => (key.id === id ? { ...key, status: "Revoked" } : key)));
    toast.success(`${name} revoked`);
  };

  const copy = (id: string, value: string) => {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId((current) => (current === id ? null : current)), 1500);
  };

  return (
    <div>
      <PageHeader
        title="API Keys"
        subtitle={`Showing ${environment === "sandbox" ? "Sandbox" : "Live"} keys — switch environment from the top bar.`}
        actions={
          <Can permission="apikey.create">
            <Dialog
              open={open}
              onOpenChange={(next) => {
                setOpen(next);
                if (next) setForm((prev) => ({ ...prev, environment: environment === "sandbox" ? "Sandbox" : "Live" }));
              }}
            >
              <DialogTrigger asChild>
                <Button><KeyRound className="size-4" /> Generate API Key</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate an API key</DialogTitle>
                  <DialogDescription>The full secret is shown once — store it somewhere safe.</DialogDescription>
                </DialogHeader>
                <form className="grid gap-4" onSubmit={handleGenerate}>
                  <div className="grid gap-1.5">
                    <Label htmlFor="key-name">Name</Label>
                    <Input id="key-name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Production backend" required />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="key-env">Environment</Label>
                    <Select value={form.environment} onValueChange={(value) => setForm((prev) => ({ ...prev, environment: value as "Live" | "Sandbox" }))}>
                      <SelectTrigger id="key-env"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sandbox">Sandbox</SelectItem>
                        <SelectItem value="Live">Live</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Generate Key</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </Can>
        }
      />

      {revealSecret && (
        <div className="mt-6 rounded-2xl border border-emerald/30 bg-emerald/5 p-4">
          <p className="text-sm font-semibold text-foreground">Copy your key now — you won't see it again.</p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 truncate rounded-lg border border-line bg-background px-3 py-2 font-mono text-xs text-foreground">{revealSecret}</code>
            <Button type="button" size="sm" variant="outline" onClick={() => { navigator.clipboard?.writeText(revealSecret).catch(() => {}); toast.success("Copied to clipboard"); }}>
              <Copy className="size-3.5" /> Copy
            </Button>
            <Button type="button" size="sm" variant="ghost" onClick={() => setRevealSecret(null)}>Dismiss</Button>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-line bg-panel/40 p-1">
        {visibleKeys.length === 0 ? (
          <EmptyState
            icon={KeyRound}
            title={`No ${environment === "sandbox" ? "sandbox" : "live"} keys yet`}
            description="Generate a key to start calling the DOVIXORA API."
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium text-foreground">{key.name}</TableCell>
                  <TableCell>
                    <button type="button" onClick={() => copy(key.id, key.prefix)} className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground">
                      {key.prefix}
                      {copiedId === key.id ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
                    </button>
                  </TableCell>
                  <TableCell><StatusBadge status={key.environment} tone={key.environment === "Live" ? "good" : "neutral"} /></TableCell>
                  <TableCell className="text-muted-foreground">{key.created}</TableCell>
                  <TableCell className="text-muted-foreground">{key.lastUsed}</TableCell>
                  <TableCell><StatusBadge status={key.status} /></TableCell>
                  <TableCell className="text-right">
                    <Can permission="apikey.revoke">
                      {key.status === "Active" ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger className="icon-button ml-auto"><MoreHorizontal className="size-4" /></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-error focus:text-error" onClick={() => revoke(key.id, key.name)}>Revoke</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </Can>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
