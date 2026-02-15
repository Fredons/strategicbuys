export const siteConfig = {
  name: "Strategic Buys",
  description:
    "Strategic Buys is Australia's trusted buyer's agency. Expert property sourcing, negotiation & investment strategy for home buyers and investors nationwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://strategicbuys.com.au",
  email: "support@strategicbuys.com.au",
  hours: "Mon\u2013Sun: 9:00 AM\u20135:00 PM AEST",
  abn: "22 691 484 321",
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
    happyClients: "300+",
    yearsExperience: "10+",
    rating: 5.0,
    reviewCount: 127,
  },
} as const;
