import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/console/page-header";
import { useConsoleSession } from "@/components/console/session-context";

export const Route = createFileRoute("/console/settings")({
  head: () => ({ meta: [{ title: "Settings — DOVIXORA Console" }] }),
  component: SettingsPage,
});

const notificationEvents = [
  { label: "Product updates", description: "New features and platform announcements." },
  { label: "Security alerts", description: "Suspicious sign-ins and password changes." },
  { label: "Billing emails", description: "Invoices, receipts and payment failures." },
  { label: "Weekly usage digest", description: "A summary of your API activity every Monday." },
];

function SettingsPage() {
  const { session } = useConsoleSession();
  const showOrgTab = session.role === "business_owner";

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your profile, notifications and organization details." />

      <Tabs defaultValue="profile" className="mt-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {showOrgTab && <TabsTrigger value="organization">Organization</TabsTrigger>}
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <div className="max-w-lg rounded-2xl border border-line bg-panel p-5">
            <div className="flex items-center gap-3">
              <span className="grid size-14 place-items-center rounded-full bg-muted font-mono text-lg font-semibold text-foreground">
                {session.name.split(" ").map((p) => p[0]).join("")}
              </span>
              <div>
                <p className="font-display text-sm font-bold text-foreground">{session.name}</p>
                <p className="text-xs text-muted-foreground">{session.orgName}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="profile-name">Full name</Label>
                <Input id="profile-name" defaultValue={session.name} />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="profile-email">Email</Label>
                <Input id="profile-email" type="email" defaultValue={session.email} />
              </div>
              <Button type="button" className="w-fit" onClick={() => toast.success("Profile updated")}>Save changes</Button>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl border border-line p-3.5">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Sessions, login history &amp; two-factor authentication</span>
              </div>
              <Link to="/console/security" className="flex items-center gap-1 text-xs font-semibold text-emerald-bright hover:underline">
                Security Center <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <div className="max-w-lg grid gap-3">
            {notificationEvents.map((event) => (
              <div key={event.label} className="flex items-center justify-between rounded-2xl border border-line bg-panel p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{event.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{event.description}</p>
                </div>
                <Switch defaultChecked onCheckedChange={() => toast.success("Notification preference updated")} />
              </div>
            ))}
          </div>
        </TabsContent>

        {showOrgTab && (
          <TabsContent value="organization" className="mt-4">
            <div className="max-w-lg rounded-2xl border border-line bg-panel p-5">
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="org-name">Organization name</Label>
                  <Input id="org-name" defaultValue={session.orgName} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="org-domain">Primary domain</Label>
                  <Input id="org-domain" defaultValue={session.email.split("@")[1]} />
                </div>
                <Button type="button" className="w-fit" onClick={() => toast.success("Organization profile updated")}>Save changes</Button>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
