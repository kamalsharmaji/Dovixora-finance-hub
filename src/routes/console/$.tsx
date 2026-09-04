import { createFileRoute } from "@tanstack/react-router";

import { ConsolePlaceholder } from "@/components/console/console-placeholder";

export const Route = createFileRoute("/console/$")({
  component: ConsoleCatchAll,
});

function titleFromSplat(splat: string | undefined) {
  if (!splat) return "Console";
  return splat
    .split("/")
    .filter(Boolean)
    .map((segment) => segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()))
    .join(" / ");
}

function ConsoleCatchAll() {
  const { _splat } = Route.useParams();
  return <ConsolePlaceholder title={titleFromSplat(_splat)} />;
}
