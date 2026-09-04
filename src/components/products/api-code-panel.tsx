import { useState } from "react";
import { Check } from "lucide-react";

type SyntaxKind = "keyword" | "string" | "number" | "plain" | "success" | "comment";
export type CodeToken = readonly [SyntaxKind, string];

interface ApiCodePanelProps {
  method: string;
  path: string;
  request: readonly CodeToken[];
  response: readonly CodeToken[];
  status?: string;
}

function ApiCodePanel({ method, path, request, response, status = "200 OK" }: ApiCodePanelProps) {
  const [tab, setTab] = useState<"Request" | "Response">("Request");
  const tokens = tab === "Request" ? request : response;

  return (
    <div className="code-window glow-panel">
      <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
        <div className="mr-2 flex gap-1.5">
          <span className="window-dot window-dot-red" />
          <span className="window-dot window-dot-yellow" />
          <span className="window-dot window-dot-green" />
        </div>
        <span className="mr-auto truncate font-mono text-xs text-muted-foreground">
          {method} {path}
        </span>
        {(["Request", "Response"] as const).map((label) => (
          <button
            type="button"
            key={label}
            onClick={() => setTab(label)}
            className={`code-tab ${tab === label ? "code-tab-active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>
      <pre className="code-content">
        <code>
          {tokens.map(([kind, text], index) => (
            <span key={`${kind}-${index}`} className={`syntax-${kind}`}>
              {text}
            </span>
          ))}
        </code>
      </pre>
      <div className="flex items-center gap-2 border-t border-line px-5 py-3 font-mono text-xs">
        <Check className="size-3.5 text-emerald" />
        <span className="text-muted-foreground">Request successful</span>
        <span className="ml-auto rounded bg-emerald/15 px-2 py-0.5 font-semibold text-emerald">{status}</span>
      </div>
    </div>
  );
}

export { ApiCodePanel };
