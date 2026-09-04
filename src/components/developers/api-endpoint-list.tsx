export type ApiMethod = "GET" | "POST" | "DELETE";

export interface EndpointSummary {
  id: string;
  method: ApiMethod;
  path: string;
}

export interface EndpointGroup {
  name: string;
  endpoints: readonly EndpointSummary[];
}

export const methodBadgeClass: Record<ApiMethod, string> = {
  POST: "bg-blue/15 text-blue border-blue/30",
  GET: "bg-cyan/15 text-cyan border-cyan/30",
  DELETE: "bg-error/15 text-error border-error/30",
};

interface ApiEndpointListProps {
  groups: readonly EndpointGroup[];
  activeId: string;
  onSelect: (id: string) => void;
}

function ApiEndpointList({ groups, activeId, onSelect }: ApiEndpointListProps) {
  return (
    <nav aria-label="API endpoints" className="lg:sticky lg:top-24">
      <div className="grid gap-6">
        {groups.map((group) => (
          <div key={group.name}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">
              {group.name}
            </h3>
            <ul className="mt-3 grid gap-1">
              {group.endpoints.map((endpoint) => {
                const isActive = endpoint.id === activeId;
                return (
                  <li key={endpoint.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(endpoint.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-colors ${
                        isActive ? "bg-blue/10" : "hover:bg-accent"
                      }`}
                    >
                      <span
                        className={`rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase ${methodBadgeClass[endpoint.method]}`}
                      >
                        {endpoint.method}
                      </span>
                      <span className="truncate font-mono text-xs text-foreground">{endpoint.path}</span>
                    </button>
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

export { ApiEndpointList };
