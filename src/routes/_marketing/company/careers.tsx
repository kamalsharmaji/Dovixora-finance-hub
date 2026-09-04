import { createFileRoute } from "@tanstack/react-router";
import {
  Coffee,
  Globe2,
  GraduationCap,
  HeartPulse,
  Laptop,
  TrendingUp,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { JobCard, type JobData } from "@/components/company/job-card";
import { ProductCTA } from "@/components/products/product-cta";

export const Route = createFileRoute("/_marketing/company/careers")({
  head: () => ({
    meta: [
      { title: "Careers — DOVIXORA" },
      { name: "description", content: "Help us build the rails behind modern finance." },
    ],
  }),
  component: CareersPage,
});

const benefits = [
  { icon: Laptop, title: "Flexible work", description: "Work from wherever you're most productive — remote-friendly by default." },
  { icon: GraduationCap, title: "Learning budget", description: "An annual budget for courses, books and conferences." },
  { icon: HeartPulse, title: "Health and wellness", description: "Comprehensive health coverage for you and your family." },
  { icon: Coffee, title: "Modern tools", description: "The hardware and software you need to do your best work." },
  { icon: Globe2, title: "Global team", description: "Work alongside teammates across time zones and continents." },
  { icon: TrendingUp, title: "Career growth", description: "Clear leveling and regular growth conversations with your manager." },
];

const jobs: readonly JobData[] = [
  {
    role: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build the interfaces developers use to integrate DOVIXORA — from dashboards to documentation.",
    responsibilities: ["Own core parts of the developer dashboard", "Partner with design on new product surfaces", "Raise the bar on performance and accessibility"],
  },
  {
    role: "Backend Engineer",
    department: "Engineering",
    location: "Bengaluru, India",
    type: "Full-time",
    description: "Design and operate the infrastructure behind payments, identity and banking APIs.",
    responsibilities: ["Build reliable, idempotent APIs at scale", "Improve observability across the platform", "Participate in on-call rotation"],
  },
  {
    role: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Shape how developers and businesses experience financial infrastructure.",
    responsibilities: ["Design end-to-end product flows", "Maintain and evolve the design system", "Partner closely with engineering on implementation"],
  },
  {
    role: "Developer Relations Engineer",
    department: "Developer Experience",
    location: "Remote",
    type: "Full-time",
    description: "Help developers succeed with DOVIXORA through content, code and community.",
    responsibilities: ["Write guides, samples and SDK improvements", "Represent DOVIXORA at developer events", "Gather feedback that shapes the roadmap"],
  },
  {
    role: "Product Manager",
    department: "Product",
    location: "Bengaluru, India",
    type: "Full-time",
    description: "Own the roadmap for one of DOVIXORA's core infrastructure products.",
    responsibilities: ["Define product strategy with engineering and design", "Talk to customers to prioritize the right problems", "Ship and measure outcomes"],
  },
];

const hiringSteps = [
  { title: "Application review", description: "Our team reviews your application within a few business days." },
  { title: "Intro call", description: "A 30-minute conversation about your experience and the role." },
  { title: "Technical / craft interview", description: "A deeper conversation focused on how you work." },
  { title: "Team interviews", description: "Meet the team you'd be working with directly." },
  { title: "Offer", description: "We move fast once we know it's a fit." },
];

function CareersPage() {
  return (
    <>
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <span className="section-kicker">Careers</span>
            <h1 className="hero-title mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Build the future <span className="gradient-text">with us.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We're a small, focused team building the infrastructure layer for modern finance. If you care about
              craft, clarity and getting the details right, we'd love to talk.
            </p>
          </div>
        </Reveal>
      </Container>

      <section className="border-y border-line bg-panel/30">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading
            kicker="Culture"
            title="How we work."
            description="We're an engineering and product-led team that values clear thinking over busywork. We write things down, ship in small increments, and hold a high bar for reliability — because the products built on DOVIXORA move real money."
          />
        </Container>
      </section>

      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading kicker="Benefits" title="What you get." />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : undefined}>
              <article className="security-card h-full">
                <div className="icon-tile bg-cyan/10 text-cyan">
                  <benefit.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display font-bold">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="border-y border-line bg-panel/30">
        <Container className="py-16 sm:py-20 lg:py-24">
          <SectionHeading kicker="Open Positions" title="Join the team." />
          <div className="mt-10 grid gap-3">
            {jobs.map((job) => (
              <JobCard key={job.role} job={job} />
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading kicker="Hiring Process" title="What to expect." />
        <div className="mt-10 grid gap-2">
          {hiringSteps.map((step, index) => (
            <div key={step.title} className="flex gap-4 rounded-xl border border-line bg-panel/50 p-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-md bg-blue/10 font-mono text-xs font-semibold text-blue">
                {index + 1}
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-foreground">{step.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <ProductCTA
        kicker="Careers"
        title="Don't see the right role?"
        description="We're always looking for exceptional people. Reach out and tell us how you'd contribute."
        primaryLabel="Talk to Our Team"
        primaryTo="/company/contact"
        secondaryLabel="About DOVIXORA"
        secondaryTo="/company/about"
      />
    </>
  );
}
