import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/console/status-badge";

interface ApiLogEntry {
  time: string;
  org?: string;
  method: "GET" | "POST";
  path: string;
  status: number;
  latency: string;
}

const platformLogs: ApiLogEntry[] = [
  { time: "10:42:18", org: "Atlas Studio", method: "POST", path: "/v1/verify/aadhaar", status: 200, latency: "182ms" },
  { time: "10:42:11", org: "Kite Markets", method: "POST", path: "/v1/verify/pan", status: 200, latency: "94ms" },
  { time: "10:41:58", org: "Meridian Pay", method: "POST", path: "/v1/verify/business", status: 422, latency: "210ms" },
  { time: "10:41:40", org: "Harbor Fintech", method: "GET", path: "/v1/platform/status", status: 200, latency: "38ms" },
  { time: "10:41:22", org: "Solstice Labs", method: "POST", path: "/v1/verify/full-kyc", status: 401, latency: "76ms" },
  { time: "10:41:05", org: "Nimbus Fintech", method: "POST", path: "/v1/verify/uan", status: 200, latency: "154ms" },
];

const orgLogs: ApiLogEntry[] = [
  { time: "10:42:18", method: "POST", path: "/v1/verify/aadhaar", status: 200, latency: "182ms" },
  { time: "10:38:02", method: "POST", path: "/v1/verify/pan", status: 200, latency: "97ms" },
  { time: "09:55:41", method: "POST", path: "/v1/verify/full-kyc", status: 200, latency: "241ms" },
  { time: "09:12:09", method: "GET", path: "/v1/keys", status: 200, latency: "22ms" },
  { time: "Yesterday", method: "POST", path: "/v1/verify/aadhaar", status: 429, latency: "12ms" },
];

function statusTone(status: number) {
  if (status < 300) return "good" as const;
  if (status < 500) return "warn" as const;
  return "critical" as const;
}

interface ApiLogsTableProps {
  scope: "platform" | "organization";
}

function ApiLogsTable({ scope }: ApiLogsTableProps) {
  const [query, setQuery] = useState("");
  const rows = scope === "platform" ? platformLogs : orgLogs;
  const filtered = rows.filter((row) => `${row.path} ${row.org ?? ""}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="relative max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by path or org…" className="pl-9" />
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-panel/40 p-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              {scope === "platform" && <TableHead>Organization</TableHead>}
              <TableHead>Method</TableHead>
              <TableHead>Path</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Latency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono text-xs text-muted-foreground">{row.time}</TableCell>
                {scope === "platform" && <TableCell className="text-foreground">{row.org}</TableCell>}
                <TableCell className="font-mono text-xs text-muted-foreground">{row.method}</TableCell>
                <TableCell className="font-mono text-xs text-foreground">{row.path}</TableCell>
                <TableCell><StatusBadge status={String(row.status)} tone={statusTone(row.status)} /></TableCell>
                <TableCell className="text-right font-mono text-xs text-muted-foreground">{row.latency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export { ApiLogsTable };
