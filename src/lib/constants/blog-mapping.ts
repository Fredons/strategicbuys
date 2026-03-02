/**
 * Maps contact form service types to relevant blog post slugs.
 * Used to include personalised reading recommendations in the enquiry confirmation email.
 */
export const serviceBlogMapping: Record<string, string[]> = {
  "Full Service": [
    "first-home-buyers-guide-australia-2026",
    "is-a-buyers-agent-worth-the-cost-heres-what-the-numbers-say",
    "how-to-choose-buyers-agent-7-questions",
  ],
  "Negotiation Service": [
    "how-to-win-at-auction-australia",
    "is-a-buyers-agent-worth-the-cost-heres-what-the-numbers-say",
    "how-to-choose-buyers-agent-7-questions",
  ],
  "Auction Bidding": [
    "how-to-win-at-auction-australia",
    "is-a-buyers-agent-worth-the-cost-heres-what-the-numbers-say",
    "first-home-buyers-guide-australia-2026",
  ],
  "Property Investment": [
    "best-suburbs-to-invest-australia-2026",
    "negative-gearing-vs-positive-cashflow-which-strategy-is-right-for-australian-investors-in-2026",
    "property-investment-strategy-australia-2026",
  ],
  "Home Buying": [
    "first-home-buyers-guide-australia-2026",
    "how-to-choose-buyers-agent-7-questions",
    "how-to-win-at-auction-australia",
  ],
  "NDIS Investment": [
    "property-investment-strategy-australia-2026",
    "best-suburbs-to-invest-australia-2026",
    "is-a-buyers-agent-worth-the-cost-heres-what-the-numbers-say",
  ],
};

/** Default slugs if no service match or service is not provided */
export const defaultBlogSlugs = [
  "is-a-buyers-agent-worth-the-cost-heres-what-the-numbers-say",
  "first-home-buyers-guide-australia-2026",
  "best-suburbs-to-invest-australia-2026",
];
