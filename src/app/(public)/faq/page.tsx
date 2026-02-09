import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CTABanner } from "@/components/shared/cta-banner";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";
import { faqGroups } from "@/lib/constants/faq";

export const metadata: Metadata = {
  title: "FAQ | Buyer's Agent Questions Answered",
  description:
    "Frequently asked questions about buyer's agents in Australia. Learn about fees, process, timelines, and why using a buyer's advocate like Strategic Buys can save you money.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  // Flatten all FAQ items for schema
  const allFaqItems = faqGroups.flatMap((g) => g.items);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: allFaqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "FAQ" },
          ],
        }}
      />

      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about working with a buyer's agent and how Strategic Buys can help you buy smarter."
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] px-6 lg:px-8">
          {faqGroups.map((group) => (
            <div key={group.title} className="mb-10">
              <h2 className="mb-4 font-heading text-xl font-bold text-gray-900">
                {group.title}
              </h2>
              <FaqAccordion items={group.items} />
            </div>
          ))}
        </div>
      </section>

      <CTABanner
        title="Still Have Questions?"
        subtitle="Book a free, no-obligation consultation and we'll answer all your questions in person."
      />
    </>
  );
}
