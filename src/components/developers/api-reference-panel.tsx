import { ApiCodePanel, type CodeToken } from "@/components/products/api-code-panel";
import { methodBadgeClass, type ApiMethod } from "@/components/developers/api-endpoint-list";

interface ParamRow {
  name: string;
  detail: string;
}

interface BodyRow {
  name: string;
  type: string;
  required?: boolean;
}

export interface EndpointDetail {
  id: string;
  method: ApiMethod;
  path: string;
  description: string;
  parameters: readonly ParamRow[];
  body?: readonly BodyRow[];
  request: readonly CodeToken[];
  response: readonly CodeToken[];
}

interface ApiReferencePanelProps {
  endpoint: EndpointDetail;
}

function ApiReferencePanel({ endpoint }: ApiReferencePanelProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded border px-2 py-1 font-mono text-xs font-semibold uppercase ${methodBadgeClass[endpoint.method]}`}
        >
          {endpoint.method}
        </span>
        <code className="font-mono text-lg text-foreground">{endpoint.path}</code>
      </div>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{endpoint.description}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
            Request parameters
          </h3>
          <dl className="mt-3 grid gap-3">
            {endpoint.parameters.map((param) => (
              <div key={param.name} className="rounded-lg border border-line bg-panel/50 px-3 py-2.5">
                <dt className="font-mono text-sm text-cyan">{param.name}</dt>
                <dd className="mt-0.5 text-xs text-muted-foreground">{param.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        {endpoint.body && endpoint.body.length > 0 && (
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
              Request body
            </h3>
            <dl className="mt-3 grid gap-3">
              {endpoint.body.map((field) => (
                <div key={field.name} className="rounded-lg border border-line bg-panel/50 px-3 py-2.5">
                  <dt className="flex items-center gap-2 font-mono text-sm text-cyan">
                    {field.name}
                    {field.required && (
                      <span className="rounded bg-blue/15 px-1.5 py-0.5 font-mono text-[9px] uppercase text-blue">
                        Required
                      </span>
                    )}
                  </dt>
                  <dd className="mt-0.5 text-xs text-muted-foreground">{field.type}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <div className="mt-8">
        <ApiCodePanel method={endpoint.method} path={endpoint.path} request={endpoint.request} response={endpoint.response} />
      </div>
    </div>
  );
}

export { ApiReferencePanel };
