import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Strategic Buys terms of service. Understand the terms and conditions governing your use of our website and buyer's agent services.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Terms of Service" },
          ],
        }}
      />

      <PageHeader
        title="Terms of Service"
        breadcrumbs={[{ label: "Terms of Service" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="prose prose-gray mx-auto max-w-[800px] px-6 prose-headings:font-heading prose-headings:font-bold lg:px-8">
          <p className="text-sm text-gray-500">
            Last updated: February 2025
          </p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the Strategic Buys website and services, you
            agree to be bound by these Terms of Service. If you do not agree to
            these terms, please do not use our website or services.
          </p>

          <h2>2. Services</h2>
          <p>
            Strategic Buys provides buyer&apos;s agent services including property
            sourcing, negotiation, auction bidding, and investment strategy
            advice. Our services are available across Australia.
          </p>

          <h2>3. Use of Website</h2>
          <p>You agree to use our website only for lawful purposes and in a way that does not:</p>
          <ul>
            <li>Infringe the rights of others</li>
            <li>Restrict or inhibit anyone else&apos;s use of the website</li>
            <li>Introduce viruses or other malicious software</li>
            <li>Attempt to gain unauthorised access to our systems</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images,
            and software, is the property of Strategic Buys or its content
            suppliers and is protected by Australian and international copyright
            laws.
          </p>

          <h2>5. Service Agreements</h2>
          <p>
            Our buyer&apos;s agent services are governed by separate service
            agreements that will be provided to you before any engagement
            commences. These Terms of Service apply to your use of our website
            and do not replace any service-specific agreements.
          </p>

          <h2>6. Disclaimers</h2>
          <p>
            The information provided on this website is for general
            informational purposes only. While we strive to keep information
            accurate and up to date, we make no warranties or representations
            about the completeness, accuracy, or reliability of any information
            on our website.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by Australian law, Strategic Buys
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of our
            website or services.
          </p>

          <h2>8. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless Strategic Buys, its
            officers, directors, employees, and agents from any claims, losses,
            damages, liabilities, and expenses arising from your use of our
            website or violation of these terms.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These terms are governed by the laws of the Commonwealth of
            Australia. Any disputes arising from these terms shall be subject to
            the exclusive jurisdiction of the courts of Australia.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting on our website. Your continued
            use of our website after changes constitutes acceptance of the
            modified terms.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
