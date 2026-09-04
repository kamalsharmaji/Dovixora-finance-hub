import { useEffect, useState } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { ChevronDown, LogOut, Menu, RefreshCw, Search, Wallet } from "lucide-react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { ConsoleCommandPalette } from "@/components/console/console-command-palette";
import { ConsoleNotifications } from "@/components/console/console-notifications";
import { ConsoleSidebar } from "@/components/console/console-sidebar";
import { useEnvironment, type Environment } from "@/components/console/environment-context";
import { useConsoleSession } from "@/components/console/session-context";
import { roleLabels } from "@/lib/session";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

const orgCredits: Record<Environment, number> = {
  sandbox: 500,
  production: 38240,
};

function ConsoleShellContent() {
  const { session, logout } = useConsoleSession();
  const { environment, setEnvironment } = useEnvironment();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const isCustomer = session.role === "business_owner" || session.role === "team_member";

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && (event.key === "k" || event.key === "/")) {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-line bg-panel/40 lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <Link to="/" className="flex items-center gap-2.5 border-b border-line px-5 py-4">
              <span className="logo-mark" aria-hidden="true">
                <span>N</span>
              </span>
              <span className="font-display text-base font-extrabold tracking-tight">DOVIXORA</span>
            </Link>
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <ConsoleSidebar role={session.role} />
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-line bg-background/90 px-4 backdrop-blur-xl sm:px-6">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="icon-button lg:hidden"
                aria-label="Open navigation"
                aria-haspopup="dialog"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="size-5" />
              </button>
              <span className="hidden font-mono text-xs uppercase tracking-wide text-muted-foreground sm:inline">
                {session.orgName}
              </span>
            </div>

            {isCustomer && (
              <div className="hidden items-center gap-3 lg:flex">
                <div className="flex items-center gap-1.5 rounded-lg border border-line bg-panel/50 px-2.5 py-1.5">
                  <Wallet className="size-3.5 text-emerald-bright" />
                  <div className="leading-tight">
                    <span className="block font-mono text-[9px] uppercase tracking-wide text-muted-foreground">{environment}</span>
                    <span className="block font-mono text-xs font-semibold text-foreground">
                      {orgCredits[environment].toLocaleString()} credits
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label="Refresh balance"
                    onClick={() => toast.success("Balance refreshed")}
                    className="ml-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <RefreshCw className="size-3.5" />
                  </button>
                </div>
                <Link to="/console/billing" className="light-button !px-3 !py-1.5 text-xs">
                  Buy Credits
                </Link>
                <div className="flex items-center rounded-lg border border-line p-0.5 font-mono text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setEnvironment("sandbox")}
                    className={`rounded-md px-2.5 py-1 transition-colors ${environment === "sandbox" ? "bg-muted text-foreground" : "text-muted-foreground"}`}
                  >
                    Sandbox
                  </button>
                  <button
                    type="button"
                    onClick={() => setEnvironment("production")}
                    className={`rounded-md px-2.5 py-1 transition-colors ${environment === "production" ? "bg-emerald text-white" : "text-muted-foreground"}`}
                  >
                    Production
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="hidden max-w-xs flex-1 items-center gap-2 rounded-lg border border-line bg-panel/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-emerald/25 hover:text-foreground md:flex"
            >
              <Search className="size-4 shrink-0" />
              <span className="flex-1 text-left">Search anything…</span>
              <kbd className="rounded border border-line bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">Ctrl /</kbd>
            </button>

            <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              aria-label="Search anything"
              className="icon-button md:hidden"
            >
              <Search className="size-4" />
            </button>
            <ConsoleNotifications />
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-full border border-line px-2 py-1.5 pr-3 text-sm transition-colors hover:bg-muted">
                <span className="grid size-7 place-items-center rounded-full bg-muted font-mono text-[11px] font-semibold text-foreground">
                  {initials(session.name)}
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-xs font-semibold leading-tight text-foreground">{session.name}</span>
                  <span className="block text-[10px] leading-tight text-muted-foreground">
                    {roleLabels[session.role]}
                  </span>
                </span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/console/settings">Profile &amp; Security</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/">Visit DOVIXORA Website ↗</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-error focus:text-error">
                  <LogOut className="size-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">
            <Outlet />
          </main>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[85%] border-line bg-panel p-0 sm:max-w-xs">
          <SheetHeader className="border-b border-line px-5 py-4 text-left">
            <SheetTitle className="font-display text-base">DOVIXORA</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto px-3 py-4">
            <ConsoleSidebar role={session.role} onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <ConsoleCommandPalette role={session.role} open={commandOpen} onOpenChange={setCommandOpen} />
    </div>
  );
}

export { ConsoleShellContent };
