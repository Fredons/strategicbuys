export const siteConfig = {
  name: "Strategic Buys",
  legalName: "Strategic Buys Pty Ltd",
  description:
    "Strategic Buys is Australia's trusted buyer's agency. Expert property sourcing, negotiation & investment strategy for home buyers and investors nationwide.",
  longDescription:
    "Strategic Buys is a licensed, independent buyer's agency helping Australians purchase residential and commercial property. We work exclusively for buyers — never sellers. Our services include property sourcing, expert negotiation, auction bidding, investment strategy, and NDIS property investment across all major Australian cities.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://strategicbuys.com.au",
  email: "support@strategicbuys.com.au",
  hours: "Mon\u2013Sun: 9:00 AM\u20135:00 PM AEST",
  abn: "22 691 484 321",
  foundingDate: "2010",
  serviceArea: {
    type: "Country" as const,
    name: "Australia",
    cities: [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Perth",
      "Adelaide",
      "Gold Coast",
      "Canberra",
      "Hobart",
    ],
  },
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
  stats: {
    propertyTransacted: "$100M+",
    happyClients: "300+",
    yearsExperience: "10+",
    rating: 5.0,
    reviewCount: 127,
  },
} as const;
