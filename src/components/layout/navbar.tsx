import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { KeyRound, Menu } from "lucide-react";

import { Container } from "@/components/ui/container";
import { DialogTrigger } from "@/components/ui/dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { GetApiKeyDialog } from "@/components/products/get-api-key-dialog";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NavMegaPanel } from "@/components/layout/nav-mega-panel";
import { navItems } from "@/components/layout/nav-links";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-xl transition-shadow">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          className={`flex shrink-0 items-center gap-2.5 rounded-sm ${focusRing}`}
          aria-label="DOVIXORA home"
        >
          <span className="logo-mark" aria-hidden="true">
            <span>N</span>
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">DOVIXORA</span>
        </Link>

        <NavigationMenu aria-label="Primary" delayDuration={150} className="hidden max-w-none flex-1 justify-center lg:flex">
          <NavigationMenuList className="gap-1">
            {navItems.map((item) =>
              item.children && item.children.length > 0 ? (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger
                    className={`h-9 rounded-lg bg-transparent px-3 text-sm font-medium text-muted-foreground hover:bg-blue/10 hover:text-blue-bright data-[state=open]:bg-blue/10 data-[state=open]:text-blue-bright ${focusRing}`}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavMegaPanel item={item} />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.to}
                      className={`flex h-9 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-blue/10 hover:text-blue-bright ${focusRing}`}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className={`hidden rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-blue-bright sm:block ${focusRing}`}
          >
            Login
          </Link>
          <GetApiKeyDialog
            trigger={
              <DialogTrigger className={`gradient-button !hidden sm:!inline-flex ${focusRing}`}>
                Get API <KeyRound className="size-4" />
              </DialogTrigger>
            }
          />
          <button
            type="button"
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
            className={`icon-button lg:hidden ${focusRing}`}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </Container>

      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}

export { Navbar };
