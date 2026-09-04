import { useState, type FormEvent } from "react";
import { Plus, Webhook } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Can } from "@/components/console/permission-gate";
import { StatusBadge } from "@/components/console/status-badge";

interface Endpoint {
  id: string;
  url: string;
  events: string[];
  status: "Active" | "Failing";
}

const seedEndpoints: Endpoint[] = [
  { id: "wh1", url: "https://api.atlasstudio.io/webhooks/dovixora", events: ["verification.completed", "payment.success"], status: "Active" },
  { id: "wh2", url: "https://staging.atlasstudio.io/hooks", events: ["verification.completed"], status: "Failing" },
];

const deliveryLog = [
  { event: "verification.completed", target: "https://api.atlasstudio.io/…", status: "Delivered", time: "4 min ago" },
  { event: "payment.success", target: "https://api.atlasstudio.io/…", status: "Delivered", time: "1 hr ago" },
  { event: "verification.completed", target: "https://staging.atlasstudio.io/…", status: "Failed", time: "3 hrs ago" },
];

function WebhooksPanel() {
  const [endpoints, setEndpoints] = useState(seedEndpoints);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const addEndpoint = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url.trim()) return;
    setEndpoints((prev) => [...prev, { id: crypto.randomUUID(), url: url.trim(), events: ["verification.completed"], status: "Active" }]);
    toast.success("Webhook endpoint added");
    setUrl("");
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-semibold text-foreground">Endpoints</span>
        <Can permission="apikey.create">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="size-3.5" /> Add Endpoint</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a webhook endpoint</DialogTitle>
                <DialogDescription>We'll POST signed events to this URL.</DialogDescription>
              </DialogHeader>
              <form className="grid gap-4" onSubmit={addEndpoint}>
                <div className="grid gap-1.5">
                  <Label htmlFor="webhook-url">Endpoint URL</Label>
                  <Input id="webhook-url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://your-app.com/webhooks/dovixora" required />
                </div>
                <DialogFooter>
                  <Button type="submit">Add Endpoint</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </Can>
      </div>

      <div className="mt-3 grid gap-3">
        {endpoints.map((endpoint) => (
          <div key={endpoint.id} className="rounded-2xl border border-line bg-panel p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                  <Webhook className="size-4" />
                </span>
                <code className="text-xs text-foreground">{endpoint.url}</code>
              </div>
              <StatusBadge status={endpoint.status} />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {endpoint.events.map((event) => (
                <span key={event} className="rounded-full border border-line px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{event}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <span className="font-display text-sm font-semibold text-foreground">Recent deliveries</span>
        <div className="mt-3 rounded-2xl border border-line bg-panel/40 p-1">
          {deliveryLog.map((entry, index) => (
            <div key={index} className="flex items-center gap-3 border-b border-line p-3 last:border-0">
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-xs text-foreground">{entry.event}</p>
                <p className="truncate text-[11px] text-muted-foreground">{entry.target}</p>
              </div>
              <StatusBadge status={entry.status} />
              <span className="shrink-0 text-xs text-muted-foreground">{entry.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { WebhooksPanel };
