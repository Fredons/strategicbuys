import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the Strategic Buys disclaimer. Important information about our buyer's agent services and website content.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Disclaimer" },
          ],
        }}
      />

      <PageHeader
        title="Disclaimer"
        breadcrumbs={[{ label: "Disclaimer" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="prose prose-gray mx-auto max-w-[800px] px-6 prose-headings:font-heading prose-headings:font-bold lg:px-8">
          <p className="text-sm text-gray-400">
            Last updated: February 2025
          </p>

          <h2>General Disclaimer</h2>
          <p>
            The information provided on the Strategic Buys website is for
            general informational purposes only. All information on the site is
            provided in good faith; however, we make no representation or
            warranty of any kind, express or implied, regarding the accuracy,
            adequacy, validity, reliability, availability, or completeness of
            any information on the site.
          </p>

          <h2>Not Financial or Investment Advice</h2>
          <p>
            The content on this website does not constitute financial advice,
            investment advice, or any other type of advice. You should not make
            any financial, investment, trading, or other decision based solely
            on the information presented on this website without undertaking
            independent due diligence and consultation with a professional
            financial adviser.
          </p>

          <h2>Property Information</h2>
          <p>
            While we endeavour to ensure that property market information, data,
            and commentary on our website are current and accurate, we do not
            warrant the accuracy or completeness of this information. Property
            markets are inherently unpredictable, and past performance is not a
            reliable indicator of future results.
          </p>

          <h2>Third-Party Content</h2>
          <p>
            Our website may contain links to external websites, articles, or
            resources that are not provided or maintained by Strategic Buys. We
            do not guarantee the accuracy, relevance, timeliness, or
            completeness of any information on these external websites.
          </p>

          <h2>Testimonials</h2>
          <p>
            Any testimonials or reviews displayed on our website reflect the
            individual experiences of those clients. Results may vary, and
            testimonials are not necessarily representative of all experiences
            with our services.
          </p>

          <h2>Professional Services</h2>
          <p>
            Strategic Buys is a licensed buyer&apos;s agent operating in
            accordance with Australian real estate regulations. All professional
            services are subject to individual service agreements and the terms
            set out within those agreements.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            Under no circumstances shall Strategic Buys be held liable for any
            loss or damage of any kind incurred as a result of the use of this
            website or reliance on any information provided on this website.
            Your use of the site and your reliance on any information on the
            site is solely at your own risk.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this disclaimer, please contact us
            at:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li>
              Phone:{" "}
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                {siteConfig.phone}
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
