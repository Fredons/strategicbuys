export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    title: "General Questions",
    items: [
      {
        question: "What is a Buyer\u2019s Agent?",
        answer:
          "A buyer\u2019s agent is a licensed professional who specialises in finding, assessing, negotiating, and purchasing properties exclusively on behalf of the buyer. Unlike selling agents who work for the vendor, a buyer\u2019s agent works solely in your interest to get you the best possible property at the best possible price.",
      },
      {
        question:
          "What\u2019s the difference between a Buyer\u2019s Advocate and a Buyer\u2019s Agent?",
        answer:
          "The terms are now used interchangeably across Australia. Both refer to a licensed professional who represents the buyer in a property transaction. The key thing to verify is that your agent works exclusively for buyers and has no conflicts of interest with sellers.",
      },
      {
        question:
          "What\u2019s the difference between a Buyer\u2019s Agent and a Seller\u2019s Agent?",
        answer:
          "A buyer\u2019s agent is hired by and works for the purchaser, while a seller\u2019s agent (also called a listing agent or real estate agent) is hired by and works for the vendor. Their objectives are opposing \u2014 the selling agent wants to maximise the sale price, while the buyer\u2019s agent wants to minimise it. You cannot rely on the selling agent to act in your best interest.",
      },
      {
        question: "Why should I hire a Buyer\u2019s Agent?",
        answer:
          "A buyer\u2019s agent gives you a significant advantage: access to off-market properties, deep market knowledge, expert negotiation skills, and a dedicated professional managing the entire process. Most clients save more in negotiation outcomes than the fee they pay, while also saving hundreds of hours of search time and avoiding costly mistakes.",
      },
    ],
  },
  {
    title: "Fees & Payment",
    items: [
      {
        question: "Who pays the Buyer\u2019s Agent fees?",
        answer:
          "The buyer who engages the buyer\u2019s agent pays the fees. This is what ensures your agent works exclusively in your interest with no conflicts. The fee is agreed upon upfront before any work begins, so there are never any surprises.",
      },
      {
        question: "How are Buyer\u2019s Agents paid?",
        answer:
          "Buyer\u2019s agents are typically paid either a percentage of the purchase price (usually 1.5\u20133%) or a flat fee agreed upon upfront. Most structures involve a small engagement fee at the start, with the remainder payable upon successful settlement of your property.",
      },
      {
        question:
          "Do Buyer\u2019s Agents charge fees? Are they worth it?",
        answer:
          "Yes, legitimate buyer\u2019s agents charge for their services. If someone is offering to help you buy for free, they are almost certainly being paid by the seller \u2014 which means they are not truly representing your interests. The savings from expert negotiation typically exceed the fee, and you also benefit from off-market access, time savings, and avoiding costly mistakes.",
      },
    ],
  },
  {
    title: "The Buying Process",
    items: [
      {
        question:
          "Can a Buyer\u2019s Agent get a better deal than I can on my own?",
        answer:
          "In most cases, yes. Buyer\u2019s agents leverage market knowledge, access to comparable sales data, off-market opportunities, and professional negotiation techniques that individual buyers simply don\u2019t have. They negotiate property deals every day, while most buyers do it once every few years.",
      },
      {
        question: "How long does it take to find a property?",
        answer:
          "Timelines vary based on your requirements and market conditions. For investment properties, the typical timeframe is 4\u20136 weeks. For owner-occupied homes, it\u2019s usually 4\u20138 weeks in a balanced market. Some clients secure properties even faster through our off-market network.",
      },
      {
        question:
          "Who do you help? Is it only for wealthy buyers?",
        answer:
          "We help all serious property buyers regardless of budget. From first-home buyers to experienced investors, from $400,000 starter homes to multi-million dollar investments. First-home buyers often benefit the most because they have the least experience navigating the market.",
      },
      {
        question:
          "Can\u2019t the local real estate agent help me buy for free?",
        answer:
          "The selling agent has a legal fiduciary duty to the vendor, not to you. Their job is to get the highest price for their client. Even if they seem helpful, they cannot negotiate in your favour. A buyer\u2019s agent is the only professional legally bound to act in the buyer\u2019s interest.",
      },
    ],
  },
  {
    title: "Property Investment",
    items: [
      {
        question:
          "What should I consider when choosing an investment property location?",
        answer:
          "Key factors include market supply and demand, historical and projected capital growth, rental yield, gentrification potential, infrastructure investment, employment diversity, access to transport, proximity to hospitals and schools, and the overall economic outlook for the area. A buyer\u2019s agent analyses all of these factors for you.",
      },
      {
        question:
          "Can property investment help me pay off my mortgage faster?",
        answer:
          "Yes. Strategic property investment can accelerate mortgage paydown through improved rental income, capital growth that builds equity, tax benefits through depreciation and negative gearing, and the ability to make additional contributions from rental returns or by leveraging equity into further investments.",
      },
    ],
  },
];
