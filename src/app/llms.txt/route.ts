import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/constants/site";
import { locations } from "@/lib/constants/locations";

export async function GET() {
  const content = `# ${siteConfig.name}

> ${siteConfig.description}

## About
Strategic Buys is a licensed, independent buyer's agency (buyer's advocate) operating across all major Australian capital cities since ${siteConfig.foundingDate}. We help home buyers, property investors, developers, and NDIS investors purchase residential and commercial property with expert guidance, negotiation, and strategy.

We work exclusively for buyers — never sellers. This means we have zero conflicts of interest. Our goal is to save our clients time, money, and stress by providing professional property representation that was previously only available to institutional buyers and experienced investors.

ABN: ${siteConfig.abn}

## Core Services
- **Full Service Property Buying**: End-to-end buyer's agent service from property brief to settlement. Includes property search, shortlisting, due diligence, negotiation, and settlement support.
- **Negotiation Service**: Expert negotiation for properties you've already found. We use comparable sales data, market analysis, and proven tactics to secure the best price and terms.
- **Auction Bidding**: Professional auction bidding representation. We handle the strategy, bidding, and emotional pressure so you don't have to.
- **Investment Strategy**: Data-driven property investment advice and portfolio strategy. We help you identify growth corridors, analyse cash flow, and build long-term wealth.
- **NDIS Property Investment**: Specialist Disability Accommodation (SDA) investment guidance. We source NDIS-compliant properties with strong yield potential.

## Who We Help
- **First-Home Buyers**: Guidance through the entire buying process, from pre-approval to settlement
- **Property Investors**: Portfolio strategy, growth corridor identification, cash flow analysis
- **Home Upgraders & Downsizers**: Finding the right next property while maximising the sale of your current home
- **Developers**: Land acquisition, development site sourcing, feasibility assessment
- **NDIS Investors**: SDA property sourcing and investment strategy

## Key Differentiators
- 100% independent — we never represent sellers
- Licensed and insured buyer's agents
- ${siteConfig.stats.happyClients} clients served across all capital cities
- ${siteConfig.stats.yearsExperience} years of experience in the Australian property market
- ${siteConfig.stats.propertyTransacted} in property transacted
- ${siteConfig.stats.rating}★ average rating from ${siteConfig.stats.reviewCount} reviews
- Access to off-market properties through extensive agent network
- Data-driven approach combining local market knowledge with property analytics

## Our Process
1. **Free Strategy Call**: We discuss your goals, budget, timeline, and property criteria
2. **Property Search**: We search on-market and off-market properties matching your brief
3. **Due Diligence & Negotiation**: We evaluate shortlisted properties and negotiate the best terms
4. **Settlement Support**: We guide you through to settlement and beyond

## Service Areas
${locations.map((loc) => `- **${loc.city}, ${loc.stateShort}** (${loc.state}): ${loc.marketInsights.marketSummary}`).join("\n")}

## Market Insights by City
${locations
  .map(
    (loc) =>
      `### ${loc.city}, ${loc.stateShort}
- Median House Price: ${loc.marketInsights.medianHousePrice}
- Annual Growth: ${loc.marketInsights.annualGrowth}
- Rental Yield: ${loc.marketInsights.rentalYield}
- Growth Suburbs: ${loc.marketInsights.hotSuburbs.join(", ")}
- Page: ${siteConfig.url}/${loc.slug}`
  )
  .join("\n\n")}

## Key Pages
- Homepage: ${siteConfig.url}
- About Us: ${siteConfig.url}/about
- Services: ${siteConfig.url}/services
- Blog: ${siteConfig.url}/blog
- FAQ: ${siteConfig.url}/faq
- Contact: ${siteConfig.url}/contact
${locations.map((loc) => `- ${loc.heroTitle}: ${siteConfig.url}/${loc.slug}`).join("\n")}

## Frequently Asked Questions
- **What is a buyer's agent?** A buyer's agent (also called a buyer's advocate) is a licensed real estate professional who exclusively represents property buyers, not sellers.
- **How much does a buyer's agent cost?** Fees vary by service type. We offer fixed-fee and percentage-based pricing. Contact us for a personalised quote.
- **Do you only work in one city?** No, we operate across all major Australian capital cities including Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Canberra, and Hobart.
- **Can you help with investment properties?** Yes, investment strategy is one of our core services. We provide data-driven portfolio advice and source high-growth properties.
- **What are off-market properties?** Off-market properties are those sold without public advertising. Our network of agents and contacts gives us access to these opportunities before they hit the open market.

## Contact
- Email: ${siteConfig.email}
- Hours: ${siteConfig.hours}
- Website: ${siteConfig.url}
- Book a consultation: ${siteConfig.url}/contact
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
