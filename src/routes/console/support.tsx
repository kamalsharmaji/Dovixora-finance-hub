import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, MessageCircleQuestion, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Can, useCan } from "@/components/console/permission-gate";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/support")({
  head: () => ({ meta: [{ title: "Support — DOVIXORA Console" }] }),
  component: SupportPage,
});

interface Ticket {
  id: string;
  subject: string;
  org: string;
  priority: "Low" | "Normal" | "High";
  status: "Open" | "Pending" | "Resolved";
  updated: string;
}

const seedTickets: Ticket[] = [
  { id: "TCK-1042", subject: "Webhook delivery failing intermittently", org: "Kite Markets", priority: "High", status: "Open", updated: "12 min ago" },
  { id: "TCK-1041", subject: "Need higher rate limit for launch", org: "Atlas Studio", priority: "Normal", status: "Pending", updated: "2 hrs ago" },
  { id: "TCK-1038", subject: "Invoice shows incorrect GST", org: "Meridian Pay", priority: "Low", status: "Open", updated: "Yesterday" },
  { id: "TCK-1030", subject: "How do I rotate an API key?", org: "Solstice Labs", priority: "Low", status: "Resolved", updated: "3 days ago" },
];

const customerIssues = [
  { org: "Vantage Corp", issue: "Repeated 500 errors on Aadhaar endpoint", severity: "Critical", opened: "1 hr ago" },
  { org: "Nova Health", issue: "KYC review taking longer than SLA", severity: "Warning", opened: "5 hrs ago" },
];

const knowledgeBase = [
  { title: "Getting started with the DOVIXORA API", category: "Onboarding" },
  { title: "Rotating and revoking API keys", category: "Security" },
  { title: "Understanding webhook signatures", category: "Developer" },
  { title: "Reading your monthly invoice", category: "Billing" },
];

function SupportPage() {
  const canManage = useCan("support.manage");
  const [tickets, setTickets] = useState(seedTickets);

  const resolve = (id: string) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: "Resolved" } : t)));
    toast.success(`${id} marked resolved`);
  };

  const ticketList = (
    <div className="rounded-2xl border border-line bg-panel/40 p-1">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="flex flex-wrap items-center gap-3 border-b border-line p-4 last:border-0">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{ticket.subject}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{ticket.id} · {ticket.org} · {ticket.updated}</p>
          </div>
          <StatusBadge status={ticket.priority} tone={ticket.priority === "High" ? "critical" : ticket.priority === "Normal" ? "warn" : "neutral"} />
          <StatusBadge status={ticket.status} tone={ticket.status === "Resolved" ? "good" : ticket.status === "Open" ? "warn" : "neutral"} />
          <Can permission="support.manage">
            {ticket.status !== "Resolved" && (
              <Button size="sm" variant="outline" onClick={() => resolve(ticket.id)}>Resolve</Button>
            )}
          </Can>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Support"
        subtitle={canManage ? "Every ticket across the platform, plus flagged customer issues." : "Get help or track your open tickets."}
        actions={
          <Button onClick={() => toast("New ticket form isn't wired to a backend yet.")}>
            <Plus className="size-4" /> New Ticket
          </Button>
        }
      />

      {canManage ? (
        <Tabs defaultValue="tickets" className="mt-6">
          <TabsList>
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="issues">Customer Issues</TabsTrigger>
            <TabsTrigger value="kb">Knowledge Base</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="mt-4">{ticketList}</TabsContent>

          <TabsContent value="issues" className="mt-4">
            <div className="grid gap-3">
              {customerIssues.map((issue, index) => (
                <div key={index} className="flex items-start gap-3 rounded-2xl border border-line bg-panel p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                    <MessageCircleQuestion className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{issue.org}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{issue.issue} · {issue.opened}</p>
                  </div>
                  <StatusBadge status={issue.severity} tone={issue.severity === "Critical" ? "critical" : "warn"} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="kb" className="mt-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {knowledgeBase.map((article) => (
                <div key={article.title} className="flex items-start gap-3 rounded-2xl border border-line bg-panel p-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                    <BookOpen className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{article.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{article.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="mt-6">{ticketList}</div>
      )}
    </div>
  );
}
