import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, KeyRound, Laptop, Smartphone } from "lucide-react";
import { toast } from "sonner";

import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/console/page-header";
import { StatusBadge } from "@/components/console/status-badge";

export const Route = createFileRoute("/console/security")({
  head: () => ({ meta: [{ title: "Security Center — DOVIXORA Console" }] }),
  component: SecurityPage,
});

const sessions = [
  { device: "Chrome on macOS", icon: Laptop, ip: "103.21.244.10", location: "Bengaluru, IN", lastActive: "Active now", current: true },
  { device: "DOVIXORA iOS App", icon: Smartphone, ip: "49.207.11.88", location: "Bengaluru, IN", lastActive: "3 hrs ago", current: false },
  { device: "Edge on Windows", icon: Laptop, ip: "182.75.10.4", location: "Jaipur, IN", lastActive: "2 days ago", current: false },
];

const loginHistory = [
  { time: "Sep 2, 2026 · 09:14", ip: "103.21.244.10", device: "Chrome on macOS", status: "Success" },
  { time: "Sep 1, 2026 · 19:42", ip: "49.207.11.88", device: "DOVIXORA iOS App", status: "Success" },
  { time: "Aug 30, 2026 · 02:07", ip: "91.208.132.9", device: "Unknown device", status: "Blocked" },
];

const apiKeyActivity = [
  { key: "sk_live_••••8f21", action: "Used for verification call", time: "4 min ago" },
  { key: "sk_test_••••11ac", action: "Created", time: "Yesterday" },
  { key: "sk_live_••••90bd", action: "Revoked", time: "5 days ago" },
];

function SecurityPage() {
  const [twoFactor, setTwoFactor] = useState(false);

  const handlePasswordChange = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Password updated");
    event.currentTarget.reset();
  };

  return (
    <div>
      <PageHeader title="Security Center" subtitle="Sessions, login history, and account protection." />

      <div className="mt-6 rounded-2xl border border-warning/30 bg-warning/5 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" />
          <p className="text-sm text-foreground">
            A blocked login attempt from an unrecognized device was detected on Aug 30, 2026. If this wasn't you, change your password.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="dashboard-activity">
          <span className="font-display text-sm font-semibold">Active sessions</span>
          <div className="mt-4 space-y-3">
            {sessions.map((session) => (
              <div key={session.device + session.ip} className="flex items-center gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                  <session.icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {session.device} {session.current && <span className="text-emerald-bright">(this device)</span>}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{session.ip} · {session.location} · {session.lastActive}</p>
                </div>
                {!session.current && (
                  <button
                    type="button"
                    onClick={() => toast.success("Session revoked")}
                    className="shrink-0 text-xs font-medium text-error hover:underline"
                  >
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-activity">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold">Two-factor authentication</span>
            <Switch checked={twoFactor} onCheckedChange={(checked) => { setTwoFactor(checked); toast.success(checked ? "2FA enabled" : "2FA disabled"); }} />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Require a one-time code from an authenticator app in addition to your password.
          </p>

          <form className="mt-6 grid gap-3 border-t border-line pt-6" onSubmit={handlePasswordChange}>
            <span className="font-display text-sm font-semibold">Change password</span>
            <div className="grid gap-1.5">
              <Label htmlFor="current-password">Current password</Label>
              <PasswordInput id="current-password" autoComplete="current-password" required />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="new-password">New password</Label>
              <PasswordInput id="new-password" autoComplete="new-password" required />
            </div>
            <Button type="submit" className="mt-1 w-fit">Update password</Button>
          </form>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="dashboard-activity">
          <span className="font-display text-sm font-semibold">Login history</span>
          <div className="mt-4 space-y-3">
            {loginHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between gap-3 border-b border-line pb-3 text-xs last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-foreground">{entry.time}</p>
                  <p className="mt-0.5 text-muted-foreground">{entry.device} · {entry.ip}</p>
                </div>
                <StatusBadge status={entry.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-activity">
          <span className="font-display text-sm font-semibold">API key activity</span>
          <div className="mt-4 space-y-3">
            {apiKeyActivity.map((entry, index) => (
              <div key={index} className="flex items-center gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-foreground">
                  <KeyRound className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-mono text-foreground">{entry.key}</p>
                  <p className="text-xs text-muted-foreground">{entry.action}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
