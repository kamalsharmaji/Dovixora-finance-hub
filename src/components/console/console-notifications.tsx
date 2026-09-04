import { useState } from "react";
import { Bell, Check } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ConsoleNotification {
  id: string;
  title: string;
  time: string;
  read: boolean;
}

const seedNotifications: ConsoleNotification[] = [
  { id: "n1", title: "Rohit Sen accepted your team invitation", time: "12 min ago", read: false },
  { id: "n2", title: "New API key \"Production backend\" was created", time: "1 hr ago", read: false },
  { id: "n3", title: "Payment of ₹2,999 was successful", time: "Yesterday", read: false },
  { id: "n4", title: "You're at 76% of your monthly API credit limit", time: "2 days ago", read: true },
  { id: "n5", title: "Support ticket #1042 was updated", time: "3 days ago", read: true },
];

function ConsoleNotifications() {
  const [notifications, setNotifications] = useState(seedNotifications);
  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="icon-button relative" aria-label={`Notifications${unread > 0 ? `, ${unread} unread` : ""}`}>
        <Bell className="size-4" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-error font-mono text-[9px] font-bold text-white">
            {unread}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="font-display text-sm font-semibold text-foreground">Notifications</span>
          {unread > 0 && (
            <button type="button" onClick={markAllRead} className="flex items-center gap-1 text-xs text-emerald-bright hover:underline">
              <Check className="size-3" /> Mark all read
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            onClick={() => markRead(notification.id)}
            className="flex items-start gap-2 whitespace-normal py-2.5"
          >
            <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${notification.read ? "bg-transparent" : "bg-emerald-bright"}`} />
            <span className="min-w-0">
              <span className="block text-sm text-foreground">{notification.title}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{notification.time}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { ConsoleNotifications };
