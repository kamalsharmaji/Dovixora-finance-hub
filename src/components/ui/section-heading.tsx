import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  kicker?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

function SectionHeading({ kicker, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      {kicker && <span className="section-kicker">{kicker}</span>}
      <h2 className="section-title mt-3">{title}</h2>
      {description && (
        <p className={cn("section-copy", align === "center" && "mx-auto")}>{description}</p>
      )}
    </div>
  );
}

export { SectionHeading };
