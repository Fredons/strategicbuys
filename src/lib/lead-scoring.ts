type EnquiryPriority = "HOT" | "WARM" | "COLD";

interface LeadScoringInput {
  service?: string | null;
  budget?: string | null;
  message: string;
}

/**
 * Score a lead based on budget, service type, and message engagement.
 *
 * HOT: High-value budget (>= $1.5M), Full Service requests, or long detailed messages (> 500 chars)
 * WARM: Medium budget (>= $750K), or Negotiation/Auction services
 * COLD: Everything else
 */
export function scoreLead(input: LeadScoringInput): EnquiryPriority {
  const budgetMax = input.budget ? parseBudgetMax(input.budget) : 0;
  const service = input.service?.toLowerCase() || "";
  const messageLength = input.message.length;

  // HOT conditions
  if (budgetMax >= 1_500_000) return "HOT";
  if (service.includes("full service")) return "HOT";
  if (messageLength > 500) return "HOT";

  // WARM conditions
  if (budgetMax >= 750_000) return "WARM";
  if (service.includes("negotiation")) return "WARM";
  if (service.includes("auction")) return "WARM";
  if (service.includes("property invest")) return "WARM";
  if (service.includes("ndis")) return "WARM";

  return "COLD";
}

/** Parse the maximum budget value from strings like "$1,000,000 - $1,500,000" or "$750,000+" */
function parseBudgetMax(budget: string): number {
  const numbers = budget.match(/[\d,]+/g);
  if (!numbers) return 0;
  const values = numbers.map((n) => parseInt(n.replace(/,/g, ""), 10));
  return Math.max(...values);
}
