import { Metadata } from "next";
import { Phone, Mail, Clock } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Contact Us | Book a Free Property Consultation",
  description:
    "Book a free, no-obligation consultation with Strategic Buys. Contact our licensed buyer's agents to discuss your property goals. Available 7 days a week across Australia.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          mainEntity: {
            "@type": "RealEstateAgent",
            name: siteConfig.name,
            telephone: siteConfig.phone,
            email: siteConfig.email,
            openingHours: "Mo-Su 09:00-17:00",
            areaServed: { "@type": "Country", name: "Australia" },
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Contact" },
          ],
        }}
      />

      <PageHeader
        title="Let's Talk Property"
        subtitle="Book a free, no-obligation strategy call. Tell us your goals — we'll show you how we can help you buy smarter."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-6 md:grid-cols-[1.2fr_1fr] lg:gap-16 lg:px-8">
          {/* Form */}
          <div>
            {/* Prominent phone CTA */}
            <div className="mb-8 rounded-xl bg-gradient-to-r from-gold/5 to-purple/5 p-6 text-center lg:text-left">
              <p className="text-sm font-semibold text-gray-600">Prefer to talk?</p>
              <a href={siteConfig.phoneHref} className="font-heading text-2xl font-bold text-gold hover:text-gold-dark">
                {siteConfig.phone}
              </a>
              <p className="mt-1 text-xs text-gray-500">Available 7 days, 9AM–5PM AEST</p>
            </div>

            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              <Clock className="h-3 w-3" />
              We respond within 24 hours
            </div>

            <h2 className="font-heading text-2xl font-bold text-gray-900">
              Send Us a Message
            </h2>
            <p className="mt-1 mb-6 text-sm text-gray-600">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
            <ContactForm />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-heading text-lg font-bold text-gray-900">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-semibold text-gray-800">{siteConfig.phone}</div>
                    <div className="text-gray-500">Available 7 days a week</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-semibold text-gray-800">{siteConfig.email}</div>
                    <div className="text-gray-500">We respond within 24 hours</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-semibold text-gray-800">{siteConfig.hours}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-heading text-lg font-bold text-gray-900">
                What to Expect
              </h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "We'll call you back", desc: "Within 24 hours of your enquiry." },
                  { step: "2", title: "Free 30-minute consultation", desc: "Discuss your goals, budget, and how we can help." },
                  { step: "3", title: "Tailored strategy", desc: "Receive a personalised buying plan designed around your needs." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="gradient-gold flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white">
                      {item.step}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
