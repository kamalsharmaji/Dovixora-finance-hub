type StatusTone = "good" | "warn" | "critical" | "neutral";

const toneVars: Record<StatusTone, string> = {
  good: "var(--success)",
  warn: "var(--warning)",
  critical: "var(--error)",
  neutral: "var(--muted-foreground)",
};

const toneMap: Record<string, StatusTone> = {
  active: "good",
  verified: "good",
  success: "good",
  paid: "good",
  ok: "good",
  online: "good",
  onboarding: "warn",
  pending: "warn",
  review: "warn",
  warn: "warn",
  degraded: "warn",
  suspended: "critical",
  failed: "critical",
  breach: "critical",
  overdue: "critical",
  offline: "critical",
  invited: "neutral",
  inactive: "neutral",
};

interface StatusBadgeProps {
  status: string;
  tone?: StatusTone;
}

/** Status pill with an explicit dot + text color — `.transaction-row`'s hardcoded CSS
 * color only applies to plain `small`/`b` tags, so this renders its own element instead. */
function StatusBadge({ status, tone }: StatusBadgeProps) {
  const resolved = tone ?? toneMap[status.toLowerCase()] ?? "neutral";
  const color = toneVars[resolved];

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] font-semibold"
      style={{ color, borderColor: `color-mix(in oklab, ${color} 35%, transparent)`, background: `color-mix(in oklab, ${color} 10%, transparent)` }}
    >
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}

export { StatusBadge };
export type { StatusTone };
