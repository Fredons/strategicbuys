import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/constants/site";
import { locations } from "@/lib/constants/locations";

export async function GET() {
  const content = `# ${siteConfig.name}

> ${siteConfig.description}

## About
Strategic Buys is a licensed buyer's agent (buyer's advocate) operating across Australia. We help home buyers, property investors, and developers purchase property with expert guidance, negotiation, and strategy.

## Services
- Full Service Property Buying: End-to-end buyer's agent service from property brief to settlement
- Negotiation Service: Expert negotiation for properties you've already found
- Auction Bidding: Professional auction bidding representation
- Investment Strategy: Data-driven property investment advice and portfolio strategy
- NDIS Property Investment: Specialist Disability Accommodation investment guidance

## Service Areas
${locations.map((loc) => `- ${loc.city}, ${loc.stateShort}`).join("\n")}

## Key Pages
- Homepage: ${siteConfig.url}
- About Us: ${siteConfig.url}/about
- Services: ${siteConfig.url}/services
- Blog: ${siteConfig.url}/blog
- FAQ: ${siteConfig.url}/faq
- Contact: ${siteConfig.url}/contact
${locations.map((loc) => `- ${loc.heroTitle}: ${siteConfig.url}/${loc.slug}`).join("\n")}

## Contact
- Email: ${siteConfig.email}
- Phone: ${siteConfig.phone}
- Hours: ${siteConfig.hours}
- Website: ${siteConfig.url}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
