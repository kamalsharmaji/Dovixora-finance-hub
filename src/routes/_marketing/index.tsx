import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bell,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  Code2,
  CreditCard,
  FileSearch,
  FileText,
  Fingerprint,
  FolderLock,
  Gauge,
  Headphones,
  KeyRound,
  Landmark,
  LayoutDashboard,
  Layers,
  Lock,
  Network,
  QrCode,
  Radio,
  Server,
  Settings,
  ShieldCheck,
  User,
  Wallet,
  Zap,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ApiCodePanel, type CodeToken } from "@/components/products/api-code-panel";
import { GetApiKeyForm } from "@/components/products/get-api-key-form";
import { MetricCard } from "@/components/products/metric-card";
import { ProductCTA } from "@/components/products/product-cta";
import { ProductFeatureGrid, type ProductCardData } from "@/components/products/product-feature-grid";

export const Route = createFileRoute("/_marketing/")({
  head: () => ({
    meta: [
      { title: "DOVIXORA — Verification Infrastructure for Modern Business" },
      {
        name: "description",
        content:
          "Verify identity, documents, businesses, bank accounts and employment data through one powerful API platform built for modern digital products.",
      },
      { property: "og:title", content: "DOVIXORA — Verification Infrastructure for Modern Business" },
      {
        property: "og:description",
        content:
          "Verify identity, documents, businesses, bank accounts and employment data through one powerful API platform built for modern digital products.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const trustHighlights = [
  { icon: ShieldCheck, title: "Secure & Compliant", detail: "256-bit Encryption" },
  { icon: Zap, title: "Real-time Results", detail: "Avg. < 2 Seconds" },
  { icon: CheckCircle2, title: "Official Data Sources", detail: "Trusted & Reliable" },
  { icon: Headphones, title: "24/7 Support", detail: "Developer First" },
] as const;

const services: readonly ProductCardData[] = [
  {
    icon: QrCode,
    title: "Aadhaar Verification",
    description: "Verify identity using Aadhaar via authorized sources.",
    highlights: ["QR, XML & eAadhaar support", "Masked by default", "Real-time demographic match"],
    to: "/products/aadhaar-verification",
    tone: "blue",
    image: "/Assets/aadhar.png",
    featured: true,
  },
  {
    icon: CreditCard,
    title: "PAN Verification",
    description: "Instant PAN verification with IT Department records.",
    highlights: ["Lite to comprehensive checks", "Aadhaar-linkage status", "Name, DOB & address match"],
    to: "/products/pan-verification",
    tone: "cyan",
    image: "/Assets/Pan.png",
  },
  {
    icon: Car,
    title: "Driving Licence",
    description: "Verify driving licence details and validity.",
    highlights: ["Licence validity & expiry", "Authorized vehicle classes", "Holder & address match"],
    to: "/products/driving-licence-verification",
    tone: "violet",
    image: "/Assets/dl.png",
  },
  {
    icon: Briefcase,
    title: "UAN Verification",
    description: "Validate UAN and employment details via EPFO.",
    highlights: ["UAN resolution", "Complete employer history", "PF contribution recency"],
    to: "/products/uan-verification",
    tone: "blue",
    image: "/Assets/UAN.png",
  },
  {
    icon: BadgeCheck,
    title: "Full KYC",
    description: "Complete KYC verification in a single request.",
    highlights: ["Identity + address + biometric, unified", "Liveness & face-match built in", "CKYC-ready output"],
    to: "/products/full-kyc",
    tone: "cyan",
    image: "/Assets/Fullkyc.png",
  },
  {
    icon: FolderLock,
    title: "DigiLocker",
    description: "Fetch and verify documents from DigiLocker.",
    highlights: ["Consent-based, user-authorized access", "Aadhaar & PAN pull", "Web & mobile SDKs"],
    to: "/products/digilocker-verification",
    tone: "violet",
    image: "/Assets/Dglocker.png",
  },
];

const developerFeatures = [
  { icon: Network, title: "One API. Many Verifications", description: "Integrate once and verify everything." },
  { icon: Zap, title: "Lightning Fast", description: "Get verification results in under 2 seconds." },
  { icon: Code2, title: "Developer Friendly", description: "Simple docs, SDKs and quick sandbox access." },
  { icon: ShieldCheck, title: "Secure & Compliant", description: "256-bit encryption and industry best practices." },
  { icon: Server, title: "Scalable Infrastructure", description: "Built to handle millions of verifications every day." },
  { icon: Wallet, title: "Pay Only for What You Use", description: "Transparent credit-based pricing." },
] as const;

const orbitNodes = [
  { icon: Building2, label: "Business", top: 17.1, left: 31 },
  { icon: User, label: "Individuals", top: 17.1, left: 69 },
  { icon: Lock, label: "Secure", top: 50, left: 12 },
  { icon: Landmark, label: "Banking", top: 50, left: 88 },
  { icon: BarChart3, label: "Analytics", top: 82.9, left: 31 },
  { icon: Layers, label: "Infrastructure", top: 82.9, left: 69 },
] as const;

// Illustrative logos only — DOVIXORA does not claim an official partnership
// or integration with any company named here; this is a visual trust treatment.
const trustedCompanies = [
  { name: "Razorpay", logo: "/Assets/Razorpay.png" },
  { name: "Groww", logo: "/Assets/Groww.png" },
  { name: "CRED", logo: "/Assets/Cred.png" },
  { name: "Meesho", logo: "/Assets/Meesho.png" },
  { name: "MPL", logo: "/Assets/MPL.png" },
  { name: "INDmoney", logo: "/Assets/indmoney.png" },
  { name: "Policybazaar", logo: "/Assets/policybazaar.png" },
];

const responseTokens: readonly CodeToken[] = [
  ["plain", "{\n  "],
  ["keyword", '"success"'],
  ["plain", ": "],
  ["success", "true"],
  ["plain", ",\n  "],
  ["keyword", '"verification_id"'],
  ["plain", ": "],
  ["string", '"ver_PAN_82HD92"'],
  ["plain", ",\n  "],
  ["keyword", '"status"'],
  ["plain", ": "],
  ["string", '"verified"'],
  ["plain", ",\n  "],
  ["keyword", '"data"'],
  ["plain", ": {\n    "],
  ["keyword", '"name"'],
  ["plain", ": "],
  ["string", '"Rahul Sharma"'],
  ["plain", ",\n    "],
  ["keyword", '"pan"'],
  ["plain", ": "],
  ["string", '"ABCDE1234F"'],
  ["plain", ",\n    "],
  ["keyword", '"pan_status"'],
  ["plain", ": "],
  ["string", '"active"'],
  ["plain", "\n  }\n}"],
];

const requestTokensByLanguage: Record<"cURL" | "JavaScript" | "Python" | "PHP", readonly CodeToken[]> = {
  cURL: [
    ["keyword", "curl"],
    ["plain", " -X POST https://api.dovixora.com/v1/verify/pan \\\n  -H "],
    ["string", '"Authorization: Bearer sk_live_***"'],
    ["plain", " \\\n  -H "],
    ["string", '"Content-Type: application/json"'],
    ["plain", " \\\n  -d "],
    ["string", "'{\"pan\": \"ABCDE1234F\", \"consent\": \"Y\"}'"],
  ],
  JavaScript: [
    ["keyword", "const"],
    ["plain", " result = "],
    ["keyword", "await"],
    ["plain", " dovixora.verify.pan({\n  pan: "],
    ["string", '"ABCDE1234F"'],
    ["plain", ",\n  consent: "],
    ["string", '"Y"'],
    ["plain", "\n});"],
  ],
  Python: [
    ["keyword", "result"],
    ["plain", " = dovixora.verify.pan(\n  pan="],
    ["string", '"ABCDE1234F"'],
    ["plain", ",\n  consent="],
    ["string", '"Y"'],
    ["plain", "\n)"],
  ],
  PHP: [
    ["plain", "$result = $dovixora->verify->pan([\n  "],
    ["string", '"pan"'],
    ["plain", " => "],
    ["string", '"ABCDE1234F"'],
    ["plain", ",\n  "],
    ["string", '"consent"'],
    ["plain", " => "],
    ["string", '"Y"'],
    ["plain", "\n]);"],
  ],
};

const metrics = [
  { label: "Verification APIs", value: "100+", tone: "blue" as const },
  { label: "API Reliability", value: "99.9%", tone: "emerald" as const },
  { label: "Avg. Response Time", value: "< 2 sec", tone: "cyan" as const },
  { label: "Verifications Daily", value: "10M+", tone: "ink" as const },
  { label: "Integrations", value: "500+", tone: "blue" as const },
  { label: "Developer Support", value: "24/7", tone: "emerald" as const },
];

function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <VerificationServices />
      <WhyDovixora />
      <ApiSection />
      <GetApiKeySection />
      <ProductCTA
        kicker="Get started"
        title="Start Building with DOVIXORA Today"
        description="No setup fees. No minimum commitments. Just powerful verification APIs."
        primaryLabel="Start Verifying Free"
        primaryTo="/signup"
        secondaryLabel="Talk to Sales"
        secondaryTo="/company/contact"
      />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="ambient-light ambient-violet" />
      <div className="ambient-light ambient-cyan" />
      <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <Reveal>
          <span className="eyebrow-pill">
            <ShieldCheck className="size-3.5" /> Verification Infrastructure
          </span>
          <h1 id="hero-title" className="hero-title mt-6 text-4xl sm:text-5xl lg:text-6xl">
            Verify Everything. Build <span className="gradient-text">Anything.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Verify identity, documents, businesses, bank accounts and employment data through one
            powerful API platform built for modern digital products.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="gradient-button gradient-button-large">
              Start Verifying Free <ArrowRight className="size-4" />
            </Link>
            <Link to="/developers/documentation" className="outline-button">
              Explore API Docs <Code2 className="size-4" />
            </Link>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
            {trustHighlights.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex items-start gap-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-yellow-soft text-yellow-deep">
                  <Icon className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <dt className="font-display text-xs font-semibold text-foreground sm:text-sm">{title}</dt>
                  <dd className="text-[11px] text-muted-foreground sm:text-xs">{detail}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay="delay-2">
          <DashboardPreview />
        </Reveal>
      </Container>
    </section>
  );
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview" },
  { icon: ShieldCheck, label: "Verifications" },
  { icon: Network, label: "API Catalog" },
  { icon: KeyRound, label: "API Keys" },
  { icon: FileText, label: "Logs" },
  { icon: Radio, label: "Webhooks" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Gauge, label: "Usage" },
  { icon: Settings, label: "Settings" },
] as const;

const dashboardMetrics = [
  { label: "Total Verifications", value: "12,842", delta: "+18.2%", tone: "metric-ink" },
  { label: "Completed", value: "11,256", delta: "+16.5%", tone: "metric-emerald" },
  { label: "Success Rate", value: "98.72%", delta: "+2.4%", tone: "metric-cyan" },
  { label: "Failed", value: "156", delta: "-3.1%", tone: "metric-blue" },
] as const;

const recentVerifications = [
  { label: "PAN Verification", status: "Verified", ok: true },
  { label: "Aadhaar Verification", status: "Verified", ok: true },
  { label: "Bank Account Verification", status: "Verified", ok: true },
  { label: "Document Verification", status: "Verified", ok: true },
  { label: "UAN Verification", status: "Failed", ok: false },
] as const;

const quickStats = [
  { icon: Fingerprint, label: "PAN Verifications", value: "4,250" },
  { icon: FileSearch, label: "Document Verifications", value: "3,820" },
  { icon: Landmark, label: "Bank Verifications", value: "2,150" },
  { icon: Briefcase, label: "Employment Verifications", value: "2,622" },
] as const;

const trendValues = [40, 55, 48, 68, 62, 78, 90, 100];
const failedTrendValues = [10, 14, 7, 11, 8, 6, 5, 4];
const trendDays = ["20", "21", "22", "23", "24", "25", "26", "27"];

function buildLinePath(values: readonly number[], width: number, height: number) {
  const step = width / (values.length - 1);
  const points = values.map((value, index) => {
    const x = index * step;
    const y = height - (value / 100) * (height - 8) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return { points, linePath: `M${points.join(" L")}` };
}

function TrendLine({ className }: { className?: string }) {
  const width = 300;
  const height = 64;
  const success = buildLinePath(trendValues, width, height);
  const failed = buildLinePath(failedTrendValues, width, height);
  const areaPath = `${success.linePath} L${width},${height} L0,${height} Z`;

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center gap-3 font-mono text-[9px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-emerald" /> Successful
        </span>
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-destructive" /> Failed
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-16 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--yellow)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--yellow)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#trendFill)" />
        <path d={success.linePath} fill="none" stroke="var(--yellow-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={failed.linePath} fill="none" stroke="var(--error)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
        {success.points.map((point, index) => {
          const [x, y] = point.split(",");
          return <circle key={point} cx={x} cy={y} r={index === trendValues.length - 1 ? 3 : 2} fill="var(--yellow-deep)" />;
        })}
      </svg>
      <div className="mt-1 flex justify-between font-mono text-[7px] text-muted-foreground/70">
        {trendDays.map((day) => (
          <span key={day}>May {day}</span>
        ))}
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div
      className="glow-panel float-slow overflow-hidden rounded-2xl border border-line bg-panel"
      role="img"
      aria-label="DOVIXORA dashboard preview showing verification metrics, trends and recent activity"
    >
      <div className="flex">
        <aside className="hidden w-36 shrink-0 flex-col gap-0.5 bg-charcoal p-3 sm:flex">
          <span className="mb-3 px-1 font-display text-xs font-extrabold tracking-tight text-white">
            DOVIXORA
          </span>
          {sidebarItems.map((item, index) => (
            <span
              key={item.label}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[10px] ${
                index === 0 ? "bg-white/10 text-white" : "text-white/55"
              }`}
            >
              <item.icon className="size-3.5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </span>
          ))}
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-sm font-bold text-foreground">Dashboard</p>
              <p className="text-xs text-muted-foreground">Welcome back, Developer 👋</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-md border border-line text-muted-foreground">
                <Bell className="size-3.5" />
              </span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-yellow-deep font-mono text-[9px] font-bold text-white">
                DV
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {dashboardMetrics.map((metric) => (
              <div key={metric.label} className="dashboard-metric !p-2.5">
                <span className="!text-[9px]">{metric.label}</span>
                <strong className={`${metric.tone} !mt-1 !text-lg`}>{metric.value}</strong>
                <small className="!text-[9px]">{metric.delta}</small>
              </div>
            ))}
          </div>

          <div className="dashboard-chart mt-3 !p-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-semibold">Verification Trends</span>
              <span className="font-mono text-[9px] text-muted-foreground">May 20 – May 27</span>
            </div>
            <TrendLine className="mt-3" />
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="dashboard-activity !p-3">
              <span className="font-display text-xs font-semibold">Recent Verifications</span>
              <div className="mt-2.5 space-y-2">
                {recentVerifications.map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-2">
                    <span className="truncate font-mono text-[10px] text-muted-foreground">{item.label}</span>
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wide ${
                        item.ok ? "bg-emerald/15 text-emerald" : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-activity !p-3">
              <span className="font-display text-xs font-semibold">Quick Stats</span>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-1.5">
                    <stat.icon className="size-3 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="truncate font-mono text-[8px] uppercase tracking-wide text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="font-display text-xs font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustedBy() {
  const loop = [...trustedCompanies, ...trustedCompanies];
  return (
    <section className="border-y border-line py-10" aria-label="Trusted by growing businesses across India">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
        Trusted by growing businesses across India
      </p>
      <div className="marquee mt-7">
        <div className="marquee-track">
          {loop.map((company, index) => (
            <span
              key={`${company.name}-${index}`}
              className="grid size-20 shrink-0 place-items-center rounded-full border border-line bg-panel p-3.5 shadow-sm transition-transform duration-300 hover:scale-110"
              title={company.name}
            >
              <img src={company.logo} alt={company.name} className="max-h-10 w-full object-contain" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function VerificationServices() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24" aria-labelledby="services-title">
      <Reveal>
        <SectionHeading
          kicker="Our Verification Services"
          title={
            <span id="services-title">
              Verify Everything. <span className="gradient-text">In One Platform.</span>
            </span>
          }
          description="Build, launch and scale verification experiences without managing the infrastructure beneath them."
        />
      </Reveal>
      <div className="mt-10">
        <ProductFeatureGrid items={services} ctaLabel="Verify Now" compact />
      </div>
    </Container>
  );
}

function WhyDovixora() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-panel/30" aria-labelledby="why-title">
      <div className="ambient-light ambient-violet !opacity-15" />
      <div className="ambient-light ambient-cyan !opacity-10" />
      <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">
        <Reveal>
          <ArchitectureVisual />
        </Reveal>
        <Reveal delay="delay-2">
          <SectionHeading
            kicker="Why DOVIXORA"
            title={
              <span id="why-title">
                Built for Developers. <span className="gradient-text">Trusted by Businesses.</span>
              </span>
            }
          />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {developerFeatures.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="icon-tile shrink-0 bg-yellow-soft text-yellow-deep">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-foreground">{title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}

function ArchitectureVisual() {
  return (
    <div
      className="orbit-visual"
      role="img"
      aria-label="DOVIXORA verification infrastructure connecting Business, Individuals, Security, Banking, Analytics and Infrastructure"
    >
      <svg className="orbit-spokes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {orbitNodes.map((node) => (
          <line key={node.label} className="orbit-spoke" x1="50" y1="50" x2={node.left} y2={node.top} />
        ))}
      </svg>

      <div className="orbit-center-pulse" aria-hidden="true" />
      <div className="orbit-center">
        <ShieldCheck className="size-7 text-white" />
      </div>

      {orbitNodes.map((node) => (
        <div key={node.label} className="orbit-node" style={{ top: `${node.top}%`, left: `${node.left}%` }}>
          <span className="orbit-node-badge">
            <node.icon className="size-5" />
          </span>
          <span className="orbit-node-label">{node.label}</span>
        </div>
      ))}
    </div>
  );
}

function ApiSection() {
  const [language, setLanguage] = useState<keyof typeof requestTokensByLanguage>("JavaScript");

  return (
    <section className="border-y border-line bg-panel/30" aria-labelledby="api-title">
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <Reveal>
            <SectionHeading
              kicker="API That Powers Trust"
              title={
                <span id="api-title">
                  Simple API. <span className="gradient-text">Powerful Results.</span>
                </span>
              }
              description="One consistent request and response shape across every verification product."
            />
            <div className="mt-8">
              <div className="mb-3 flex flex-wrap gap-2">
                {(Object.keys(requestTokensByLanguage) as Array<keyof typeof requestTokensByLanguage>).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`rounded-full border px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                      language === lang
                        ? "border-yellow-deep bg-yellow-soft text-yellow-deep"
                        : "border-line text-muted-foreground hover:text-foreground"
                    }`}
                    aria-pressed={language === lang}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <ApiCodePanel
                method="POST"
                path="/v1/verify/pan"
                request={requestTokensByLanguage[language]}
                response={responseTokens}
              />
            </div>
          </Reveal>
          <Reveal delay="delay-2">
            <div className="grid h-full grid-cols-2 content-center gap-3 sm:grid-cols-3 lg:grid-cols-3">
              {metrics.map((metric) => (
                <MetricCard key={metric.label} label={metric.label} value={metric.value} tone={metric.tone} />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

const apiKeyBenefits = [
  "Access 100+ verification APIs to streamline your KYC/KYB processes effortlessly.",
  "Test our APIs in a secure sandbox environment to ensure smooth functionality and integration.",
  "Enjoy seamless integration with developer-friendly documentation and 24/7 expert support.",
];

function GetApiKeySection() {
  return (
    <Container className="py-16 sm:py-20 lg:py-24" aria-labelledby="get-api-key-title">
      <Reveal>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 id="get-api-key-title" className="section-title">
              Get <span className="gradient-text">API Key</span>
            </h2>
            <p className="mt-3 font-display text-base font-semibold text-foreground">
              By creating a free account, you get
            </p>
            <ul className="mt-5 space-y-4">
              {apiKeyBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-yellow-deep" />
                  <span className="text-sm leading-relaxed text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-muted-foreground">
              Trusted by over <span className="font-display font-bold text-yellow-deep">growing</span>{" "}
              businesses across India
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {trustedCompanies.slice(0, 5).map((company) => (
                <span
                  key={company.name}
                  className="grid size-12 shrink-0 place-items-center rounded-full border border-line bg-panel p-2 shadow-sm"
                  title={company.name}
                >
                  <img src={company.logo} alt={company.name} className="max-h-full w-full object-contain" />
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-light via-yellow-soft to-yellow-light p-6 sm:p-8">
            <div className="ambient-light ambient-violet !opacity-40" />
            <div className="relative rounded-2xl border border-line bg-panel p-6 shadow-[0_20px_45px_-18px_rgba(17,17,17,0.18)] sm:p-8">
              <GetApiKeyForm />
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
