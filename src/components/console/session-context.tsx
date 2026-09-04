import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { clearSession, readSession, type ConsoleSession } from "@/lib/session";

interface SessionContextValue {
  session: ConsoleSession;
  logout: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

function ConsoleSessionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [session, setSessionState] = useState<ConsoleSession | null | "loading">("loading");

  useEffect(() => {
    const existing = readSession();
    if (!existing) {
      navigate({ to: "/login" });
      return;
    }
    setSessionState(existing);
  }, [navigate]);

  const logout = () => {
    clearSession();
    navigate({ to: "/login" });
  };

  if (session === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <LoadingSpinner label="Loading your console…" />
      </div>
    );
  }

  if (!session) return null;

  return <SessionContext.Provider value={{ session, logout }}>{children}</SessionContext.Provider>;
}

function useConsoleSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useConsoleSession must be used within ConsoleSessionProvider");
  return ctx;
}

export { ConsoleSessionProvider, useConsoleSession };
