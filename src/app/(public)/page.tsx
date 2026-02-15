import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Search,
  Handshake,
  BarChart3,
  ShieldCheck,
  Eye,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import { CTABanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";
import { processSteps } from "@/lib/constants/services";
import { getRecentPosts } from "@/lib/queries/blog";
import { formatDate, formatCategory } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Strategic Buys | Australia's Trusted Buyer's Agency | Property Advocates",
  description:
    "Strategic Buys is Australia's trusted buyer's agency. Expert property sourcing, negotiation & investment strategy for home buyers and investors nationwide.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  let recentPosts: Awaited<ReturnType<typeof getRecentPosts>> = [];
  try {
    recentPosts = await getRecentPosts(3);
  } catch {
    // DB not available yet — show empty
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: siteConfig.name,
          url: siteConfig.url,
          email: siteConfig.email,
          openingHours: "Mo-Su 09:00-17:00",
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            addressCountry: "AU",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: siteConfig.stats.rating,
            reviewCount: siteConfig.stats.reviewCount,
            bestRating: 5,
          },
          serviceType: [
            "Buyer's Agent",
            "Property Sourcing",
            "Property Negotiation",
            "Auction Bidding",
            "Investment Strategy",
          ],
        }}
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex min-h-dvh items-center overflow-hidden pt-20">
        <Image
          src="/images/hero-home.jpg"
          alt="Classic Australian brick suburban home with green lawn and carport"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-gray-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-gray-900/50" />
        <div className="animate-pulse-glow pointer-events-none absolute top-[15%] right-[10%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(198,150,44,0.08)_0%,transparent_65%)]" />

        <div className="relative z-[2] mx-auto max-w-[1200px] px-6 py-16 lg:px-8 lg:py-24">
          <div className="max-w-[640px]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-gold-lighter">
              <Star className="h-3.5 w-3.5" />
              Australia&apos;s Trusted Buyer&apos;s Agency
            </div>

            <h1 className="font-heading text-4xl font-bold leading-[1.05] text-white md:text-5xl lg:text-[4rem]">
              Buy Smarter. Save Thousands.{" "}
              <span className="text-gradient-gold">Love Your Property.</span>
            </h1>

            <p className="mt-6 max-w-[520px] text-base leading-relaxed text-white/80 md:text-lg">
              Australia&apos;s trusted buyer&apos;s agents. We find, negotiate, and
              secure properties exclusively for you &mdash; saving you time, money,
              and the stress of doing it alone.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="gradient-gold inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white shadow-[--shadow-gold] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Book a Free Strategy Call
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-gold-lighter"
              >
                See How We Help
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4 lg:gap-10">
              {[
                { value: siteConfig.stats.propertyTransacted, label: "Property Transacted" },
                { value: siteConfig.stats.happyClients, label: "Happy Clients" },
                { value: siteConfig.stats.yearsExperience, label: "Years Experience" },
                { value: `${siteConfig.stats.rating}★`, label: "Client Rating" },
              ].map((stat, idx) => (
                <div
                  key={stat.label}
                  className={idx < 3 ? "border-r border-white/10 pr-6 lg:pr-10" : ""}
                >
                  <div className="font-heading text-3xl font-bold text-gold-light lg:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-white/70">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ─────────────────────────────────────── */}
      <section className="bg-off-white py-10 lg:py-12">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {[
              { icon: ShieldCheck, title: "Licensed & Insured", subtitle: "Fully licensed buyer's agents" },
              { icon: Eye, title: "100% Independent", subtitle: "We never represent sellers" },
              { icon: CheckCircle, title: "300+ Clients", subtitle: "Across all capital cities" },
              { icon: Search, title: "Off-Market Access", subtitle: "Before they hit the market" },
            ].map(({ icon: Icon, title, subtitle }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">{title}</div>
                  <div className="text-xs text-gray-500">{subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Preview ─────────────────────────────────── */}
      <section className="py-14 lg:py-16">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 md:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl shadow-lg ring-4 ring-gold/10 ring-offset-4 ring-offset-white">
            <Image
              src="/images/about-preview.webp"
              alt="Styled living room in an Australian investment property"
              width={600}
              height={450}
              className="h-auto w-full object-cover"
            />
          </div>
          <div>
            <SectionHeader
              label="About Us"
              title="We Work for You. Never the Seller."
              align="left"
            />
            <p className="mt-4 leading-relaxed text-gray-600">
              Strategic Buys is a fully licensed, independent buyer&apos;s agency.
              Unlike real estate agents who represent the seller, we work exclusively
              for you &mdash; sourcing, evaluating, and negotiating property on your
              behalf.
            </p>
            <p className="mt-3 leading-relaxed text-gray-600">
              Our mission is to level the playing field for everyday Australians, giving
              you the same professional representation and market access that institutions
              and experienced investors enjoy.
            </p>
            <blockquote className="mt-6 border-l-[3px] border-gold pl-5 font-accent text-base italic leading-relaxed text-gray-700">
              &ldquo;We treat your property purchase as if it were our own.&rdquo;
            </blockquote>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all hover:gap-3 hover:text-gold-dark"
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Preview — Horizontal Cards ───────────── */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <SectionHeader
            label="What We Do"
            title="Expert Services for Every Buyer"
            subtitle="From first-home buyers to seasoned investors, we provide tailored property buying services that save you time, money, and stress."
          />

          <div className="mt-10 flex flex-col gap-4">
            {[
              {
                icon: Search,
                title: "Property Sourcing",
                desc: "Access on-market and exclusive off-market properties through our extensive industry network. We shortlist only the best opportunities tailored to your criteria.",
              },
              {
                icon: Handshake,
                title: "Expert Negotiation",
                desc: "Deep market knowledge, comparable sales data, and proven strategies to secure the best price and terms. Our clients save an average of $30,000+ on every purchase.",
              },
              {
                icon: BarChart3,
                title: "Portfolio Strategy",
                desc: "Data-driven investment strategies tailored to your financial goals, risk profile, and timeline. Build long-term wealth through smart property decisions.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <Link
                key={title}
                href="/services"
                className="group flex items-center gap-6 rounded-xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-lg lg:p-8"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-gold/10 to-purple/5 text-gold transition-colors group-hover:from-gold group-hover:to-gold-dark group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">
                    {desc}
                  </p>
                </div>
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-gold sm:block" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process — Horizontal Timeline ─────────────────── */}
      <section className="gradient-hero py-16 text-white lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <SectionHeader
            label="Our Process"
            title="How It Works"
            subtitle="A simple, proven process from first call to settlement — and beyond."
            theme="dark"
          />

          <div className="relative mt-12">
            <div className="absolute top-7 left-[calc(12.5%)] right-[calc(12.5%)] hidden h-px bg-gradient-to-r from-gold/40 via-gold to-gold/40 lg:block" />

            <div className="grid gap-8 lg:grid-cols-4 lg:gap-6">
              {processSteps.map((step) => (
                <div key={step.number} className="relative text-center">
                  <div className="relative z-10 mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full gradient-gold text-lg font-bold text-white shadow-[--shadow-gold] ring-4 ring-[#2c2720]">
                    {step.number}
                  </div>
                  <h4 className="font-heading text-base font-bold text-white lg:text-lg">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof — Stats + Testimonials ───────────── */}
      <section className="bg-off-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <SectionHeader
            label="Social Proof"
            title="Trusted by Hundreds of Australians"
          />

          <div className="mx-auto mt-10 max-w-[1000px]">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {[
                { value: siteConfig.stats.propertyTransacted, label: "Property Transacted" },
                { value: siteConfig.stats.happyClients, label: "Happy Clients" },
                { value: siteConfig.stats.yearsExperience, label: "Years Experience" },
                { value: `${siteConfig.stats.rating}★`, label: "Client Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-heading text-3xl font-bold text-gold lg:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "Strategic Buys saved us over $40,000 through expert negotiation. Their market knowledge is unmatched.",
                name: "Michael & Karen",
                role: "Home Buyers, Sydney",
                initials: "MK",
              },
              {
                quote: "As an investor, I needed someone who understood the numbers. Our investment property has grown 12% in value since purchase.",
                name: "Sarah P.",
                role: "Property Investor, Melbourne",
                initials: "SP",
              },
              {
                quote: "Auction day was stress-free. The team handled everything with precision and we secured our dream home under budget.",
                name: "David J.",
                role: "Home Buyer, Brisbane",
                initials: "DJ",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="relative rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="absolute top-4 right-5 font-accent text-6xl leading-none text-gold/10">
                  &ldquo;
                </span>
                <div className="mb-4 flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="relative font-accent text-base italic leading-relaxed text-gray-700 lg:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-dark text-xs font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Preview ──────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
            <SectionHeader label="Insights" title="Latest from Our Blog" />
            <div className="mx-auto mt-6 mb-10 rule-gold w-24" />

            <div className="grid gap-6 md:grid-cols-3">
              {recentPosts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-xl border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-[220px] items-center justify-center bg-gradient-to-br from-off-white to-gray-100">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        width={400}
                        height={220}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-300">
                        <Search className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {post.category && (
                      <span className="mb-2 inline-block rounded-full bg-gold/10 px-3 py-0.5 text-xs font-semibold text-gold">
                        {formatCategory(post.category.slug)}
                      </span>
                    )}
                    <h3 className="font-heading text-lg font-bold text-gray-900">
                      <Link href={`/blog/${post.slug}`} className="hover:text-gold">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 font-semibold text-gold hover:text-gold-dark"
                      >
                        Read More
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-2.5 text-sm font-semibold text-gold-dark transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-white"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
