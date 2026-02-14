import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Eye, Heart, Users, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { CTABanner } from "@/components/shared/cta-banner";
import { SectionHeader } from "@/components/shared/section-header";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "About Us | Licensed Independent Buyer's Agents",
  description:
    "Strategic Buys is a fully licensed, independent buyer's agency. We work exclusively for property buyers across Australia — never sellers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          mainEntity: {
            "@type": "Organization",
            name: siteConfig.name,
            foundingDate: "2010",
            url: siteConfig.url,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "About" },
          ],
        }}
      />

      <PageHeader
        title="About Strategic Buys"
        subtitle="Licensed. Independent. 100% on your side. Always."
        breadcrumbs={[{ label: "About" }]}
      />

      {/* ── Our Story ─────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 md:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="overflow-hidden rounded-2xl shadow-lg ring-4 ring-gold/10 ring-offset-4 ring-offset-white">
            <Image
              src="/images/about-story.jpg"
              alt="Strategic Buys property strategy meeting"
              width={600}
              height={450}
              className="h-auto w-full object-cover"
            />
          </div>
          <div>
            <SectionHeader
              label="Our Story"
              title="Founded on a Simple Belief"
              align="left"
            />
            <p className="mt-4 leading-relaxed text-gray-600">
              Strategic Buys was founded because we believed everyday Australians
              deserved the same level of professional representation in property
              transactions that institutions and wealthy investors have always
              enjoyed.
            </p>
            <p className="mt-3 leading-relaxed text-gray-600">
              As a fully licensed and independent buyer&apos;s agency, we work
              exclusively for buyers &mdash; never sellers. This means our only
              objective is to get you the best possible property at the best
              possible price.
            </p>
            <p className="mt-3 leading-relaxed text-gray-600">
              Our core promise is simple: we treat your property purchase as if
              it were our own.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────── */}
      <section className="gradient-hero py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] px-6 text-center lg:px-8">
          <SectionHeader label="Our Mission" title="" theme="dark" />
          <div className="relative mt-4">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 font-accent text-8xl leading-none text-gold/10">
              &ldquo;
            </span>
            <blockquote className="relative font-accent text-xl italic leading-relaxed text-white/90 lg:text-2xl">
              Our mission is to protect the interests of property buyers and
              help everyday Australians build lasting wealth through smart,
              strategic property decisions &mdash; with expert guidance they can
              trust at every step of the journey.
            </blockquote>
          </div>
          <p className="mt-6 text-sm font-semibold text-gold-light">
            &mdash; The Strategic Buys Team
          </p>
        </div>
      </section>

      {/* ── Our Values ────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <SectionHeader label="Our Values" title="What We Stand For" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { icon: ShieldCheck, title: "Integrity", desc: "We tell you what you need to hear, not what you want to hear. Honest advice, always." },
              { icon: Eye, title: "Transparency", desc: "No hidden fees, no surprises. Everything is upfront and clearly communicated." },
              { icon: Heart, title: "Accountability", desc: "We treat your money like our own. Every decision is made with your best interest in mind." },
              { icon: Users, title: "Client-First", desc: "Your interests come first, always. We never represent sellers or accept referral fees." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-gold/10 to-purple/5">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-gray-900">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Sets Us Apart ────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 md:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <SectionHeader
              label="Why Us"
              title="What Sets Us Apart"
              align="left"
            />
            <ul className="mt-6 space-y-3">
              {[
                "100% independent — we never sell property",
                "Licensed and insured buyer's agents",
                "Access to off-market and pre-market opportunities",
                "Data-driven property analysis and valuation",
                "Expert negotiation that consistently saves clients money",
                "Support from search through to settlement and beyond",
              ].map((item, idx) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full gradient-gold text-[10px] font-bold text-white">
                    {idx + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg ring-4 ring-gold/10 ring-offset-4 ring-offset-white">
            <Image
              src="/images/why-us.jpg"
              alt="Modern Australian property"
              width={600}
              height={450}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Work With a Team That Puts You First?"
        subtitle="Book a free, no-obligation consultation and discover the Strategic Buys difference."
      />
    </>
  );
}
