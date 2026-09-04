import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Compass,
  Globe2,
  Heart,
  Lightbulb,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricCard } from "@/components/products/metric-card";
import { ProductCTA } from "@/components/products/product-cta";

export const Route = createFileRoute("/_marketing/company/about")({
  head: () => ({
    meta: [
      { title: "About — DOVIXORA" },
      { name: "description", content: "The infrastructure behind modern finance." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { icon: Activity, value: "99.99%", label: "Platform uptime", tone: "blue" as const },
  { icon: Globe2, value: "120+", label: "Countries reached", tone: "cyan" as const },
  { icon: Network, value: "10M+", label: "API requests processed", tone: "emerald" as const },
  { icon: ShieldCheck, value: "SOC 2", label: "Enterprise-grade security", tone: "blue" as const },
];

const values = [
  { icon: Lightbulb, title: "Innovation", description: "We build scalable, intelligent and future-ready infrastructure that drives real business impact." },
  { icon: ShieldCheck, title: "Quality", description: "Every product is built encrypted, audited and access-controlled from day one." },
  { icon: Compass, title: "Integrity", description: "Clear APIs, clear documentation, clear pricing — no surprises." },
  { icon: Heart, title: "Customer success", description: "We measure success by how fast our customers can ship." },
  { icon: Users, title: "Collaboration", description: "We build the tools we'd want to use ourselves, together with our customers." },
  { icon: Target, title: "Long-term thinking", description: "We build infrastructure meant to outlast any single product cycle." },
];

const leadership = [
  { name: "Abhay Ranjan", role: "Co-Founder", bio: "15+ years in digital marketing and growth strategy." },
  { name: "Ajeet Singh", role: "Chief Technology Officer", bio: "14+ years leading engineering and product architecture." },
  { name: "Mohan Shekhawat", role: "Co-Founder", bio: "18+ years of experience across real estate and operations." },
  { name: "Deepak Sharma", role: "Co-Founder", bio: "15+ years in business investment and vertical markets." },
];

const timeline = [
  { year: "2021", title: "DOVIXORA founded", description: "Started with a single mission: make financial infrastructure boring, in the best way." },
  { year: "2022", title: "Payments & Identity launch", description: "First production APIs shipped to early design partners." },
  { year: "2023", title: "Banking & Automation added", description: "Expanded the platform into a full financial operating layer." },
  { year: "2024", title: "Global expansion", description: "Infrastructure extended to 120+ countries and enterprise-scale customers." },
  { year: "2025", title: "10M+ API requests", description: "Crossed ten million monthly requests across the platform." },
  { year: "2026", title: "Today", description: "Powering payments, identity, banking and automation for modern finance." },
];

function AboutPage() {
  return (
    <>
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <span className="section-kicker">About DOVIXORA</span>
            <h1 className="hero-title mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Building the <span className="gradient-text">infrastructure behind modern finance.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              DOVIXORA is the infrastructure layer for teams building payments, identity, banking and automation
              products — so they can focus on their customers, not their rails.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              DOVIXORA is built by <span className="font-semibold text-foreground">Dovix AI</span>, a global AI,
              software development and digital transformation company based in Jaipur, India.
            </p>
          </div>
        </Reveal>
      </Container>

      <section className="border-y border-line bg-panel/30">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeading
                kicker="Mission"
                title="Simplifying financial infrastructure."
                description="To deliver secure, scalable and innovative financial infrastructure that transforms how businesses move money, verify identity and automate operations — without rebuilding rails from scratch."
              />
            </Reveal>
            <Reveal delay="delay-1">
              <SectionHeading
                kicker="Vision"
                title="A world where financial infrastructure is invisible."
                description="To become one of the world's most trusted financial infrastructure providers — helping any team, anywhere, plug into production-grade rails in minutes, not months."
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index === 1 ? "delay-1" : index === 3 ? "delay-2" : undefined}>
              <MetricCard icon={stat.icon} value={stat.value} label={stat.label} tone={stat.tone} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="border-y border-line bg-panel/30">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading
            align="center"
            kicker="Our Values"
            title={
              <>
                What we <span className="gradient-text">optimize for.</span>
              </>
            }
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : undefined}>
                <article className="security-card h-full">
                  <div className="icon-tile bg-blue/10 text-blue">
                    <value.icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display font-bold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading kicker="Our Journey" title="How we got here." />
        <div className="mt-10 grid gap-2">
          {timeline.map((entry, index) => (
            <Reveal key={entry.year} delay={index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : undefined}>
              <div className="flex gap-5 rounded-xl border border-line bg-panel/50 p-5">
                <span className="shrink-0 font-mono text-sm font-semibold text-cyan">{entry.year}</span>
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">{entry.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{entry.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="border-y border-line bg-panel/30">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Sparkles className="mx-auto size-6 text-cyan" />
            <SectionHeading
              align="center"
              className="mt-4"
              kicker="Our Team"
              title="A team obsessed with getting infrastructure right."
              description="DOVIXORA is built by the Dovix AI team — engineers and operators who've felt the pain of fragmented financial systems firsthand — and are building the platform we wished we'd had."
            />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((leader, index) => (
              <Reveal key={leader.name} delay={index % 2 === 1 ? "delay-1" : undefined}>
                <article className="security-card h-full text-center">
                  <h3 className="font-display font-bold">{leader.name}</h3>
                  <p className="mt-1 text-xs font-mono uppercase tracking-wide text-cyan">{leader.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ProductCTA
        title="Build the future of finance with DOVIXORA."
        description="Connect your business to the infrastructure powering modern financial workflows."
        primaryLabel="Start Building"
        secondaryLabel="Talk to Our Team"
      />
    </>
  );
}
