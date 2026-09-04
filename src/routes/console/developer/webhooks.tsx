import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/console/page-header";
import { WebhooksPanel } from "@/components/console/webhooks-panel";

export const Route = createFileRoute("/console/developer/webhooks")({
  head: () => ({ meta: [{ title: "Webhooks — DOVIXORA Console" }] }),
  component: DeveloperWebhooksPage,
});

function DeveloperWebhooksPage() {
  return (
    <div>
      <PageHeader title="Webhooks" subtitle="Receive signed events the moment something happens." />
      <div className="mt-6">
        <WebhooksPanel />
      </div>
    </div>
  );
}
