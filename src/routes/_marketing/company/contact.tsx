import { createFileRoute } from "@tanstack/react-router";
import { Building2, Clock, HandHeart, Lock, Mail, MapPin, MessageCircleQuestion, Phone, ShieldCheck } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/company/contact-form";

export const Route = createFileRoute("/_marketing/company/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DOVIXORA" },
      { name: "description", content: "Talk to our team about payments, banking, identity, and automation." },
    ],
  }),
  component: ContactPage,
});

const options = [
  { icon: Building2, title: "Sales", description: "Talk to us about plans, pricing and enterprise deployments." },
  { icon: HandHeart, title: "Partnerships", description: "Explore integrations, referrals and co-building opportunities." },
  { icon: MessageCircleQuestion, title: "Support", description: "Get help with an existing DOVIXORA integration." },
  { icon: ShieldCheck, title: "General enquiries", description: "Anything else — press, feedback or general questions." },
];

const faqs = [
  { question: "How quickly will I hear back?", answer: "Our team typically responds within one business day, and same-day for existing customers with support plans." },
  { question: "Do you offer implementation support?", answer: "Yes — Growth and above plans include onboarding support, with dedicated engineering support on Enterprise." },
  { question: "Can I book a live demo?", answer: "Absolutely. Select 'Sales' as your topic and mention you'd like a walkthrough of the platform." },
];

function ContactPage() {
  return (
    <>
      <Container className="py-16 sm:py-20 lg:py-24">
        <Reveal>
          <div className="max-w-2xl">
            <span className="section-kicker">Contact</span>
            <h1 className="hero-title mt-6 text-4xl sm:text-5xl lg:text-6xl">
              Let's build something <span className="gradient-text">better.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Talk to our team about payments, banking, identity and automation — we'll route you to the right
              person.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {options.map((option, index) => (
            <Reveal key={option.title} delay={index === 1 ? "delay-1" : index === 3 ? "delay-2" : undefined}>
              <article className="security-card h-full">
                <div className="icon-tile bg-blue/10 text-blue">
                  <option.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display font-bold">{option.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{option.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      <section className="border-y border-line bg-panel/30">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <Reveal>
              <SectionHeading kicker="Send a Message" title="Tell us about your project." />
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>

            <Reveal delay="delay-1" className="grid gap-4 content-start">
              <div className="flex gap-4 rounded-xl border border-line bg-panel/50 p-5">
                <MapPin className="size-5 shrink-0 text-cyan" />
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">Our office</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    B-18, 2nd Floor, Shiv Marg, Opposite Maharishi Raman Diagnostic Center, Kanti Nagar, Bani Park,
                    Jaipur, Rajasthan 302015, India
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-line bg-panel/50 p-5">
                <Phone className="size-5 shrink-0 text-cyan" />
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">Call or WhatsApp us</p>
                  <a href="tel:+919116382399" className="mt-1 block text-sm text-muted-foreground hover:text-cyan">
                    +91 91163 82399
                  </a>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-line bg-panel/50 p-5">
                <Mail className="size-5 shrink-0 text-cyan" />
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">Email us</p>
                  <a href="mailto:info@dovix.ai" className="mt-1 block text-sm text-muted-foreground hover:text-cyan">
                    info@dovix.ai
                  </a>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-line bg-panel/50 p-5">
                <Clock className="size-5 shrink-0 text-cyan" />
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">What to expect</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Our team is available Monday–Saturday, 10:00 AM–7:00 PM IST, and responds to every message within
                    one business day. Sales enquiries are typically faster.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-emerald/30 bg-emerald/5 p-5">
                <Lock className="size-5 shrink-0 text-emerald" />
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">Privacy first</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Information you share is used only to respond to your request — never sold or shared with third
                    parties.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20 lg:py-24">
        <SectionHeading kicker="FAQ" title="Common questions." />
        <div className="mt-10 max-w-2xl">
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="border-line">
                <AccordionTrigger className="font-display text-base font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </>
  );
}
