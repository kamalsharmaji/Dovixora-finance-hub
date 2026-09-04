import { Atom, Braces, FileCode, Server, Terminal } from "lucide-react";

import type { SdkData } from "@/components/developers/sdk-card";

export const sdks: readonly SdkData[] = [
  {
    name: "JavaScript",
    icon: Braces,
    description: "The official DOVIXORA client for browser and server JavaScript.",
    installCommand: "npm install @dovixora/sdk",
    pmAltCommand: "pnpm add @dovixora/sdk",
    available: true,
  },
  {
    name: "TypeScript",
    icon: FileCode,
    description: "Fully typed client with autocompletion for every DOVIXORA endpoint.",
    installCommand: "npm install @dovixora/sdk",
    pmAltCommand: "pnpm add @dovixora/sdk",
    available: true,
  },
  {
    name: "Python",
    icon: Terminal,
    description: "A Pythonic client for backend services and data pipelines.",
    installCommand: "pip install dovixora",
    available: false,
  },
  {
    name: "Node.js",
    icon: Server,
    description: "Server-side helpers, webhooks verification and typed models.",
    installCommand: "npm install @dovixora/node",
    pmAltCommand: "pnpm add @dovixora/node",
    available: false,
  },
  {
    name: "React",
    icon: Atom,
    description: "Drop-in hooks and components for embedding DOVIXORA in your UI.",
    installCommand: "npm install @dovixora/react",
    pmAltCommand: "pnpm add @dovixora/react",
    available: false,
  },
];
