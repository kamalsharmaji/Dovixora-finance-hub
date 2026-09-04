import { ArrowRight, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { categoryMeta, getInitials, type BlogPost } from "@/components/company/blog-card";

interface BlogFeaturedCardProps {
  post: BlogPost;
}

function BlogFeaturedCard({ post }: BlogFeaturedCardProps) {
  const Icon = categoryMeta[post.category].icon;

  return (
    <article className="group grid overflow-hidden rounded-2xl border border-line bg-panel shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:grid-cols-[1.05fr_1fr]">
      <div className="nexora-grid relative flex min-h-[220px] items-center justify-center overflow-hidden bg-emerald/5">
        <div className="ambient-light ambient-cyan !opacity-20" />
        <span className="relative grid size-20 place-items-center rounded-2xl bg-panel text-emerald-bright shadow-sm ring-1 ring-emerald/20 transition-transform duration-300 group-hover:scale-105">
          <Icon className="size-9" />
        </span>
      </div>

      <div className="flex flex-col justify-center p-8 sm:p-10">
        <Badge variant="outline" className="w-fit border-emerald/25 bg-emerald/10 text-emerald-bright">
          {post.category}
        </Badge>
        <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-foreground sm:text-[1.75rem]">
          {post.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{post.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
          <span className="grid size-7 place-items-center rounded-full bg-muted font-mono text-[10px] font-semibold text-foreground">
            {getInitials(post.author)}
          </span>
          <span className="font-medium text-foreground">{post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{post.date}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {post.readingTime}
          </span>
        </div>

        <span className="mt-7 inline-flex w-fit items-center gap-2 font-display text-sm font-semibold text-emerald-bright transition-transform duration-200 group-hover:translate-x-1">
          Read More <ArrowRight className="size-4" />
        </span>
      </div>
    </article>
  );
}

export { BlogFeaturedCard };
