import { createFileRoute } from "@tanstack/react-router";

import { ConsoleShellContent } from "@/components/console/console-shell";
import { EnvironmentProvider } from "@/components/console/environment-context";
import { ConsoleSessionProvider } from "@/components/console/session-context";

export const Route = createFileRoute("/console")({
  component: ConsoleLayout,
});

function ConsoleLayout() {
  return (
    <ConsoleSessionProvider>
      <EnvironmentProvider>
        <ConsoleShellContent />
      </EnvironmentProvider>
    </ConsoleSessionProvider>
  );
}
