import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface BlogFilterProps {
  query: string;
  onQueryChange: (value: string) => void;
  categories: readonly string[];
  activeCategory: string;
  onCategoryChange: (value: string) => void;
}

function BlogFilter({ query, onQueryChange, categories, activeCategory, onCategoryChange }: BlogFilterProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-panel/60 p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search articles…"
          aria-label="Search articles"
          className="h-11 rounded-full border-line bg-background pl-11 pr-4 text-sm shadow-none"
        />
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 font-display text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "border-emerald/30 bg-emerald/10 text-emerald-bright shadow-sm"
                  : "border-line text-muted-foreground hover:border-emerald/20 hover:bg-emerald/5 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { BlogFilter };
