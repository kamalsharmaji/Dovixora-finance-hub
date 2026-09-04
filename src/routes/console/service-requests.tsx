import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ClipboardList, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";
import { approveRequest, rejectRequest, useServiceRequests, type RequestStatus } from "@/lib/service-requests-store";

export const Route = createFileRoute("/console/service-requests")({
  head: () => ({ meta: [{ title: "Service Requests — DOVIXORA Console" }] }),
  component: ServiceRequestsPage,
});

const tone: Record<RequestStatus, "good" | "warn" | "critical" | "neutral"> = {
  Pending: "warn",
  "Payment Pending": "warn",
  Active: "good",
  Rejected: "critical",
  Suspended: "critical",
};

function ServiceRequestsPage() {
  const requests = useServiceRequests();
  const [rejectTarget, setRejectTarget] = useState<{ id: string; org: string; product: string } | null>(null);
  const [reason, setReason] = useState("");

  const pending = requests.filter((r) => r.status === "Pending");
  const others = requests.filter((r) => r.status !== "Pending").sort((a, b) => b.id.localeCompare(a.id));

  const approve = (id: string, org: string, product: string) => {
    approveRequest(id);
    toast.success(`${product} approved for ${org} — awaiting their payment`);
  };

  const confirmReject = () => {
    if (!rejectTarget) return;
    rejectRequest(rejectTarget.id, reason.trim() || "Not eligible for this service at this time.");
    toast.success(`${rejectTarget.product} rejected for ${rejectTarget.org}`);
    setRejectTarget(null);
    setReason("");
  };

  return (
    <div>
      <PageHeader title="Service Requests" subtitle="Review and decide on organizations' access requests." />

      <h3 className="mt-6 font-display text-sm font-semibold text-foreground">Pending review ({pending.length})</h3>
      <div className="mt-3 rounded-2xl border border-line bg-panel/40 p-1">
        {pending.length === 0 ? (
          <EmptyState icon={ClipboardList} title="Nothing to review" description="New access requests will show up here." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pending.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium text-foreground">{request.orgName}</TableCell>
                  <TableCell className="text-muted-foreground">{request.productName}</TableCell>
                  <TableCell className="text-muted-foreground">{request.requestedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" onClick={() => approve(request.id, request.orgName, request.productName)}>
                        <Check className="size-3.5" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setRejectTarget({ id: request.id, org: request.orgName, product: request.productName })}
                      >
                        <X className="size-3.5" /> Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <h3 className="mt-8 font-display text-sm font-semibold text-foreground">History</h3>
      <div className="mt-3 rounded-2xl border border-line bg-panel/40 p-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Decided</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {others.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium text-foreground">{request.orgName}</TableCell>
                <TableCell className="text-muted-foreground">{request.productName}</TableCell>
                <TableCell className="text-muted-foreground">{request.requestedAt}</TableCell>
                <TableCell className="text-muted-foreground">{request.decidedAt ?? "—"}</TableCell>
                <TableCell><StatusBadge status={request.status} tone={tone[request.status]} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={rejectTarget !== null} onOpenChange={(open) => !open && setRejectTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject {rejectTarget?.product}</DialogTitle>
            <DialogDescription>{rejectTarget?.org} will see this reason on their dashboard.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-1.5">
            <Label htmlFor="reject-reason">Reason</Label>
            <Textarea
              id="reject-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="e.g. Additional business verification documents required."
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="destructive" onClick={confirmReject}>Reject Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
