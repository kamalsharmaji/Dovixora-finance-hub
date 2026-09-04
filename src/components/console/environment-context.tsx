import { createContext, useContext, useState, type ReactNode } from "react";

type Environment = "sandbox" | "production";

interface EnvironmentContextValue {
  environment: Environment;
  setEnvironment: (env: Environment) => void;
}

const EnvironmentContext = createContext<EnvironmentContextValue | null>(null);

/** Live vs. Sandbox — mirrors the environment already attached to every API key
 * (see developer/keys.tsx), scoped to the current browser tab only (no persistence). */
function EnvironmentProvider({ children }: { children: ReactNode }) {
  const [environment, setEnvironment] = useState<Environment>("production");
  return <EnvironmentContext.Provider value={{ environment, setEnvironment }}>{children}</EnvironmentContext.Provider>;
}

function useEnvironment() {
  const ctx = useContext(EnvironmentContext);
  if (!ctx) throw new Error("useEnvironment must be used within EnvironmentProvider");
  return ctx;
}

export { EnvironmentProvider, useEnvironment };
export type { Environment };
