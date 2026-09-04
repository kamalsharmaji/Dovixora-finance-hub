import { Link } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";

import { navItems } from "@/components/layout/nav-links";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { GetApiKeyDialog } from "@/components/products/get-api-key-dialog";

interface MobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function MobileMenu({ open, onOpenChange }: MobileMenuProps) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-[88%] flex-col gap-0 border-line bg-panel p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b border-line px-5 py-4 text-left">
          <SheetTitle className="font-display text-base">Menu</SheetTitle>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-2">
          <Accordion type="single" collapsible className="w-full">
            {navItems.map((item) =>
              !item.children || item.children.length === 0 ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={close}
                  className="flex items-center border-b border-line px-2 py-3.5 font-display text-[15px] font-semibold text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
              <AccordionItem key={item.label} value={item.label} className="border-line">
                <AccordionTrigger className="px-2 py-3.5 font-display text-[15px] font-semibold text-foreground hover:no-underline">
                  {item.label}
                </AccordionTrigger>
                <AccordionContent className="px-1 pb-2">
                  <div className="grid gap-1">
                    {(item.children ?? []).map((child) =>
                      child.comingSoon || !child.to ? (
                        <div
                          key={child.label}
                          className="flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 opacity-60"
                        >
                          <span className="text-sm text-muted-foreground">{child.label}</span>
                          <Badge
                            variant="outline"
                            className="shrink-0 border-line px-1.5 py-0 font-mono text-[9px] uppercase tracking-wider text-muted-foreground"
                          >
                            Soon
                          </Badge>
                        </div>
                      ) : (
                        <Link
                          key={child.label}
                          to={child.to}
                          onClick={close}
                          className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      ),
                    )}
                    <Link
                      to={item.to}
                      onClick={close}
                      className="mt-1 rounded-lg px-3 py-2.5 text-sm font-semibold text-cyan transition-colors hover:bg-accent"
                    >
                      View all {item.label.toLowerCase()}
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              ),
            )}
          </Accordion>
        </nav>

        <div className="grid gap-2 border-t border-line px-5 py-4">
          <Link
            to="/login"
            onClick={close}
            className="mobile-nav-link justify-center text-cyan"
          >
            Login
          </Link>
          <GetApiKeyDialog
            trigger={
              <DialogTrigger onClick={close} className="gradient-button justify-center">
                Get API <KeyRound className="size-4" />
              </DialogTrigger>
            }
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export { MobileMenu };
