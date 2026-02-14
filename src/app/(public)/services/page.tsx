import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  BarChart3,
  Search,
  ShieldCheck,
  CheckCircle,
  Hammer,
  Building2,
  Heart,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { CTABanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";
import { servicePackages, processSteps, valueProps } from "@/lib/constants/services";

export const metadata: Metadata = {
  title: "Our Services | Buyer's Agent Services Australia",
  description:
    "Explore Strategic Buys' buyer's agent services: full service property buying, expert negotiation, auction bidding, and investment strategy across Australia.",
  alternates: { canonical: "/services" },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  BarChart3,
  Search,
  ShieldCheck,
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Buyer's Agent",
          provider: {
            "@type": "RealEstateAgent",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          areaServed: { "@type": "Country", name: "Australia" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Buyer's Agent Services",
            itemListElement: servicePackages.map((pkg) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: pkg.name,
                description: pkg.description,
              },
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Services" },
          ],
        }}
      />

      <PageHeader
        title="How We Help You"
        subtitle="Expert property buying services tailored to your goals. From search to settlement, we handle it all."
        breadcrumbs={[{ label: "Services" }]}
      />

      {/* ── Value Props ───────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {valueProps.map((vp) => {
            const Icon = iconMap[vp.icon] || Search;
            return (
              <div key={vp.title} className="group p-6 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold/[0.08] to-purple/[0.04] text-gold transition-all group-hover:scale-110 group-hover:shadow-[--shadow-gold]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-base font-bold text-gray-900">
                  {vp.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{vp.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Service Packages ──────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
              <span className="inline-block h-0.5 w-7 bg-gold" />
              Our Packages
            </div>
            <h2 className="font-heading text-3xl font-bold text-gray-900 lg:text-4xl">
              Choose Your Service
            </h2>
            <p className="mx-auto mt-3 max-w-[600px] text-gray-500">
              Whether you need end-to-end support or help at a specific stage,
              we have a package that fits.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {servicePackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl border-2 bg-white p-8 text-center transition-all hover:-translate-y-1 hover:shadow-lg ${
                  pkg.featured
                    ? "scale-[1.02] border-gold shadow-[--shadow-gold]"
                    : "border-gray-100"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-gold to-gold-dark px-3 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="font-heading text-xl font-bold text-gray-900">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{pkg.description}</p>
                <ul className="mt-6 mb-6 space-y-2 text-left">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 shrink-0 text-success" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                    pkg.featured
                      ? "gradient-gold text-white shadow-[--shadow-gold]"
                      : "border-2 border-gold text-gold-dark hover:bg-gold hover:text-white"
                  }`}
                >
                  {pkg.featured ? "Book a Free Call" : "Get Started"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We Serve ──────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          {/* Home Buyers */}
          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/service-homebuyer.jpg"
                alt="Happy couple receiving keys to their new home"
                width={600}
                height={380}
                className="h-auto w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-gray-900 lg:text-3xl">
                Home Buyers
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                Buying a home is one of the biggest decisions you&apos;ll ever
                make. We take the stress out of the process and help you find
                the perfect property at the right price.
              </p>
              <ul className="mt-4 space-y-2">
                {["Save time with a targeted, expert search", "Save money through professional negotiation", "Access off-market properties others never see"].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Investors */}
          <div className="mt-16 grid items-center gap-10 md:grid-cols-2 lg:gap-16">
            <div className="order-2 md:order-1">
              <h3 className="font-heading text-2xl font-bold text-gray-900 lg:text-3xl">
                Property Investors
              </h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                Building wealth through property requires more than just picking
                a suburb. We provide data-driven investment strategy tailored to
                your financial goals.
              </p>
              <ul className="mt-4 space-y-2">
                {["Portfolio strategy aligned to your goals", "Growth corridor identification", "Cashflow analysis and projections"].map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="mt-0.5 h-[18px] w-[18px] shrink-0 text-gold" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 overflow-hidden rounded-2xl shadow-lg md:order-2">
              <Image
                src="/images/service-investor.jpg"
                alt="Modern investment property"
                width={600}
                height={380}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>

          {/* Additional types */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { icon: Hammer, title: "Home Builders", desc: "Expert land acquisition and development potential assessment for your dream build." },
              { icon: Building2, title: "Developers", desc: "Source development sites with strong feasibility and growth potential." },
              { icon: Heart, title: "NDIS Investors", desc: "Specialist Disability Accommodation investment guidance and property sourcing." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-gray-100 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold/[0.08] to-purple/[0.04] text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="font-heading text-lg font-bold text-gray-900">{title}</h4>
                <p className="mt-2 text-sm text-gray-500">{desc}</p>
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
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {processSteps.map((step) => (
              <div key={step.number} className="flex items-start gap-5 rounded-xl bg-white/[0.04] p-5">
                <div className="gradient-gold flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full font-heading text-lg font-bold text-white shadow-[--shadow-gold]">
                  {step.number}
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-white">{step.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Not Sure Which Service Is Right for You?"
        subtitle="Book a free, no-obligation consultation and we'll recommend the best approach for your situation."
      />
    </>
  );
}
