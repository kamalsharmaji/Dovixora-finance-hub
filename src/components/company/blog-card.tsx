import { Building2, Clock, Code2, CreditCard, Package, ShieldCheck, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export interface BlogPost {
  category: "Engineering" | "Product" | "Payments" | "Security" | "Company";
  title: string;
  description: string;
  author: string;
  readingTime: string;
  date: string;
  featured?: boolean;
}

export const categoryMeta: Record<BlogPost["category"], { icon: LucideIcon }> = {
  Engineering: { icon: Code2 },
  Product: { icon: Package },
  Payments: { icon: CreditCard },
  Security: { icon: ShieldCheck },
  Company: { icon: Building2 },
};

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

interface BlogCardProps {
  post: BlogPost;
}

function BlogCard({ post }: BlogCardProps) {
  const Icon = categoryMeta[post.category].icon;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald/25 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <span className="grid size-10 place-items-center rounded-xl bg-muted text-foreground transition-colors duration-300 group-hover:bg-emerald/10 group-hover:text-emerald-bright">
          <Icon className="size-5" />
        </span>
        <Badge variant="outline" className="border-emerald/25 bg-emerald/10 text-emerald-bright">
          {post.category}
        </Badge>
      </div>

      <h3 className="mt-5 font-display text-lg font-bold leading-snug text-foreground">{post.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.description}</p>

      <div className="mt-6 flex items-center gap-2.5 border-t border-line pt-4 text-xs text-muted-foreground">
        <span className="grid size-6 place-items-center rounded-full bg-muted font-mono text-[10px] font-semibold text-foreground">
          {getInitials(post.author)}
        </span>
        <span className="font-medium text-foreground">{post.author}</span>
        <span aria-hidden="true">·</span>
        <span>{post.date}</span>
        <span className="ml-auto flex items-center gap-1">
          <Clock className="size-3.5" /> {post.readingTime}
        </span>
      </div>
    </article>
  );
}

export { BlogCard };
