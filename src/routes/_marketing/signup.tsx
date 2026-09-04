import { useState, type FormEvent } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";

import { AuthLayout } from "@/components/auth/auth-layout";
import { PasswordInput } from "@/components/auth/password-input";
import { getStrength, PasswordStrength } from "@/components/auth/password-strength";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { writeSession } from "@/lib/session";

export const Route = createFileRoute("/_marketing/signup")({
  head: () => ({ meta: [{ title: "Start Building — DOVIXORA" }] }),
  component: SignupPage,
});

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "", confirmPassword: "", terms: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) nextErrors.email = "Work email is required.";
    else if (!EMAIL_PATTERN.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!form.password) nextErrors.password = "Password is required.";
    else if (getStrength(form.password) < 1) nextErrors.password = "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = "Passwords don't match.";
    if (!form.terms) nextErrors.terms = "You must accept the terms to continue.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    setTimeout(() => {
      writeSession({
        name: form.name.trim(),
        email: form.email.trim(),
        role: "business_owner",
        orgName: `${form.name.trim().split(" ")[0]}'s Organization`,
      });
      navigate({ to: "/console" });
    }, 900);
  };

  return (
    <AuthLayout
      eyebrow="START BUILDING"
      tagline="Everything you need to ship verification products."
      benefits={["Start building in minutes", "Production-ready verification APIs", "Secure infrastructure by default", "Developer-first tools"]}
    >
      <>
          <h1 className="font-display text-2xl font-bold text-foreground">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Get sandbox API keys and start building in minutes.</p>

          <form className="mt-8 grid gap-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-1.5">
              <Label htmlFor="signup-name">Name</Label>
              <Input
                id="signup-name"
                autoComplete="name"
                placeholder="Jordan Blake"
                value={form.name}
                onChange={(event) => setForm((f) => ({ ...f, name: event.target.value }))}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "signup-name-error" : undefined}
                className={errors.name ? "border-error focus-visible:ring-error" : undefined}
              />
              {errors.name && (
                <p id="signup-name-error" className="text-xs text-error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="signup-email">Work email</Label>
              <Input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(event) => setForm((f) => ({ ...f, email: event.target.value }))}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "signup-email-error" : undefined}
                className={errors.email ? "border-error focus-visible:ring-error" : undefined}
              />
              {errors.email && (
                <p id="signup-email-error" className="text-xs text-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="signup-password">Password</Label>
              <PasswordInput
                id="signup-password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={form.password}
                onChange={(event) => setForm((f) => ({ ...f, password: event.target.value }))}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "signup-password-error" : undefined}
                className={errors.password ? "border-error focus-visible:ring-error" : undefined}
              />
              <PasswordStrength password={form.password} />
              {errors.password && <p className="text-xs text-error">{errors.password}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="signup-confirm">Confirm password</Label>
              <PasswordInput
                id="signup-confirm"
                autoComplete="new-password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(event) => setForm((f) => ({ ...f, confirmPassword: event.target.value }))}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? "signup-confirm-error" : undefined}
                className={errors.confirmPassword ? "border-error focus-visible:ring-error" : undefined}
              />
              {errors.confirmPassword && (
                <p id="signup-confirm-error" className="text-xs text-error">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-start gap-2.5">
                <Checkbox
                  id="signup-terms"
                  checked={form.terms}
                  onCheckedChange={(value) => setForm((f) => ({ ...f, terms: value === true }))}
                  aria-invalid={Boolean(errors.terms)}
                  className="mt-0.5"
                />
                <Label htmlFor="signup-terms" className="cursor-pointer font-normal leading-relaxed text-muted-foreground">
                  I agree to the Terms of Service and Privacy Policy.
                </Label>
              </div>
              {errors.terms && <p className="mt-1.5 text-xs text-error">{errors.terms}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? <LoadingSpinner label="Creating account…" /> : "Create Account"}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-cyan hover:underline">
              Log in
            </Link>
          </p>
        </>
    </AuthLayout>
  );
}
