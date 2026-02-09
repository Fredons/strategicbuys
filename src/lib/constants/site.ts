export const siteConfig = {
  name: "Strategic Buys",
  description:
    "Strategic Buys is Australia's trusted buyer's agency. Expert property sourcing, negotiation & investment strategy for home buyers and investors nationwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://strategicbuys.com.au",
  email: "info@strategicbuys.com.au",
  phone: "1300 BUYS AU",
  phoneHref: "tel:1300289728",
  hours: "Mon\u2013Sun: 9:00 AM\u20135:00 PM AEST",
  abn: "XX XXX XXX XXX", // TODO: Replace with real ABN
  address: {
    street: "", // TODO: Replace with real address
    city: "",
    state: "",
    postcode: "",
    country: "Australia",
  },
  social: {
    facebook: "#", // TODO: Replace with real URLs
    instagram: "#",
    linkedin: "#",
  },
  stats: {
    propertyTransacted: "$100M+",
    happyClients: "500+",
    yearsExperience: "15+",
    rating: 4.9,
    reviewCount: 127,
  },
} as const;
