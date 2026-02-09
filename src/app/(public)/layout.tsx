import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          logo: `${siteConfig.url}/images/PNG.png`,
          description: siteConfig.description,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: siteConfig.phone,
            email: siteConfig.email,
            contactType: "customer service",
            availableLanguage: "English",
            areaServed: "AU",
          },
          sameAs: [
            siteConfig.social.facebook,
            siteConfig.social.instagram,
            siteConfig.social.linkedin,
          ].filter((url) => url !== "#"),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
        }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
