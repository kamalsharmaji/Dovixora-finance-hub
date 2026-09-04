import { useNavigate } from "@tanstack/react-router";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { getConsoleNav } from "@/components/console/console-nav";
import { hasPermission } from "@/lib/permissions";
import type { ConsoleRole } from "@/lib/session";

interface ConsoleCommandPaletteProps {
  role: ConsoleRole;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function ConsoleCommandPalette({ role, open, onOpenChange }: ConsoleCommandPaletteProps) {
  const navigate = useNavigate();
  const groups = getConsoleNav(role).map((group) => ({
    ...group,
    items: group.items.filter((item) => !item.permission || hasPermission(role, item.permission)),
  }));

  const go = (to: string) => {
    onOpenChange(false);
    if (to !== "/console" && to.startsWith("/console/")) {
      navigate({ to: "/console/$", params: { _splat: to.slice("/console/".length) } });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- config-driven path, not a literal known ahead of time
      navigate({ to: to as any });
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search anything…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map((group, index) => (
          <CommandGroup key={group.heading ?? `group-${index}`} heading={group.heading}>
            {group.items.map((item) => (
              <CommandItem key={`${item.label}-${item.to}`} onSelect={() => go(item.to)}>
                <item.icon /> {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}

export { ConsoleCommandPalette };
