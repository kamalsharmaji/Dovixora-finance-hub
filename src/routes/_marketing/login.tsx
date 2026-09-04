import { useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Github } from "lucide-react";

import { AuthLayout } from "@/components/auth/auth-layout";
import { PasswordInput } from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { demoAccounts, roleDescriptions, roleLabels, writeSession, type ConsoleRole } from "@/lib/session";

const demoRoles: readonly ConsoleRole[] = ["super_admin", "admin", "business_owner", "team_member"];

export const Route = createFileRoute("/_marketing/login")({
  head: () => ({ meta: [{ title: "Log in — DOVIXORA" }] }),
  component: LoginPage,
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { email?: string; password?: string } = {};
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!EMAIL_PATTERN.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Password is required.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    setTimeout(() => {
      writeSession(demoAccounts.business_owner);
      navigate({ to: "/console" });
    }, 900);
  };

  const loginAs = (role: ConsoleRole) => {
    writeSession(demoAccounts[role]);
    navigate({ to: "/console" });
  };

  return (
    <AuthLayout
      eyebrow="WELCOME BACK"
      tagline="The verification infrastructure behind modern business."
      benefits={["Aadhaar, PAN, DL, UAN and Full KYC in one API", "Sandbox access in under a minute", "Enterprise-grade security by default"]}
    >
      <>
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Log in to access your DOVIXORA dashboard.</p>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "login-email-error" : undefined}
                className={errors.email ? "border-error focus-visible:ring-error" : undefined}
              />
              {errors.email && (
                <p id="login-email-error" className="text-xs text-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password">Password</Label>
                <button type="button" className="text-xs text-cyan hover:underline">
                  Forgot password?
                </button>
              </div>
              <PasswordInput
                id="login-password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "login-password-error" : undefined}
                className={errors.password ? "border-error focus-visible:ring-error" : undefined}
              />
              {errors.password && (
                <p id="login-password-error" className="text-xs text-error">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <Checkbox id="login-remember" checked={remember} onCheckedChange={(value) => setRemember(value === true)} />
              <Label htmlFor="login-remember" className="cursor-pointer font-normal text-muted-foreground">
                Remember me
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? <LoadingSpinner label="Signing in…" /> : "Sign In"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              or continue with
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button type="button" variant="outline" disabled aria-label="Continue with Google — coming soon">
              <GoogleIcon /> Google
            </Button>
            <Button type="button" variant="outline" disabled aria-label="Continue with GitHub — coming soon">
              <Github className="size-4" /> GitHub
            </Button>
          </div>

          <div className="mt-8 rounded-xl border border-line bg-panel/40 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Preview a role — no backend yet
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {demoRoles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => loginAs(role)}
                  className="rounded-lg border border-line bg-background px-3 py-2.5 text-left transition-colors hover:border-emerald/30 hover:bg-emerald/5"
                >
                  <span className="block text-xs font-semibold text-foreground">{roleLabels[role]}</span>
                  <span className="mt-0.5 block text-[11px] text-muted-foreground">{roleDescriptions[role]}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-cyan hover:underline">
              Start building
            </Link>
          </p>
        </>
    </AuthLayout>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
      />
    </svg>
  );
}
