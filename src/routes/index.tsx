import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleDollarSign,
  Code2,
  CreditCard,
  Fingerprint,
  Github,
  Globe2,
  Landmark,
  Linkedin,
  LockKeyhole,
  Menu,
  Network,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  X,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXORA — The Infrastructure Behind Modern Finance" },
      {
        name: "description",
        content:
          "Build payments, banking, identity, and financial automation products on NEXORA's production-grade API infrastructure.",
      },
      { property: "og:title", content: "NEXORA — The Infrastructure Behind Modern Finance" },
      {
        property: "og:description",
        content:
          "The calm, production-grade API layer for teams building the next generation of finance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const navItems = [
  { label: "Products", href: "#products", dropdown: true },
  { label: "Solutions", href: "#solutions", dropdown: true },
  { label: "Developers", href: "#developers" },
  { label: "Resources", href: "#resources", dropdown: true },
  { label: "Company", href: "#company" },
];

const products = [
  {
    title: "Payments",
    description: "Accept and automate payments with simple, idempotent APIs.",
    icon: CreditCard,
    tone: "violet",
    featured: true,
  },
  {
    title: "Identity",
    description: "Verify customers and businesses instantly.",
    icon: Fingerprint,
    tone: "cyan",
  },
  {
    title: "Banking",
    description: "Build modern banking experiences on real infrastructure.",
    icon: Landmark,
    tone: "blue",
  },
  {
    title: "Automation",
    description: "Automate financial workflows intelligently.",
    icon: Workflow,
    tone: "violet",
  },
  {
    title: "Analytics",
    description: "Understand your business with real-time insight.",
    icon: BarChart3,
    tone: "blue",
  },
  {
    title: "AI Intelligence",
    description: "Make smarter financial decisions with AI.",
    icon: Sparkles,
    tone: "cyan",
  },
];

const stats = [
  { value: 10, suffix: "B+", prefix: "$", label: "Processed Annually", tone: "ink" },
  { value: 99.99, suffix: "%", prefix: "", label: "Platform Uptime", tone: "cyan" },
  { value: 50, suffix: "M+", prefix: "", label: "API Requests", tone: "blue" },
  { value: 120, suffix: "+", prefix: "", label: "Countries Supported", tone: "violet" },
];

const testimonials = [
  {
    quote: "Nexora allowed us to launch our financial product in weeks instead of months.",
    name: "Maya Shah",
    role: "VP of Product",
    company: "Meridian Pay",
    initials: "MS",
    tone: "violet",
  },
  {
    quote: "The API primitives are thoughtful, predictable, and built for the messy reality of finance.",
    name: "Elliot Chen",
    role: "Co-founder",
    company: "Cobalt Ledger",
    initials: "EC",
    tone: "cyan",
  },
  {
    quote: "We went from our first sandbox call to a global launch without changing our architecture.",
    name: "Amina Okafor",
    role: "CTO",
    company: "Northstar Works",
    initials: "AO",
    tone: "blue",
  },
];

const codeSamples = {
  JavaScript: [
    ["keyword", "const"],
    ["plain", " payment = "],
    ["keyword", "await"],
    ["plain", " nexora.payments.create({"],
    ["plain", "\n  amount: "],
    ["number", "5000"],
    ["plain", ","],
    ["plain", "\n  currency: "],
    ["string", '"INR"'],
    ["plain", ","],
    ["plain", "\n  customer_id: "],
    ["string", '"cus_8X29"'],
    ["plain", "\n});\n\n"],
    ["plain", "console.log(payment.status);"],
  ],
  Python: [
    ["keyword", "payment"],
    ["plain", " = nexora.payments.create(\n  amount="],
    ["number", "5000"],
    ["plain", ",\n  currency="],
    ["string", '"INR"'],
    ["plain", ",\n  customer_id="],
    ["string", '"cus_8X29"'],
    ["plain", "\n)\n\nprint(payment.status)"],
  ],
  "cURL": [
    ["keyword", "curl"],
    ["plain", " https://api.nexora.dev/v1/payments \\\n  -X POST \\\n  -H "],
    ["string", '"Authorization: Bearer $NEXORA_KEY"'],
    ["plain", " \\\n  -d "],
    ["string", "'amount=5000&currency=INR'"],
  ],
} as const;

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="nexora-page min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
          <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label="Nexora home">
            <LogoMark />
            <span className="font-display text-lg font-extrabold tracking-tight">NEXORA</span>
          </a>

          <nav className="hidden items-center gap-7 font-display text-sm font-medium text-muted-foreground lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="nav-link flex items-center gap-1">
                {item.label}
                {item.dropdown && <ChevronDown className="size-3.5 text-cyan" />}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden font-display text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block">
              Login
            </a>
            <a href="#contact" className="gradient-button hidden sm:inline-flex">
              Start Building <ArrowRight className="size-4" />
            </a>
            <button
              type="button"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              className="icon-button lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-line bg-panel px-5 py-4 lg:hidden">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="mobile-nav-link">
                  <span>{item.label}</span>
                  {item.dropdown && <ChevronDown className="size-4 text-cyan" />}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="mobile-nav-link text-cyan">
                Login <ArrowRight className="size-4" />
              </a>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="gradient-button mt-2 justify-center">
                Start Building <ArrowRight className="size-4" />
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="nexora-grid">
        <Hero />
        <TrustedBy />
        <ProductEcosystem />
        <DeveloperExperience />
        <PerformanceDashboard />
        <HowItWorks />
        <Security />
        <Statistics />
        <Testimonials />
        <FinalCta />
      </main>

      <Footer />
    </div>
  );
}

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <span>N</span>
    </span>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="ambient-light ambient-violet" />
      <div className="ambient-light ambient-cyan" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <Reveal>
          <span className="eyebrow-pill"><Zap className="size-3.5" /> The Financial Operating System</span>
          <h1 id="hero-title" className="hero-title mt-6">
            Build the future of finance, <span className="gradient-text">without rebuilding the rails.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Connect payments, banking, identity verification and financial automation through one calm, production-grade infrastructure layer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="gradient-button gradient-button-large">Start Building Free <ArrowRight className="size-4" /></a>
            <a href="#developers" className="outline-button">Explore APIs <Code2 className="size-4" /></a>
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground/70">No credit card required</p>
        </Reveal>
        <Reveal delay="delay-2">
          <HeroNetwork />
        </Reveal>
      </div>
    </section>
  );
}

function HeroNetwork() {
  return (
    <div className="hero-network" aria-label="Live Nexora infrastructure status visualization">
      <svg className="rail-map" viewBox="0 0 520 450" fill="none" aria-hidden="true">
        <path className="rail-path rail-path-one" d="M32 108H255V305H488" />
        <path className="rail-path rail-path-two" d="M32 108V356H255" />
        <path className="rail-path rail-path-three" d="M255 305V108H488" />
        <circle className="rail-node node-one" cx="32" cy="108" r="5" />
        <circle className="rail-node node-two" cx="255" cy="108" r="5" />
        <circle className="rail-node node-three" cx="255" cy="305" r="5" />
        <circle className="rail-node node-four" cx="488" cy="305" r="5" />
      </svg>
      <div className="hero-core-panel">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Nexora control plane</span>
          <span className="status-dot"><span /> Operational</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="metric-chip"><span>RAIL 01</span><strong>PAY</strong></div>
          <div className="metric-chip"><span>RAIL 02</span><strong>IDV</strong></div>
          <div className="metric-chip"><span>RAIL 03</span><strong>BANK</strong></div>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-line bg-background/50 p-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-md bg-cyan/15 text-cyan"><Network className="size-4" /></div>
          <div className="min-w-0"><p className="truncate font-display text-xs font-semibold">All systems connected</p><p className="font-mono text-[10px] text-muted-foreground">syncing across 120+ regions</p></div>
          <span className="ml-auto font-mono text-[10px] text-cyan">42ms</span>
        </div>
      </div>
      <div className="float-card float-card-payment">
        <div className="flex items-center justify-between"><span className="card-label text-cyan">Payment</span><CircleDollarSign className="size-4 text-cyan" /></div>
        <p className="mt-2 font-display text-lg font-bold">₹24,500.00</p>
        <p className="font-mono text-[11px] text-muted-foreground">Successful · 42ms</p>
      </div>
      <div className="float-card float-card-identity">
        <div className="flex items-center justify-between"><span className="card-label text-violet">Identity</span><ShieldCheck className="size-4 text-violet" /></div>
        <p className="mt-2 font-display text-sm font-semibold">Verification Complete</p>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-border"><div className="h-full w-[92%] rounded-full bg-spectrum" /></div>
      </div>
      <div className="float-card float-card-status">
        <div className="flex items-center justify-between"><span className="card-label text-blue">API status</span><span className="status-dot"><span /></span></div>
        <p className="mt-2 font-display text-lg font-bold">99.99%</p>
        <div className="mt-3 flex h-8 items-end gap-1"><span className="hero-bar bar-1" /><span className="hero-bar bar-2" /><span className="hero-bar bar-3" /><span className="hero-bar bar-4" /><span className="hero-bar bar-5" /><span className="hero-bar bar-6" /></div>
      </div>
      <div className="api-packet"><span>POST /v1/payments</span><strong>200 OK</strong></div>
    </div>
  );
}

function TrustedBy() {
  return (
    <section className="border-y border-line py-8" aria-label="Trusted companies">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">Trusted by teams building the next generation of finance</p>
      <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-5 sm:px-6">
        {["Meridian", "Cobalt Pay", "Vantage", "Ledgerline", "Northwind", "Lumen ID"].map((name, index) => (
          <span key={name} className={`company-word company-word-${index + 1}`}>{name}</span>
        ))}
      </div>
    </section>
  );
}

function ProductEcosystem() {
  return (
    <section id="products" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28" aria-labelledby="products-title">
      <Reveal><SectionKicker>Product Ecosystem</SectionKicker><h2 id="products-title" className="section-title mt-3 max-w-2xl">Everything financial. <span className="gradient-text">One platform.</span></h2><p className="section-copy">Build, launch and scale financial experiences without managing the infrastructure beneath them.</p></Reveal>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {products.map((product, index) => <ProductCard key={product.title} product={product} index={index} />)}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: (typeof products)[number]; index: number }) {
  const Icon = product.icon;
  const toneClass = `tone-${product.tone}`;
  return (
    <Reveal delay={index > 2 ? "delay-2" : index === 1 ? "delay-1" : undefined} className={product.featured ? "md:col-span-2" : ""}>
      <article className={`product-card ${product.featured ? "product-card-featured" : ""} ${toneClass}`}>
        <div className="flex items-start justify-between gap-5">
          <div><div className="icon-tile"><Icon className="size-5" /></div><h3 className="mt-5 font-display text-xl font-bold">{product.title}</h3><p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{product.description}</p></div>
          {product.featured && <div className="hidden w-40 shrink-0 items-end gap-1 md:flex">{["chart-a", "chart-b", "chart-c", "chart-d", "chart-e", "chart-f"].map((bar) => <span key={bar} className={`product-bar ${bar}`} />)}</div>}
        </div>
        {product.title === "Identity" && <div className="mt-6 h-1.5 w-full rounded-full bg-border"><div className="h-full w-[82%] rounded-full bg-cyan" /></div>}
        {product.title === "Banking" && <div className="mt-6 flex gap-2"><span className="rail-pill">ACCOUNTS</span><span className="rail-pill">CARDS</span></div>}
        {product.title === "Analytics" && <div className="mt-6 flex items-center gap-2 font-mono text-[10px] text-muted-foreground"><BarChart3 className="size-4 text-blue" /> realtime stream <span className="status-dot"><span /></span></div>}
        {product.title === "AI Intelligence" && <div className="mt-6 flex items-center gap-2 font-mono text-[10px] text-muted-foreground"><Sparkles className="size-4 text-cyan" /> risk signal ready</div>}
      </article>
    </Reveal>
  );
}

function DeveloperExperience() {
  const [activeTab, setActiveTab] = useState<keyof typeof codeSamples>("JavaScript");
  return (
    <section id="developers" className="border-y border-line bg-panel/45" aria-labelledby="developers-title">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <Reveal><SectionKicker>Built for Developers</SectionKicker><h2 id="developers-title" className="section-title mt-3">From first call to millions of transactions.</h2><p className="section-copy">Integrate Nexora with clean, powerful APIs designed for teams that ship.</p><ul className="mt-7 space-y-3 font-display text-sm"><li className="check-row"><Check /> Clean documentation</li><li className="check-row"><Check /> Production-ready APIs</li><li className="check-row"><Check /> Powerful SDKs</li><li className="check-row"><Check /> Real-time webhooks</li></ul><a href="#resources" className="outline-button mt-8">Explore Documentation <ArrowRight className="size-4" /></a></Reveal>
        <Reveal delay="delay-2"><div className="code-window glow-panel"><div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3"><div className="mr-2 flex gap-1.5"><span className="window-dot window-dot-red" /><span className="window-dot window-dot-yellow" /><span className="window-dot window-dot-green" /></div>{(Object.keys(codeSamples) as Array<keyof typeof codeSamples>).map((tab) => <button type="button" key={tab} onClick={() => setActiveTab(tab)} className={`code-tab ${activeTab === tab ? "code-tab-active" : ""}`}>{tab}</button>)}</div><pre className="code-content"><code>{codeSamples[activeTab].map(([kind, text], index) => <span key={`${kind}-${index}`} className={`syntax-${kind}`}>{text}</span>)}</code></pre><div className="flex items-center gap-2 border-t border-line px-5 py-3 font-mono text-xs"><Check className="size-3.5 text-cyan" /><span className="text-muted-foreground">Payment Successful</span><span className="ml-auto rounded bg-cyan/15 px-2 py-0.5 font-semibold text-cyan">200 OK</span></div></div></Reveal>
      </div>
    </section>
  );
}

function PerformanceDashboard() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28" aria-labelledby="performance-title">
      <Reveal><SectionKicker>Performance</SectionKicker><h2 id="performance-title" className="section-title mt-3 max-w-2xl">Infrastructure that never <span className="gradient-text">slows you down.</span></h2><p className="section-copy">Production-grade observability across every transaction, endpoint, and region.</p></Reveal>
      <Reveal delay="delay-2"><div className="dashboard-shell mt-10"><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[["Total Volume", "₹12.8M", "+18.2%", "ink"], ["Success Rate", "99.98%", "stable", "cyan"], ["API Requests", "2.4M", "today", "ink"], ["Avg Response", "42ms", "p99 88ms", "blue"]].map(([label, value, delta, tone]) => <div key={label} className="dashboard-metric"><span>{label}</span><strong className={`metric-${tone}`}>{value}</strong><small>{delta}</small></div>)}</div><div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_1fr]"><div className="dashboard-chart"><div className="flex items-center justify-between"><span className="font-display text-sm font-semibold">Transaction activity</span><span className="font-mono text-[10px] text-muted-foreground">Last 24h</span></div><div className="chart-grid mt-5"><div className="chart-line chart-line-one" /><div className="chart-line chart-line-two" />{["c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12"].map((bar) => <span key={bar} className={`dashboard-bar ${bar}`} />)}</div><div className="mt-3 flex justify-between font-mono text-[9px] text-muted-foreground/60"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span></div></div><div className="dashboard-activity"><div className="flex items-center justify-between"><span className="font-display text-sm font-semibold">Recent transactions</span><span className="text-xs text-cyan">Live</span></div><div className="mt-4 space-y-3">{[["Atlas Studio", "₹84,200", "Processed"], ["Kite Markets", "₹12,500", "Processed"], ["Nova Health", "₹7,840", "Review"]].map(([name, amount, status]) => <div key={name} className="transaction-row"><span className="transaction-avatar">{name.slice(0, 1)}</span><span className="min-w-0 flex-1"><strong className="block truncate">{name}</strong><small>{status}</small></span><b>{amount}</b></div>)}</div></div></div></div></Reveal>
    </section>
  );
}

function HowItWorks() {
  const steps = [["01", "Create your account", "Get your workspace and API keys in minutes.", CircleDollarSign], ["02", "Connect Nexora APIs", "Use typed SDKs to connect your financial rails.", Terminal], ["03", "Launch and scale", "Ship confidently while we run the infrastructure.", Play]] as const;
  return <section id="solutions" className="border-y border-line bg-panel/30" aria-labelledby="steps-title"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28"><Reveal><SectionKicker>How it works</SectionKicker><h2 id="steps-title" className="section-title mt-3">From idea to production. <span className="gradient-text">In minutes.</span></h2></Reveal><div className="relative mt-12 grid gap-4 lg:grid-cols-3">{steps.map(([number, title, description, Icon], index) => <Reveal key={number} delay={index === 1 ? "delay-1" : index === 2 ? "delay-2" : undefined}><article className="step-card"><span className="step-number">{number}</span><div className="step-icon"><Icon className="size-5" /></div><h3 className="mt-6 font-display text-xl font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></article></Reveal>)}</div></div></section>;
}

function Security() {
  const items = [["Bank-level encryption", "Protected in transit and at rest.", LockKeyhole], ["Enterprise security", "Granular controls, audit trails, and roles.", ShieldCheck], ["99.99% uptime", "Resilient infrastructure built for critical flows.", Zap], ["Built to scale globally", "Reach customers across 120+ countries.", Globe2]] as const;
  return <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:py-28" aria-labelledby="security-title"><Reveal><SectionKicker>Security by design</SectionKicker><h2 id="security-title" className="section-title mt-3">Security isn't a feature. <span className="gradient-text">It's our foundation.</span></h2><p className="section-copy">Every transaction, API request, and piece of data is protected with enterprise-grade security.</p><div className="security-visual mt-10"><div className="security-ring security-ring-one" /><div className="security-ring security-ring-two" /><ShieldCheck className="relative z-10 size-12 text-cyan" /><span className="security-pulse" /></div></Reveal><div className="grid gap-3 sm:grid-cols-2">{items.map(([title, description, Icon], index) => <Reveal key={title} delay={index > 1 ? "delay-2" : "delay-1"}><article className="security-card"><div className="security-icon"><Icon className="size-5" /></div><h3 className="mt-5 font-display font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></article></Reveal>)}</div></section>;
}

function Statistics() {
  return <section className="border-y border-line bg-spectrum-soft" aria-label="Nexora platform statistics"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-16 sm:px-6 lg:grid-cols-4">{stats.map((stat, index) => <AnimatedStat key={stat.label} {...stat} delay={index} />)}</div></section>;
}

function AnimatedStat({ value, suffix, prefix, label, tone, delay }: (typeof stats)[number] & { delay: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const element = ref.current; if (!element) return; let frame = 0; const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; const started = performance.now(); const animate = (now: number) => { const progress = Math.min((now - started) / 1100, 1); setCurrent(Number((value * (1 - Math.pow(1 - progress, 3))).toFixed(value % 1 === 0 ? 0 : 2))); if (progress < 1) frame = requestAnimationFrame(animate); }; frame = requestAnimationFrame(animate); observer.disconnect(); }, { threshold: 0.4 }); observer.observe(element); return () => { observer.disconnect(); cancelAnimationFrame(frame); }; }, [value]);
  return <div ref={ref} className={`stat-block stat-${tone}`} style={{ animationDelay: `${delay * 100}ms` }}><p className="font-display text-4xl font-extrabold sm:text-5xl">{prefix}{current}{suffix}</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p></div>;
}

function Testimonials() {
  return <section id="resources" className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28" aria-labelledby="testimonials-title"><Reveal><SectionKicker>Customer signal</SectionKicker><h2 id="testimonials-title" className="section-title mt-3">Loved by teams <span className="gradient-text">building what's next.</span></h2></Reveal><div className="mt-10 grid gap-4 lg:grid-cols-3">{testimonials.map((testimonial, index) => <Reveal key={testimonial.name} delay={index === 1 ? "delay-1" : index === 2 ? "delay-2" : undefined}><article className="testimonial-card"><Quote className="size-6 text-cyan/70" /><p className="mt-6 font-display text-lg font-semibold leading-relaxed">“{testimonial.quote}”</p><div className="mt-8 flex items-center gap-3"><span className={`avatar avatar-${testimonial.tone}`}>{testimonial.initials}</span><span><strong className="block font-display text-sm">{testimonial.name}</strong><small className="text-muted-foreground">{testimonial.role} · {testimonial.company}</small></span></div></article></Reveal>)}</div></section>;
}

function FinalCta() {
  return <section id="contact" className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:py-28"><Reveal><div className="cta-panel"><div className="cta-lines" /><div className="relative z-10 text-center"><SectionKicker>Start your next rail</SectionKicker><h2 className="section-title mx-auto mt-3 max-w-2xl">Ready to build what's next?</h2><p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">Join the companies building the future of financial infrastructure with Nexora.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#top" className="light-button">Start Building Free <ArrowRight className="size-4" /></a><a href="mailto:hello@nexora.dev" className="outline-button">Talk to Our Team</a></div></div></div></Reveal></section>;
}

function Footer() {
  const columns = [["Product", "Payments", "Identity", "Banking", "Automation", "Analytics"], ["Developers", "Documentation", "API Reference", "SDKs", "Status"], ["Company", "About", "Careers", "Blog", "Contact"], ["Legal", "Privacy", "Terms", "Security"]];
  return <footer id="company" className="border-t border-line bg-panel/60"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-5"><div><a href="#top" className="flex items-center gap-2.5"><LogoMark /><span className="font-display text-lg font-extrabold tracking-tight">NEXORA</span></a><p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">The infrastructure behind modern finance.</p><div className="mt-6 flex gap-3"><a className="social-link" href="#company" aria-label="Nexora on LinkedIn"><Linkedin className="size-4" /></a><a className="social-link" href="#company" aria-label="Nexora on X"><X className="size-4" /></a><a className="social-link" href="#company" aria-label="Nexora on GitHub"><Github className="size-4" /></a></div></div>{columns.map(([heading, ...links]) => <div key={heading}><h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70">{heading}</h3><ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">{links.map((link) => <li key={link}><a href="#top" className="footer-link">{link}</a></li>)}</ul></div>)}</div><div className="border-t border-line"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 font-mono text-[10px] text-muted-foreground/70 sm:px-6"><span>© 2026 Nexora. All rights reserved.</span><span>The infrastructure behind modern finance.</span></div></div></footer>;
}

function SectionKicker({ children }: { children: string }) { return <span className="section-kicker">{children}</span>; }

function Reveal({ children, delay, className = "" }: { children: React.ReactNode; delay?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const element = ref.current; if (!element) return; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.12 }); observer.observe(element); return () => observer.disconnect(); }, []);
  return <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${delay ?? ""} ${className}`}>{children}</div>;
}