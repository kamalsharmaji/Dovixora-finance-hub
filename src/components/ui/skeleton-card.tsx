import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  lines?: number;
}

function SkeletonCard({ className, lines = 3 }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-2xl border border-line bg-panel/50 p-6", className)} aria-hidden="true">
      <Skeleton className="size-9 rounded-md bg-foreground/8" />
      <Skeleton className="mt-5 h-4 w-2/3 bg-foreground/8" />
      <div className="mt-3 grid gap-2">
        {Array.from({ length: lines }, (_, index) => (
          <Skeleton key={index} className="h-3 w-full bg-foreground/8" />
        ))}
      </div>
    </div>
  );
}

export { SkeletonCard };
