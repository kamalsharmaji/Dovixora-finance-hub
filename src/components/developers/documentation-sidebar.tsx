export interface DocSection {
  heading: string;
  items: readonly string[];
}

interface DocumentationSidebarProps {
  sections: readonly DocSection[];
  activeItem?: string;
}

function DocumentationSidebar({ sections, activeItem }: DocumentationSidebarProps) {
  return (
    <nav aria-label="Documentation" className="lg:sticky lg:top-24">
      <div className="grid gap-6">
        {sections.map((section) => (
          <div key={section.heading}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
              {section.heading}
            </h3>
            <ul className="mt-3 grid gap-1 border-l border-line pl-3">
              {section.items.map((item) => {
                const isActive = item === activeItem;
                return (
                  <li key={item}>
                    <span
                      className={
                        isActive
                          ? "-ml-[13px] block border-l-2 border-blue pl-3 font-display text-sm font-semibold text-foreground"
                          : "block font-display text-sm text-muted-foreground"
                      }
                    >
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

export { DocumentationSidebar };
