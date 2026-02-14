import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Phone,
  CheckCircle,
  ArrowRight,
  Search,
  Handshake,
  ShieldCheck,
  Users,
} from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { CTABanner } from "@/components/shared/cta-banner";
import { siteConfig } from "@/lib/constants/site";
import { locations, type LocationData } from "@/lib/constants/locations";
import { processSteps, servicePackages } from "@/lib/constants/services";

interface LocationPageProps {
  params: Promise<{ location: string }>;
}

function getLocation(slug: string): LocationData | undefined {
  return locations.find((loc) => loc.slug === slug);
}

export function generateStaticParams() {
  return locations.map((loc) => ({ location: loc.slug }));
}

export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return { title: "Not Found" };

  return {
    title: loc.metaTitle,
    description: loc.metaDescription,
    alternates: { canonical: `/${loc.slug}` },
    openGraph: {
      title: loc.metaTitle,
      description: loc.metaDescription,
    },
  };
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { location: slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const whyUs = [
    {
      icon: Search,
      title: `Local ${loc.city} Market Knowledge`,
      description: `We understand ${loc.city}'s diverse suburbs, growth corridors, and pricing dynamics to help you buy smarter.`,
    },
    {
      icon: Handshake,
      title: "Expert Negotiation",
      description: `Our negotiators have secured millions in savings for buyers across ${loc.stateShort}. We fight for the best price and terms.`,
    },
    {
      icon: ShieldCheck,
      title: "Off-Market Access",
      description: `Our network of agents and contacts in ${loc.city} gives you access to properties before they hit the open market.`,
    },
    {
      icon: Users,
      title: "Your Interests Only",
      description:
        "Unlike selling agents, we work exclusively for you. No conflicts of interest — just honest, strategic advice.",
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: siteConfig.name,
          description: loc.metaDescription,
          url: `${siteConfig.url}/${loc.slug}`,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          areaServed: {
            "@type": "City",
            name: loc.city,
            containedInPlace: {
              "@type": "State",
              name: loc.state,
            },
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: loc.latitude,
            longitude: loc.longitude,
          },
          openingHours: "Mo-Su 09:00-17:00",
          priceRange: "$$",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteConfig.url,
            },
            { "@type": "ListItem", position: 2, name: loc.heroTitle },
          ],
        }}
      />

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="pointer-events-none absolute -top-[40%] -right-[20%] h-[500px] w-[500px] rounded-full bg-gold/[0.04]" />
        <div className="mx-auto max-w-[1200px] px-6 text-center lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-gold-lighter">
            <MapPin className="h-3.5 w-3.5" />
            {loc.city}, {loc.stateShort}
          </div>
          <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {loc.heroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-[600px] text-base text-white/70 lg:text-lg">
            {loc.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="gradient-gold inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-sm font-bold text-white shadow-[--shadow-gold] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-gold-lighter"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
              Why Choose a Buyer&apos;s Agent in {loc.city}?
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Buying property in {loc.city} is competitive. A dedicated
              buyer&apos;s agent gives you an unfair advantage.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10">
                  <item.icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mb-2 font-heading text-base font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-gray-100 bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
              Our Services in {loc.city}
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Whether you&apos;re a first-home buyer, upgrader, or investor, we
              have a service tailored for you.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {servicePackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-xl border bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md ${
                  pkg.featured
                    ? "border-gold shadow-[0_4px_20px_rgba(184,134,11,0.1)]"
                    : "border-gray-100"
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="font-heading text-lg font-bold text-gray-900">
                  {pkg.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{pkg.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-6 block rounded-lg py-3 text-center text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                    pkg.featured
                      ? "gradient-gold text-white"
                      : "border border-gray-200 text-gray-700 hover:border-gold hover:text-gold"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <div className="mx-auto max-w-[600px] text-center">
            <h2 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
              How It Works
            </h2>
            <p className="mt-3 text-sm text-gray-600">
              Our proven 4-step process makes buying property in {loc.city}{" "}
              simple and stress-free.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="gradient-gold mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white">
                  {step.number}
                </div>
                <h3 className="mb-2 font-heading text-base font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Locations */}
      <section className="border-t border-gray-100 bg-gray-50 py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold text-gray-900">
            We Also Serve
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {locations
              .filter((l) => l.slug !== loc.slug)
              .map((l) => (
                <Link
                  key={l.slug}
                  href={`/${l.slug}`}
                  className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-all hover:border-gold hover:text-gold"
                >
                  {l.city}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={`Ready to Buy in ${loc.city}?`}
        subtitle={`Book a free strategy call and discover how we can help you secure your ideal property in ${loc.city}.`}
      />
    </>
  );
}
