import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Newspaper } from "lucide-react";

import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { Reveal } from "@/components/ui/reveal";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { BlogCard, type BlogPost } from "@/components/company/blog-card";
import { BlogFeaturedCard } from "@/components/company/blog-featured-card";
import { BlogFilter } from "@/components/company/blog-filter";
import { BlogHeroVisual } from "@/components/company/blog-hero-visual";

export const Route = createFileRoute("/_marketing/company/blog")({
  head: () => ({
    meta: [
      { title: "Blog — DOVIXORA" },
      { name: "description", content: "News, product updates, and engineering deep dives." },
    ],
  }),
  component: BlogPage,
});

const posts: readonly BlogPost[] = [
  {
    category: "Engineering",
    title: "How we built idempotency into every DOVIXORA API",
    description: "A look at the request-ID architecture that makes every payment safe to retry.",
    author: "Priya Nair",
    readingTime: "8 min read",
    date: "Aug 12, 2026",
    featured: true,
  },
  {
    category: "Product",
    title: "Introducing the Automation Engine",
    description: "Turn any DOVIXORA event into an automated, auditable workflow.",
    author: "Arjun Mehta",
    readingTime: "5 min read",
    date: "Jul 28, 2026",
  },
  {
    category: "Payments",
    title: "A practical guide to idempotent payment retries",
    description: "Why naive retry logic breaks payments, and how to fix it.",
    author: "Sara Kim",
    readingTime: "6 min read",
    date: "Jul 14, 2026",
  },
  {
    category: "Security",
    title: "Inside our SOC 2 audit process",
    description: "What it actually takes to keep financial infrastructure compliant.",
    author: "Daniel Osei",
    readingTime: "7 min read",
    date: "Jun 30, 2026",
  },
  {
    category: "Company",
    title: "DOVIXORA crosses 10M monthly API requests",
    description: "A look back at the milestones that got us here.",
    author: "Maya Chen",
    readingTime: "4 min read",
    date: "Jun 09, 2026",
  },
  {
    category: "Engineering",
    title: "Designing a webhook system that developers trust",
    description: "Signing, retries and replay protection — the details that matter.",
    author: "Priya Nair",
    readingTime: "9 min read",
    date: "May 22, 2026",
  },
  {
    category: "Product",
    title: "Why we built a unified API gateway",
    description: "One authentication layer, every DOVIXORA product.",
    author: "Arjun Mehta",
    readingTime: "5 min read",
    date: "May 03, 2026",
  },
  {
    category: "Payments",
    title: "Reducing payment authorization latency by 40%",
    description: "The infrastructure changes behind our sub-100ms API responses.",
    author: "Sara Kim",
    readingTime: "6 min read",
    date: "Apr 18, 2026",
  },
];

const categories = ["All", "Engineering", "Product", "Payments", "Security", "Company"] as const;

function BlogPage() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const featured = posts.find((post) => post.featured);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (post.featured) return false;
      if (category !== "All" && post.category !== category) return false;
      if (query.trim()) {
        const haystack = `${post.title} ${post.description}`.toLowerCase();
        if (!haystack.includes(query.trim().toLowerCase())) return false;
      }
      return true;
    });
  }, [query, category]);

  return (
    <>
      <Container className="py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <Reveal>
            <div className="max-w-xl">
              <span className="section-kicker">Blog &amp; Insights</span>
              <h1 className="hero-title mt-6 text-4xl sm:text-5xl lg:text-6xl">
                Insights from <span className="gradient-text">DOVIXORA.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Engineering deep dives, product updates and lessons from building financial infrastructure.
              </p>
            </div>
          </Reveal>

          <Reveal delay="delay-1">
            <BlogHeroVisual />
          </Reveal>
        </div>

        <Reveal delay="delay-1" className="mt-12">
          <BlogFilter
            query={query}
            onQueryChange={setQuery}
            categories={categories}
            activeCategory={category}
            onCategoryChange={(value) => setCategory(value as (typeof categories)[number])}
          />
        </Reveal>

        {loading ? (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <>
            {featured && category === "All" && !query.trim() && (
              <Reveal className="mt-10">
                <BlogFeaturedCard post={featured} />
              </Reveal>
            )}

            <div className="mt-6">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((post, index) => (
                    <Reveal key={post.title} delay={index % 3 === 1 ? "delay-1" : index % 3 === 2 ? "delay-2" : undefined}>
                      <BlogCard post={post} />
                    </Reveal>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Newspaper}
                  title="No articles found"
                  description="Try a different search term or category."
                />
              )}
            </div>
          </>
        )}
      </Container>

      <section className="border-t border-line bg-panel/20">
        <Container className="py-16 sm:py-20 lg:py-24">
          <Reveal>
            <div className="cta-panel">
              <div className="cta-lines" />
              <div className="relative z-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
                <div>
                  <span className="section-kicker">Stay in the loop</span>
                  <h2 className="section-title mt-3 max-w-xl">Get product updates in your inbox.</h2>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
                    Talk to our team to be the first to hear about new products and platform updates.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link to="/company/contact" className="light-button justify-center">
                    Talk to Our Team <ArrowRight className="size-4" />
                  </Link>
                  <Link to="/products" className="outline-button justify-center">
                    Explore Products
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
