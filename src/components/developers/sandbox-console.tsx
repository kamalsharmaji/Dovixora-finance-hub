import { useState } from "react";
import { Check, Copy, KeyRound, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";

const SANDBOX_KEY = "sk_test_51JXk2mQpZ9vLwR3n";
const MASKED_KEY = "sk_test_••••••••••••";

const requestBody = `{
  "pan_number": "ABCPX1234K",
  "consent": true
}`;

const responseBody = `{
  "id": "ver_test_9X82",
  "status": "verified"
}`;

const testData = [
  { label: "Customers", value: "12,840" },
  { label: "Verifications", value: "84,290" },
  { label: "PAN Checks", value: "9,430" },
];

function SandboxConsole() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleCopy = () => {
    try {
      navigator.clipboard?.writeText(SANDBOX_KEY).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    } catch {
      // Clipboard unavailable — no-op, sandbox is UI-only.
    }
  };

  const handleSend = () => {
    setStatus("loading");
    setTimeout(() => setStatus("done"), 650);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="grid gap-4">
        <div className="dashboard-shell">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-display text-sm font-semibold">
              <KeyRound className="size-4 text-blue" /> API Keys
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-line bg-background/40 px-3 py-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Sandbox Key</p>
              <p className="mt-1 font-mono text-sm text-foreground">{MASKED_KEY}</p>
            </div>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={handleCopy}
              aria-label="Copy sandbox key"
            >
              {copied ? <Check className="size-4 text-emerald" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        <div className="dashboard-shell">
          <span className="font-display text-sm font-semibold">Test Data</span>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {testData.map((item) => (
              <div key={item.label} className="dashboard-metric">
                <span>{item.label}</span>
                <strong className="metric-ink">{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="code-window">
          <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
            <div className="mr-2 flex gap-1.5">
              <span className="window-dot window-dot-red" />
              <span className="window-dot window-dot-yellow" />
              <span className="window-dot window-dot-green" />
            </div>
            <span className="font-mono text-xs text-muted-foreground">POST /v1/verify/pan</span>
          </div>
          <pre className="code-content" style={{ minHeight: "auto" }}>
            <code className="syntax-plain">{requestBody}</code>
          </pre>
          <div className="border-t border-line px-4 py-3">
            <Button type="button" size="sm" onClick={handleSend} disabled={status === "loading"}>
              {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              Send Request
            </Button>
          </div>
        </div>

        <div className="code-window" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
            <span className="font-mono text-xs text-muted-foreground">Response</span>
            {status === "done" && (
              <span className="ml-auto rounded bg-emerald/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald">
                200 OK
              </span>
            )}
          </div>
          <pre className="code-content" style={{ minHeight: "auto" }}>
            {status === "done" ? (
              <code className="syntax-plain">{responseBody}</code>
            ) : (
              <code className="syntax-comment">
                {status === "loading" ? "// Sending request…" : "// Send a request to see the response"}
              </code>
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}

export { SandboxConsole };
