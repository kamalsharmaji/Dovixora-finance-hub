import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface ConsoleLinkProps {
  to: string;
  className?: string;
  onClick?: (() => void) | undefined;
  children: ReactNode;
}

/**
 * Most console nav destinations (e.g. "/console/clients") aren't real routes yet —
 * they're absorbed by the "/console/$" catch-all placeholder. TanStack Router's typed
 * `Link` only accepts registered route ids, so this resolves a plain config string to
 * either the real dashboard route or a splat-targeted link, and falls through to a cast
 * for genuine external routes (e.g. "/developers/sandbox").
 */
function ConsoleLink({ to, className, onClick, children }: ConsoleLinkProps) {
  if (to === "/console") {
    return (
      <Link to="/console" className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (to.startsWith("/console/")) {
    const splat = to.slice("/console/".length);
    return (
      <Link to="/console/$" params={{ _splat: splat }} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- config-driven external route, not a literal known ahead of time
    <Link to={to as any} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export { ConsoleLink };
