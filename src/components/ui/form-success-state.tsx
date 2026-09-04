import { CheckCircle2 } from "lucide-react";

interface FormSuccessStateProps {
  title: string;
  description?: string;
}

function FormSuccessState({ title, description }: FormSuccessStateProps) {
  return (
    <div
      className="reveal reveal-visible flex flex-col items-center rounded-xl border border-emerald/30 bg-emerald/5 px-6 py-10 text-center"
      role="status"
    >
      <span className="grid size-12 place-items-center rounded-full bg-emerald/15 text-emerald">
        <CheckCircle2 className="size-6" />
      </span>
      <p className="mt-4 font-display text-lg font-semibold text-foreground">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}

export { FormSuccessState };
