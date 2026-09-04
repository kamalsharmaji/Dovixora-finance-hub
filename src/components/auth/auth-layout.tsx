import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

interface AuthLayoutProps {
  eyebrow: string;
  tagline: string;
  benefits?: readonly string[];
  children: ReactNode;
}

function AuthLayout({ eyebrow, tagline, benefits, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-2">
      <div className="auth-panel-dark relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="ambient-light ambient-cyan" />
        <Link to="/" className="relative z-10 flex items-center gap-2.5">
          <span className="logo-mark" aria-hidden="true">
            <span>N</span>
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">DOVIXORA</span>
        </Link>
        <div className="relative z-10">
          <span className="eyebrow-pill">{eyebrow}</span>
          <h2 className="mt-6 max-w-sm font-display text-3xl font-bold leading-snug text-foreground">{tagline}</h2>
          {benefits && (
            <ul className="mt-8 grid gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Check className="size-4 shrink-0 text-emerald" /> {benefit}
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="relative z-10 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">
          © 2026 DOVIXORA
        </p>
      </div>

      <div className="flex items-center justify-center px-5 py-16 sm:px-6">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2.5 lg:hidden" aria-label="DOVIXORA home">
            <span className="logo-mark" aria-hidden="true">
              <span>N</span>
            </span>
            <span className="font-display text-lg font-extrabold tracking-tight">DOVIXORA</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}

export { AuthLayout };
