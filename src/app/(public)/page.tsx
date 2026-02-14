import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import {
  Search,
  Handshake,
  BarChart3,
  Home,
  TrendingUp,
  Hammer,
  Building2,
  TreePine,
  Heart,
  ShieldCheck,
  Eye,
  LineChart,
  HeadphonesIcon,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import { CTABanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";
import { processSteps } from "@/lib/constants/services";
import { getRecentPosts } from "@/lib/queries/blog";
import { formatDate, getReadTime, formatCategory } from "@/lib/utils";

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
          telephone: siteConfig.phone,
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
      <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-20 lg:min-h-screen">
        {/* Background Image */}
        <Image
          src="/images/hero-home.jpg"
          alt="Australian property"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/75 to-gray-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/30" />

        {/* Decorative gold accent */}
        <div className="animate-pulse-glow pointer-events-none absolute top-[15%] right-[10%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(198,150,44,0.08)_0%,transparent_65%)]" />

        <div className="relative z-[2] mx-auto max-w-[1200px] px-6 py-16 lg:px-8 lg:py-24">
          <div className="max-w-[640px]">
            {/* Label */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-gold-lighter">
              <Star className="h-3.5 w-3.5" />
              Australia&apos;s Trusted Buyer&apos;s Agency
            </div>

            <h1 className="font-heading text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-[3.5rem]">
              Buy Smarter. Save Thousands.{" "}
              <span className="text-gradient-gold">Love Your Property.</span>
            </h1>

            <p className="mt-6 max-w-[500px] text-base leading-relaxed text-white/80 md:text-lg">
              Australia&apos;s trusted buyer&apos;s agents. We find, negotiate, and
              secure properties exclusively for you &mdash; saving you time, money,
              and the stress of doing it alone.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="gradient-gold inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold text-white shadow-[--shadow-gold] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Book a Free Strategy Call
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-gold-lighter"
              >
                See How We Help
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-14 flex flex-wrap gap-10 border-t border-white/10 pt-8 lg:gap-14">
              {[
                { value: siteConfig.stats.propertyTransacted, label: "Property Transacted" },
                { value: siteConfig.stats.happyClients, label: "Happy Clients" },
                { value: siteConfig.stats.yearsExperience, label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-2xl font-bold text-gold-light lg:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-white/50">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ─────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white py-5">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-6 px-6 lg:gap-10 lg:px-8">
          {[
            { icon: ShieldCheck, text: "Licensed & Insured" },
            { icon: Eye, text: "Independent & Client-Focused" },
            { icon: CheckCircle, text: "500+ Satisfied Clients" },
            { icon: Search, text: "Off-Market Access" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <Icon className="h-[18px] w-[18px] text-gold" />
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* ── About Preview ─────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 md:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/about-preview.jpg"
              alt="Strategic Buys team discussing property strategy"
              width={600}
              height={450}
              className="h-auto w-full object-cover"
            />
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <span className="inline-block h-0.5 w-7 bg-gold" />
              About Us
            </div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 lg:text-4xl">
              We Work for You. Never the Seller.
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Strategic Buys is a fully licensed, independent buyer&apos;s agency.
              Unlike real estate agents who represent the seller, we work exclusively
              for you &mdash; sourcing, evaluating, and negotiating property on your
              behalf.
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Our mission is to level the playing field for everyday Australians, giving
              you the same professional representation and market access that institutions
              and experienced investors enjoy.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-all hover:gap-3 hover:text-gold-dark"
            >
              About Our Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services Preview ──────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <span className="inline-block h-0.5 w-7 bg-gold" />
              What We Do
            </div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 lg:text-4xl">
              Expert Services for Every Buyer
            </h2>
            <p className="mx-auto mt-3 max-w-[600px] text-gray-500">
              From first-home buyers to seasoned investors, we provide tailored
              property buying services that save you time, money, and stress.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Property Sourcing",
                desc: "Access on-market and exclusive off-market properties through our extensive industry network.",
              },
              {
                icon: Handshake,
                title: "Expert Negotiation",
                desc: "Deep market knowledge, comparable sales data, and proven strategies to secure the best price and terms.",
              },
              {
                icon: BarChart3,
                title: "Portfolio Strategy",
                desc: "Data-driven investment strategies tailored to your financial goals, risk profile, and timeline.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-lg hover:border-transparent before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-gradient-to-r before:from-gold before:to-purple before:transition-transform before:duration-400 hover:before:scale-x-100"
              >
                <div className="mb-4 flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-gradient-to-br from-gold/[0.08] to-purple/[0.06] text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {desc}
                </p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-all hover:gap-2.5 hover:text-gold-dark"
                >
                  Learn More
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Help ───────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <span className="inline-block h-0.5 w-7 bg-gold" />
              Who We Help
            </div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 lg:text-4xl">
              Tailored for Every Buyer
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Home, title: "Home Buyers", desc: "Find your dream home with expert guidance and negotiation." },
              { icon: TrendingUp, title: "Property Investors", desc: "Data-driven strategies for building long-term wealth." },
              { icon: Hammer, title: "Home Builders", desc: "Expert land acquisition and development potential assessment." },
              { icon: Building2, title: "Residential Developers", desc: "Source development sites with strong feasibility." },
              { icon: TreePine, title: "Acreage Buyers", desc: "Specialist guidance for rural and acreage properties." },
              { icon: Heart, title: "NDIS Investors", desc: "Specialist disability accommodation investment support." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-6 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/[0.08] to-purple/[0.04] text-gold transition-all group-hover:scale-110 group-hover:shadow-[--shadow-gold]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-base font-bold text-gray-900">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ───────────────────────────────────────── */}
      <section className="gradient-hero py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-light">
              <span className="inline-block h-0.5 w-7 bg-gold-light" />
              Our Process
            </div>
            <h2 className="font-heading text-3xl font-bold text-white lg:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-3 max-w-[600px] text-white/60">
              A simple, proven process from first call to settlement &mdash; and beyond.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {processSteps.map((step) => (
              <div key={step.number} className="flex items-start gap-5 rounded-xl bg-white/[0.04] p-5">
                <div className="gradient-gold flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold text-white shadow-[--shadow-gold]">
                  {step.number}
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <span className="inline-block h-0.5 w-7 bg-gold" />
              Testimonials
            </div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 lg:text-4xl">
              What Our Clients Say
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "Strategic Buys saved us over $40,000 through expert negotiation. Their market knowledge is unmatched.",
                name: "Michael & Karen",
                role: "Home Buyers, Sydney",
                initials: "MK",
              },
              {
                quote:
                  "As an investor, I needed someone who understood the numbers. Our investment property has grown 12% in value since purchase.",
                name: "Sarah P.",
                role: "Property Investor, Melbourne",
                initials: "SP",
              },
              {
                quote:
                  "Auction day was stress-free. The team handled everything with precision and we secured our dream home under budget.",
                name: "David J.",
                role: "Home Buyer, Brisbane",
                initials: "DJ",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-gray-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Stars */}
                <div className="mb-3 flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="border-l-[3px] border-gold-light pl-4 font-accent text-base italic leading-relaxed text-gray-700">
                  {t.quote}
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-light to-purple-light text-xs font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <span className="inline-block h-0.5 w-7 bg-gold" />
              Why Choose Us
            </div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 lg:text-4xl">
              The Strategic Buys Difference
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "100% Independent", desc: "We never sell property. We only represent buyers." },
              { icon: Eye, title: "Off-Market Access", desc: "Access properties before they hit the public market." },
              { icon: LineChart, title: "Data-Driven", desc: "Every recommendation backed by market data and analysis." },
              { icon: HeadphonesIcon, title: "Post-Purchase Care", desc: "Support doesn't end at settlement. We're here for you." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="group p-6 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/[0.08] to-purple/[0.04] text-gold transition-all group-hover:scale-110 group-hover:shadow-[--shadow-gold]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-base font-bold text-gray-900">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Preview ──────────────────────────────────── */}
      {recentPosts.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                <span className="inline-block h-0.5 w-7 bg-gold" />
                Insights
              </div>
              <h2 className="font-heading text-3xl font-bold text-gray-900 lg:text-4xl">
                Latest from Our Blog
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
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
                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
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

      {/* ── CTA Banner ────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
