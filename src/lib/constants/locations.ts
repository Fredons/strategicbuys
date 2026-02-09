export interface LocationData {
  slug: string;
  city: string;
  state: string;
  stateShort: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  latitude: number;
  longitude: number;
}

export const locations: LocationData[] = [
  {
    slug: "buyers-agent-sydney",
    city: "Sydney",
    state: "New South Wales",
    stateShort: "NSW",
    metaTitle: "Buyer's Agent Sydney | Strategic Buys",
    metaDescription:
      "Looking for a buyer's agent in Sydney? Strategic Buys provides expert property sourcing, negotiation, and investment strategy across Greater Sydney. Book a free consultation.",
    heroTitle: "Buyer's Agent in Sydney",
    heroSubtitle:
      "Expert property sourcing, negotiation, and investment strategy across Greater Sydney and surrounds.",
    latitude: -33.8688,
    longitude: 151.2093,
  },
  {
    slug: "buyers-agent-melbourne",
    city: "Melbourne",
    state: "Victoria",
    stateShort: "VIC",
    metaTitle: "Buyer's Agent Melbourne | Strategic Buys",
    metaDescription:
      "Strategic Buys is your trusted buyer's agent in Melbourne. Expert property sourcing, auction bidding, and negotiation across Greater Melbourne. Free consultation available.",
    heroTitle: "Buyer's Agent in Melbourne",
    heroSubtitle:
      "Trusted buyer's advocacy across Greater Melbourne \u2014 from inner suburbs to growth corridors.",
    latitude: -37.8136,
    longitude: 144.9631,
  },
  {
    slug: "buyers-agent-brisbane",
    city: "Brisbane",
    state: "Queensland",
    stateShort: "QLD",
    metaTitle: "Buyer's Agent Brisbane | Strategic Buys",
    metaDescription:
      "Find your ideal property in Brisbane with Strategic Buys. Licensed buyer's agents offering property sourcing, negotiation, and investment advice across Brisbane.",
    heroTitle: "Buyer's Agent in Brisbane",
    heroSubtitle:
      "Navigate Brisbane's booming property market with a licensed buyer's advocate by your side.",
    latitude: -27.4698,
    longitude: 153.0251,
  },
  {
    slug: "buyers-agent-perth",
    city: "Perth",
    state: "Western Australia",
    stateShort: "WA",
    metaTitle: "Buyer's Agent Perth | Strategic Buys",
    metaDescription:
      "Strategic Buys is a licensed buyer's agent in Perth, WA. Expert property sourcing, negotiation, and investment strategy across Greater Perth. Book a free call today.",
    heroTitle: "Buyer's Agent in Perth",
    heroSubtitle:
      "Your trusted buyer's advocate in Perth \u2014 accessing on-market and off-market opportunities across WA.",
    latitude: -31.9505,
    longitude: 115.8605,
  },
  {
    slug: "buyers-agent-adelaide",
    city: "Adelaide",
    state: "South Australia",
    stateShort: "SA",
    metaTitle: "Buyer's Agent Adelaide | Strategic Buys",
    metaDescription:
      "Looking for a buyer's agent in Adelaide? Strategic Buys offers expert property sourcing, negotiation, and investment strategy across South Australia.",
    heroTitle: "Buyer's Agent in Adelaide",
    heroSubtitle:
      "Expert property buying services across Adelaide and South Australia.",
    latitude: -34.9285,
    longitude: 138.6007,
  },
  {
    slug: "buyers-agent-gold-coast",
    city: "Gold Coast",
    state: "Queensland",
    stateShort: "QLD",
    metaTitle: "Buyer's Agent Gold Coast | Strategic Buys",
    metaDescription:
      "Strategic Buys is your trusted buyer's agent on the Gold Coast. Expert property sourcing and negotiation for home buyers and investors across the Gold Coast region.",
    heroTitle: "Buyer's Agent on the Gold Coast",
    heroSubtitle:
      "Expert buyer's advocacy across the Gold Coast \u2014 from Coolangatta to Coomera and beyond.",
    latitude: -28.0167,
    longitude: 153.4,
  },
  {
    slug: "buyers-agent-canberra",
    city: "Canberra",
    state: "Australian Capital Territory",
    stateShort: "ACT",
    metaTitle: "Buyer's Agent Canberra | Strategic Buys",
    metaDescription:
      "Find your ideal property in Canberra with Strategic Buys. Licensed buyer's agents offering property sourcing and negotiation across the ACT.",
    heroTitle: "Buyer's Agent in Canberra",
    heroSubtitle:
      "Professional buyer's advocacy across Canberra and the surrounding ACT region.",
    latitude: -35.2809,
    longitude: 149.13,
  },
  {
    slug: "buyers-agent-hobart",
    city: "Hobart",
    state: "Tasmania",
    stateShort: "TAS",
    metaTitle: "Buyer's Agent Hobart | Strategic Buys",
    metaDescription:
      "Strategic Buys is a licensed buyer's agent in Hobart. Expert property sourcing and negotiation for buyers across Tasmania. Book a free consultation.",
    heroTitle: "Buyer's Agent in Hobart",
    heroSubtitle:
      "Trusted buyer's advocacy in Hobart and across Tasmania.",
    latitude: -42.8821,
    longitude: 147.3272,
  },
];
