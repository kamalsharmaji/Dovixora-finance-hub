import { createFileRoute } from "@tanstack/react-router";
import { FlaskConical, KeyRound, Package, Send } from "lucide-react";

import { Container } from "@/components/ui/container";
import type { CodeToken } from "@/components/products/api-code-panel";
import { DocumentationSidebar, type DocSection } from "@/components/developers/documentation-sidebar";

export const Route = createFileRoute("/_marketing/developers/documentation")({
  head: () => ({
    meta: [
      { title: "Documentation — DOVIXORA" },
      { name: "description", content: "Everything you need to build with DOVIXORA." },
    ],
  }),
  component: DocumentationPage,
});

const sidebarSections: readonly DocSection[] = [
  { heading: "Getting Started", items: ["Introduction", "Authentication", "Making your first API call"] },
  { heading: "Core Products", items: ["Aadhaar Verification", "PAN Verification", "Driving Licence", "UAN Verification", "Full KYC", "DigiLocker"] },
  { heading: "Guides", items: ["Webhooks", "Errors", "Testing"] },
];

const steps = [
  { icon: KeyRound, title: "Create your API key", description: "Grab a sandbox key from your dashboard — no approval required." },
  { icon: Package, title: "Install the SDK", description: "Add the DOVIXORA client to your project with npm or pnpm." },
  { icon: Send, title: "Make your first request", description: "Call any endpoint from sandbox and see a real response." },
];

const codeLines: readonly CodeToken[] = [
  ["keyword", "const"],
  ["plain", " dovixora = "],
  ["keyword", "new"],
  ["plain", " Dovixora({\n  apiKey: "],
  ["string", '"dv_test_your_api_key"'],
  ["plain", "\n});\n\n"],
  ["keyword", "const"],
  ["plain", " result = "],
  ["keyword", "await"],
  ["plain", " dovixora.verify.aadhaar({\n  aadhaar_number: "],
  ["string", '"XXXX XXXX 1234"'],
  ["plain", ",\n  consent: "],
  ["success", "true"],
  ["plain", "\n});"],
];

function DocumentationPage() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-2xl">
        <span className="section-kicker">Documentation</span>
        <h1 className="section-title mt-3">
          Everything you need to <span className="gradient-text">build with DOVIXORA.</span>
        </h1>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
        <DocumentationSidebar sections={sidebarSections} activeItem="Introduction" />

        <div className="min-w-0 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-foreground">Welcome to DOVIXORA.</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This guide gets you from a fresh account to your first successful API call in a few minutes.
          </p>

          <h3 className="mt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
            Getting Started
          </h3>
          <div className="mt-4 grid gap-3">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4 rounded-xl border border-line bg-panel/50 p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-blue/10 font-mono text-xs font-semibold text-blue">
                  {index + 1}
                </span>
                <div>
                  <p className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
                    <step.icon className="size-4 text-cyan" /> {step.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="code-window mt-6">
            <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
              <span className="window-dot window-dot-red" />
              <span className="window-dot window-dot-yellow" />
              <span className="window-dot window-dot-green" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">quickstart.ts</span>
            </div>
            <pre className="code-content">
              <code>
                {codeLines.map(([kind, text], index) => (
                  <span key={`${kind}-${index}`} className={`syntax-${kind}`}>
                    {text}
                  </span>
                ))}
              </code>
            </pre>
          </div>

          <div className="mt-8 flex gap-3 rounded-xl border border-emerald/30 bg-emerald/5 p-4">
            <FlaskConical className="size-5 shrink-0 text-emerald" />
            <div>
              <p className="font-display text-sm font-semibold text-foreground">Sandbox Mode</p>
              <p className="mt-1 text-sm text-muted-foreground">Test everything safely before going live.</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
