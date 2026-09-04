import { Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";

interface ConsolePlaceholderProps {
  title: string;
}

function ConsolePlaceholder({ title }: ConsolePlaceholderProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-panel/40 px-6 py-24 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <Construction className="size-5" />
      </span>
      <h1 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h1>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        This section is planned in the console blueprint and will be built in an upcoming phase.
      </p>
      <Link to="/console" className="mt-6 text-sm font-semibold text-emerald-bright hover:underline">
        Back to Overview
      </Link>
    </div>
  );
}

export { ConsolePlaceholder };
