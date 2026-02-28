import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const socialLinks = [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
  ].filter((url) => url !== "#");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          legalName: siteConfig.legalName,
          url: siteConfig.url,
          logo: `${siteConfig.url}/images/PNG.png`,
          description: siteConfig.longDescription,
          foundingDate: siteConfig.foundingDate,
          contactPoint: {
            "@type": "ContactPoint",
            email: siteConfig.email,
            contactType: "customer service",
            availableLanguage: "English",
            areaServed: "AU",
          },
          areaServed: siteConfig.serviceArea.cities.map((city) => ({
            "@type": "City",
            name: city,
            containedInPlace: {
              "@type": "Country",
              name: "Australia",
            },
          })),
          ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
