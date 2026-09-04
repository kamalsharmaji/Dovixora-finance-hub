import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  label?: string;
}

function LoadingSpinner({ className, label }: LoadingSpinnerProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} role="status" aria-live="polite">
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      <span className={label ? undefined : "sr-only"}>{label ?? "Loading"}</span>
    </span>
  );
}

export { LoadingSpinner };
