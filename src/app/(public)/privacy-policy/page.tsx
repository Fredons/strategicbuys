import { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Strategic Buys privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Privacy Policy" },
          ],
        }}
      />

      <PageHeader
        title="Privacy Policy"
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <section className="py-14 lg:py-20">
        <div className="prose prose-gray mx-auto max-w-[800px] px-6 prose-headings:font-heading prose-headings:font-bold lg:px-8">
          <p className="text-sm text-gray-500">
            Last updated: February 2025
          </p>

          <h2>1. Introduction</h2>
          <p>
            Strategic Buys (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website or use our
            services.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>
            We may collect personal information that you voluntarily provide to
            us when you:
          </p>
          <ul>
            <li>Fill out a contact form or enquiry form</li>
            <li>Subscribe to our newsletter</li>
            <li>Request a consultation</li>
            <li>Communicate with us via email or phone</li>
          </ul>
          <p>
            This information may include your name, email address, phone number,
            property preferences, budget range, and any other details you choose
            to provide.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain
            information such as your IP address, browser type, operating system,
            referring URLs, and browsing behaviour on our site.
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your enquiries and provide our buyer&apos;s agent services</li>
            <li>Send you property-related communications and updates</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
            <li>Send you marketing communications (with your consent)</li>
          </ul>

          <h2>4. Information Sharing</h2>
          <p>
            We do not sell or rent your personal information to third parties. We
            may share your information with:
          </p>
          <ul>
            <li>Service providers who assist us in operating our website and services</li>
            <li>Legal authorities when required by law</li>
            <li>Professional advisers such as lawyers and accountants</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organisational measures to
            protect your personal information against unauthorised access,
            alteration, disclosure, or destruction.
          </p>

          <h2>6. Your Rights</h2>
          <p>Under the Australian Privacy Act 1988, you have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2>7. Cookies</h2>
          <p>
            Our website may use cookies and similar tracking technologies to
            enhance your browsing experience. You can control cookie settings
            through your browser preferences.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices of these external sites.
          </p>

          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
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
