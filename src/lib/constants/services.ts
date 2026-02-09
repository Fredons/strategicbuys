export const serviceCategories = [
  {
    title: "Home Buyers",
    description:
      "Buying a home is one of the biggest decisions you will ever make. We take the stress out of the process and help you find the perfect property.",
    icon: "Home" as const,
    benefits: [
      "Save time with targeted search",
      "Save money through expert negotiation",
      "Access off-market properties",
    ],
  },
  {
    title: "Property Investors",
    description:
      "Building wealth through property requires more than picking a suburb. We provide data-driven investment strategy tailored to your goals.",
    icon: "TrendingUp" as const,
    benefits: [
      "Portfolio strategy aligned to your goals",
      "Growth corridor identification",
      "Cashflow analysis and projections",
    ],
  },
  {
    title: "Home Builders",
    description:
      "Looking to build? We help you find the right land and assess development potential for your dream build.",
    icon: "Hammer" as const,
    benefits: [],
  },
  {
    title: "Residential Developers",
    description:
      "We source development sites with strong feasibility and growth potential for residential developers.",
    icon: "Building2" as const,
    benefits: [],
  },
  {
    title: "Acreage Buyers",
    description:
      "Specialist guidance for rural and acreage property purchases across Australia.",
    icon: "TreePine" as const,
    benefits: [],
  },
  {
    title: "NDIS Investors",
    description:
      "Specialist Disability Accommodation offers attractive returns with genuine social impact. We guide you through the complexities.",
    icon: "Heart" as const,
    benefits: [],
  },
] as const;

export const servicePackages = [
  {
    name: "Negotiation Service",
    description:
      "You've found the property \u2014 we'll get you the best price and terms.",
    featured: false,
    features: [
      "Comprehensive property review",
      "Market valuation & comparable analysis",
      "Expert advice on property suitability",
      "Tailored negotiation strategy",
      "Contract negotiation & terms review",
    ],
  },
  {
    name: "Full Service",
    description:
      "Complete end-to-end buying experience \u2014 from brief to settlement and beyond.",
    featured: true,
    features: [
      "Detailed property brief & needs analysis",
      "Personalised buying strategy creation",
      "On-market & off-market property search",
      "Private inspections & shortlisting",
      "Expert negotiation on your behalf",
      "Due diligence & risk assessment",
      "Settlement coordination",
      "Post-settlement care & ongoing support",
    ],
  },
  {
    name: "Auction Bidding",
    description:
      "A professional bidder in your corner on auction day \u2014 cool, calm, and strategic.",
    featured: false,
    features: [
      "Pre-auction property inspection",
      "Market analysis & valuation report",
      "Pre-auction strategy consultation",
      "Tailored bidding strategy & limit advice",
      "Registration & professional bidding",
    ],
  },
] as const;

export const processSteps = [
  {
    number: 1,
    title: "Free Consultation",
    description:
      "A free, no-obligation conversation about your goals, budget, and timeline. We listen first, then advise.",
  },
  {
    number: 2,
    title: "Strategic Search",
    description:
      "We search on-market, off-market, and pre-market channels to find properties that match your criteria.",
  },
  {
    number: 3,
    title: "Expert Negotiation",
    description:
      "Using comparable sales data and proven tactics, we negotiate the best price and terms on your behalf.",
  },
  {
    number: 4,
    title: "Settlement & Beyond",
    description:
      "We coordinate due diligence, inspections, and settlement \u2014 and support you even after the keys are in your hand.",
  },
] as const;

export const valueProps = [
  {
    title: "Personalised Guidance",
    description:
      "We take the time to understand your unique goals \u2014 whether you are a first-time buyer, seasoned investor, or upsizing family.",
    icon: "Users" as const,
  },
  {
    title: "Market Mastery",
    description:
      "Deep understanding of Australian property market trends, valuations, and growth corridors across all capital cities.",
    icon: "BarChart3" as const,
  },
  {
    title: "Strategic Searching",
    description:
      "Access to both on-market and exclusive off-market listings through our network of industry contacts.",
    icon: "Search" as const,
  },
  {
    title: "Stress-Free Experience",
    description:
      "From property evaluation through to settlement, we manage every detail so you do not have to.",
    icon: "ShieldCheck" as const,
  },
] as const;
