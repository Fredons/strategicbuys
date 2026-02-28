import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Strategic Buys | Australia's Trusted Buyer's Agency",
    template: "%s | Strategic Buys",
  },
  description:
    "Strategic Buys is Australia's trusted buyer's agency. Expert property sourcing, negotiation & investment strategy for home buyers and investors nationwide.",
  keywords: [
    "buyers agent Australia",
    "buyers advocate",
    "buyers advocate Australia",
    "property buyer agent",
    "buyer's agency",
    "buyer's agency Australia",
    "investment property Australia",
    "off-market properties",
    "property negotiation",
    "auction bidding Australia",
    "buyer's agent Sydney",
    "buyer's agent Melbourne",
    "buyer's agent Brisbane",
    "buyer's agent Perth",
    "buyer's agent Adelaide",
    "buyer's agent Gold Coast",
    "buyer's agent Canberra",
    "buyer's agent Hobart",
    "property investment strategy",
    "first home buyer agent",
    "NDIS property investment",
    "property sourcing Australia",
    "independent buyers agent",
  ],
  authors: [{ name: "Strategic Buys" }],
  creator: "Strategic Buys",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://strategicbuys.com.au"
  ),
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Strategic Buys",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Strategic Buys - Australia's Trusted Buyer's Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable}`}
    >
      <body className="font-body antialiased">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
