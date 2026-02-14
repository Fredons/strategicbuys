import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Create admin user
  const passwordHash = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@strategicbuys.com.au" },
    update: {},
    create: {
      name: "Strategic Buys",
      email: "admin@strategicbuys.com.au",
      passwordHash,
      role: "ADMIN",
    },
  });
  console.log("Admin user created:", admin.email);

  // 2. Create categories
  const categories = [
    { name: "Market Updates", slug: "market-updates", description: "Australian property market news and analysis" },
    { name: "Buying Tips", slug: "buying-tips", description: "Expert tips for property buyers" },
    { name: "Investment", slug: "investment", description: "Property investment strategies and advice" },
    { name: "First Home Buyers", slug: "first-home", description: "Guides for first-time home buyers" },
    { name: "Negotiation", slug: "negotiation", description: "Property negotiation strategies" },
    { name: "Auction", slug: "auction", description: "Auction buying tips and strategies" },
    { name: "General", slug: "general", description: "General property and real estate content" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("Categories created:", categories.length);

  // 3. Seed blog posts — real, in-depth investor-focused content
  const buyingTips = await prisma.category.findUnique({ where: { slug: "buying-tips" } });
  const investment = await prisma.category.findUnique({ where: { slug: "investment" } });
  const marketUpdates = await prisma.category.findUnique({ where: { slug: "market-updates" } });

  const posts = [
    // ─── Post 1: Is a Buyer's Agent Worth It? ───────────────────
    {
      title: "Is a Buyer's Agent Worth the Cost? Here's What the Numbers Say",
      slug: "is-a-buyers-agent-worth-the-cost",
      categoryId: buyingTips!.id,
      featuredImage: "/images/blog/buyers-agent-worth-it.webp",
      metaTitle: "Is a Buyer's Agent Worth It? Cost vs Savings Explained | Strategic Buys",
      metaDescription: "Find out whether hiring a buyer's agent in Australia is worth the fee. We break down the real costs, average savings, and when it makes financial sense for investors.",
      excerpt: "Most investors ask the same question before hiring a buyer's agent: is it actually worth the fee? We break down the real numbers — what you pay, what you save, and why the maths almost always works in your favour.",
      content: `<p>It&rsquo;s the most common question we hear from property investors considering professional help: &ldquo;Is a buyer&rsquo;s agent actually worth the cost?&rdquo;</p>
<p>It&rsquo;s a fair question. Buyer&rsquo;s agent fees in Australia typically range from $8,000 to $20,000, or 1.5&ndash;3% of the purchase price. That&rsquo;s a meaningful amount of money, and you want to know the return on that investment before committing.</p>
<p>Let&rsquo;s look at the numbers honestly.</p>

<h2>What Does a Buyer&rsquo;s Agent Actually Cost?</h2>
<p>Fees vary depending on the service level and the property price range. Here&rsquo;s a general breakdown:</p>
<ul>
<li><strong>Fixed fee model:</strong> $8,000&ndash;$20,000 for a full search, assess, negotiate and settle service</li>
<li><strong>Percentage model:</strong> 1.5%&ndash;3% of the purchase price (more common for higher-value properties)</li>
<li><strong>Negotiation only:</strong> $5,000&ndash;$10,000 if you&rsquo;ve already found the property and just need someone to negotiate the deal</li>
</ul>
<p>At Strategic Buys, we&rsquo;re transparent about our fees from the first conversation. No hidden charges, no surprises at settlement.</p>

<h2>How Much Can a Buyer&rsquo;s Agent Save You?</h2>
<p>This is where it gets interesting. The savings come from three areas:</p>

<h3>1. Purchase Price Negotiation</h3>
<p>A skilled buyer&rsquo;s agent negotiates property purchases every week. They understand vendor motivations, comparable sales data, and the psychology of negotiation. On an $800,000 property, securing even a 3&ndash;5% reduction means $24,000&ndash;$40,000 in savings &mdash; which already covers the fee several times over.</p>
<p>Selling agents negotiate on behalf of vendors every single day. As a buyer, you might negotiate a property purchase once every few years. A buyer&rsquo;s agent levels that playing field.</p>

<h3>2. Avoiding Overpayment</h3>
<p>Without professional guidance, it&rsquo;s common for buyers to overpay by 5&ndash;10% &mdash; particularly at auction or in competitive markets. Emotional decision-making, fear of missing out, and limited market knowledge all contribute to paying more than a property is worth.</p>
<p>A buyer&rsquo;s agent provides an independent, data-driven assessment of what a property is actually worth, not what the selling agent tells you it&rsquo;s worth.</p>

<h3>3. Opportunity Cost of Buying the Wrong Property</h3>
<p>This is the hidden cost most investors don&rsquo;t consider. Buying in a location with poor growth fundamentals can cost you tens of thousands in missed capital growth over 5&ndash;10 years. A buyer&rsquo;s agent helps you identify properties with strong underlying demand drivers &mdash; infrastructure investment, population growth, supply constraints &mdash; that support long-term value.</p>

<h2>Off-Market Access: The Advantage You Can&rsquo;t Buy Elsewhere</h2>
<p>Up to 20&ndash;30% of property transactions happen off-market &mdash; properties that are never advertised on Domain, REA, or any public portal. These deals are shared through agent networks and industry relationships that take years to build.</p>
<p>As an individual buyer, you simply cannot access these opportunities. A buyer&rsquo;s agent with established relationships opens doors that are otherwise closed.</p>

<h2>When Does a Buyer&rsquo;s Agent NOT Make Sense?</h2>
<p>We believe in honest advice, so here&rsquo;s the truth: a buyer&rsquo;s agent may not be the right fit if:</p>
<ul>
<li>You&rsquo;re buying a property under $400,000 in a regional area with minimal competition</li>
<li>You already have deep expertise in a specific local market</li>
<li>You have unlimited time to research, inspect, and negotiate yourself</li>
</ul>
<p>For most investors &mdash; especially those buying in competitive capital city markets, those building a multi-property portfolio, or those who value their time &mdash; the maths strongly favours professional representation.</p>

<h2>The Bottom Line</h2>
<p>A buyer&rsquo;s agent fee is not a cost &mdash; it&rsquo;s an investment. When you factor in negotiation savings, overpayment avoidance, off-market access, and better property selection, the return on that investment is typically 3&ndash;5x the fee paid.</p>
<p>The question isn&rsquo;t whether you can afford a buyer&rsquo;s agent. The question is whether you can afford not to have one.</p>

<h2>Ready to See the Difference?</h2>
<p><strong><a href="/contact">Book a free strategy call with Strategic Buys</a></strong> and we&rsquo;ll walk you through exactly how we can help you buy smarter, save money, and build wealth through property &mdash; with complete transparency about fees and the value we deliver.</p>`,
      publishedAt: new Date("2026-02-10"),
      status: "PUBLISHED" as const,
    },

    // ─── Post 2: Negative Gearing vs Positive Cashflow ──────────
    {
      title: "Negative Gearing vs Positive Cashflow: Which Strategy Is Right for Australian Investors in 2026?",
      slug: "negative-gearing-vs-positive-cashflow-australia",
      categoryId: investment!.id,
      featuredImage: "/images/blog/negative-gearing-guide.webp",
      metaTitle: "Negative Gearing vs Positive Cashflow 2026 | Investment Strategy Guide",
      metaDescription: "Should you negatively gear or chase positive cashflow? We compare both property investment strategies for Australian investors in 2026, with real examples and tax implications.",
      excerpt: "Negative gearing or positive cashflow? It's the oldest debate in Australian property investing. In 2026, with interest rates stabilising and policy uncertainty looming, the right answer depends entirely on your personal financial situation. Here's how to decide.",
      content: `<p>If you&rsquo;ve spent any time researching property investment in Australia, you&rsquo;ve encountered the debate: should you negatively gear for capital growth, or target positive cashflow from day one?</p>
<p>The honest answer? Neither strategy is universally &ldquo;better.&rdquo; The right approach depends on your income, your risk tolerance, your investment timeline, and the current economic conditions. Let&rsquo;s break it down.</p>

<h2>What Is Negative Gearing?</h2>
<p>Negative gearing occurs when the costs of holding an investment property (mortgage interest, maintenance, insurance, management fees) exceed the rental income. The resulting loss can be deducted against your taxable income, reducing your overall tax liability.</p>
<p><strong>Example:</strong> You earn $120,000/year salary. Your investment property generates $25,000 in rent but costs $35,000 to hold. The $10,000 loss reduces your taxable income to $110,000, saving you approximately $3,700 in tax (at the 37% marginal rate).</p>

<h3>When Negative Gearing Works</h3>
<ul>
<li><strong>High income earners</strong> (above $120,000) who benefit most from the tax deduction</li>
<li><strong>Long-term holders</strong> (7&ndash;10+ years) who can ride out the holding costs while the property appreciates</li>
<li><strong>Capital growth markets</strong> where strong appreciation over time more than compensates for the annual shortfall</li>
<li><strong>Investors with stable employment</strong> and confidence in their ongoing ability to fund the gap</li>
</ul>

<h3>The Risks of Negative Gearing</h3>
<ul>
<li>You&rsquo;re losing real money each year, betting on future capital growth that isn&rsquo;t guaranteed</li>
<li>Interest rate rises can significantly increase holding costs &mdash; a lesson many investors learned the hard way in 2023&ndash;2024</li>
<li>Policy risk: there&rsquo;s ongoing political discussion about reducing or removing negative gearing benefits, which could change the equation entirely</li>
<li>Reduces your borrowing capacity for the next property purchase</li>
</ul>

<h2>What Is Positive Cashflow?</h2>
<p>A positive cashflow property generates more rental income than it costs to hold. After mortgage payments, rates, insurance, and management fees, there&rsquo;s money left in your pocket each week.</p>
<p><strong>Example:</strong> Your property costs $450,000 with a $360,000 loan. Weekly rent is $480. After all expenses (mortgage, rates, insurance, maintenance, management), you retain $50&ndash;80 per week in positive cashflow.</p>

<h3>When Positive Cashflow Works</h3>
<ul>
<li><strong>Investors building a portfolio</strong> &mdash; positive cashflow improves your borrowing capacity for the next property</li>
<li><strong>Lower income earners</strong> who can&rsquo;t afford to fund a weekly shortfall</li>
<li><strong>Investors seeking passive income</strong> and financial freedom over long-term capital growth</li>
<li><strong>Risk-averse investors</strong> who want to know the property pays for itself regardless of market conditions</li>
</ul>

<h3>The Trade-Offs of Positive Cashflow</h3>
<ul>
<li>Positive cashflow properties are often in regional areas or secondary locations with lower capital growth prospects</li>
<li>Higher rental yields can come with higher vacancy risk or more management-intensive tenants</li>
<li>The &ldquo;set and forget&rdquo; nature of cashflow investing can lead to complacency about property condition and market changes</li>
</ul>

<h2>The 2026 Reality: Why Hybrid Strategies Are Gaining Traction</h2>
<p>With interest rates expected to hold steady through most of 2026 and economic conditions creating uneven growth across different markets, many sophisticated investors are adopting hybrid strategies.</p>
<p>A hybrid approach targets properties that offer <strong>reasonable rental yields (above 4&ndash;5%) in locations with strong capital growth fundamentals</strong>. You might not get the highest rent or the fastest price growth &mdash; but you get a sustainable, balanced investment that performs in multiple economic scenarios.</p>

<h3>What to Look For in a Hybrid Property</h3>
<ul>
<li>Rental yield of 4.5&ndash;5.5% gross</li>
<li>Location with infrastructure investment, population growth, and limited new supply</li>
<li>Properties priced in the $500,000&ndash;$800,000 range (the strongest demand segment for both buyers and renters)</li>
<li>Established houses on land (not apartments) in suburbs with owner-occupier appeal</li>
</ul>

<h2>How to Decide: Ask Yourself These Questions</h2>
<ol>
<li><strong>What is my marginal tax rate?</strong> If it&rsquo;s above 37%, negative gearing delivers meaningful tax savings. If it&rsquo;s below 32.5%, the tax benefit is modest.</li>
<li><strong>Can I comfortably fund a weekly shortfall for 10+ years?</strong> If your job is secure and your expenses are manageable, negative gearing may work. If not, cashflow should be the priority.</li>
<li><strong>What&rsquo;s my investment timeline?</strong> Capital growth strategies need 7&ndash;10+ years to outperform. If you&rsquo;re building a portfolio quickly, cashflow enables faster scaling.</li>
<li><strong>How many properties do I plan to own?</strong> After 2&ndash;3 negatively geared properties, most investors hit a borrowing wall. Positive cashflow properties extend your runway.</li>
</ol>

<h2>Get a Strategy That Fits Your Situation</h2>
<p>There is no one-size-fits-all answer. The right strategy depends on your income, goals, risk tolerance, and timeline. At Strategic Buys, we don&rsquo;t push a particular approach &mdash; we help you find the investment strategy and the specific property that matches your personal financial situation.</p>
<p><strong><a href="/contact">Book a free strategy call</a></strong> and let&rsquo;s build an investment plan that works for you &mdash; not someone else&rsquo;s portfolio.</p>`,
      publishedAt: new Date("2026-01-28"),
      status: "PUBLISHED" as const,
    },

    // ─── Post 3: Off-Market Properties ──────────────────────────
    {
      title: "How to Find Off-Market Properties in Australia (And Why They Matter for Investors)",
      slug: "how-to-find-off-market-properties-australia",
      categoryId: investment!.id,
      featuredImage: "/images/blog/off-market-properties.webp",
      metaTitle: "How to Find Off-Market Properties in Australia | Investor Guide 2026",
      metaDescription: "Learn how to access off-market property deals in Australia. We explain what off-market means, why sellers go quiet, and the strategies investors use to find hidden opportunities.",
      excerpt: "Up to 30% of property sales never appear on Domain or REA. These off-market deals often represent the best buying opportunities — less competition, better prices, and access to properties most investors never see. Here's how to find them.",
      content: `<p>Picture this: you&rsquo;ve been searching for months, attending open homes every weekend, refreshing Domain and REA constantly, and competing with dozens of other buyers on every property you like. It&rsquo;s exhausting.</p>
<p>Meanwhile, a significant portion of properties are being sold quietly &mdash; no open homes, no online listings, no bidding wars. These are off-market sales, and they represent one of the biggest competitive advantages available to property investors in Australia.</p>

<h2>What Exactly Are Off-Market Properties?</h2>
<p>An off-market property is one that&rsquo;s being sold without public advertising. It won&rsquo;t appear on Domain, realestate.com.au, or any property portal. Instead, it&rsquo;s shared privately through agent networks, buyer&rsquo;s agents, and direct vendor connections.</p>
<p>Depending on the market and the price range, off-market transactions can represent 15&ndash;30% of all sales. In premium markets like Sydney&rsquo;s Eastern Suburbs or Melbourne&rsquo;s inner east, that figure can be even higher.</p>

<h2>Why Would a Vendor Sell Off-Market?</h2>
<p>There are several legitimate reasons sellers choose to avoid a public campaign:</p>
<ul>
<li><strong>Privacy:</strong> High-profile individuals, divorce settlements, or deceased estates where families want discretion</li>
<li><strong>Cost savings:</strong> A full marketing campaign (photography, styling, online advertising, signage) can cost $10,000&ndash;$30,000+. Some vendors prefer to save that money</li>
<li><strong>Testing the market:</strong> Some owners want to gauge interest at a certain price before committing to a full public campaign</li>
<li><strong>Speed:</strong> Vendors who need a quick settlement prefer a targeted approach over a 4&ndash;6 week campaign</li>
<li><strong>Avoiding &ldquo;days on market&rdquo; stigma:</strong> If a property sits on portals too long, buyers assume something is wrong. Selling off-market avoids this entirely</li>
</ul>

<h2>Why Off-Market Deals Are Better for Investors</h2>
<p>For investors, off-market properties offer distinct advantages:</p>

<h3>1. Less Competition</h3>
<p>The biggest advantage is simple: fewer buyers know about the property, which means less competition. You&rsquo;re not bidding against 10 other parties at auction or competing in a best-and-final-offer situation. This translates directly to better prices.</p>

<h3>2. More Negotiation Leverage</h3>
<p>When a vendor sells off-market, they&rsquo;ve made a conscious decision to avoid the public process. They&rsquo;re often motivated by speed or convenience. This motivation gives you, as the buyer, stronger negotiating leverage to secure favourable terms &mdash; a lower price, a longer settlement, or conditions that suit your situation.</p>

<h3>3. Time to Conduct Proper Due Diligence</h3>
<p>Without the pressure of an auction deadline or a multi-offer scenario, you can take the time to conduct thorough inspections, review contracts properly, and make informed decisions without the emotional pressure of a competitive process.</p>

<h3>4. Access to Better Properties</h3>
<p>Some of the best properties never need to be publicly marketed. The owners know their property is desirable and prefer to sell through trusted channels rather than opening it up to the public. Without off-market access, you never even know these properties exist.</p>

<h2>How to Access Off-Market Properties</h2>
<p>Here are the main channels:</p>

<h3>Build Relationships with Local Agents</h3>
<p>Selling agents often have pocket listings &mdash; properties they know will sell before they need to advertise. Building relationships with agents in your target area can get you early access. The challenge? Agents prioritise buyers they know and trust, and it takes time to build those relationships.</p>

<h3>Network with Other Investors</h3>
<p>Property investment groups, forums, and local meetups can surface opportunities through word-of-mouth. However, the quality and legality of these deals varies significantly.</p>

<h3>Work with a Buyer&rsquo;s Agent</h3>
<p>This is the most reliable and time-efficient path to off-market deals. A professional buyer&rsquo;s agent maintains relationships with hundreds of selling agents across their territory. When a property comes to market quietly, the buyer&rsquo;s agent&rsquo;s clients hear about it first.</p>
<p>At Strategic Buys, our team has spent years building relationships with agents across every major Australian city. When off-market opportunities arise, our clients get the call before the property goes public.</p>

<h2>A Word of Caution</h2>
<p>Not every off-market deal is a good deal. Some properties are sold off-market because they have issues that would be exposed through a public process &mdash; structural problems, title complications, or inflated price expectations.</p>
<p>This is exactly why having a professional buyer&rsquo;s agent is so important. We don&rsquo;t just find off-market properties &mdash; we assess them with the same rigour as any other purchase, ensuring you only buy properties that genuinely represent good value.</p>

<h2>Start Accessing Off-Market Opportunities</h2>
<p>If you&rsquo;re serious about building a property portfolio and want access to opportunities that most investors never see, <strong><a href="/contact">book a free strategy call with Strategic Buys</a></strong>. We&rsquo;ll show you what&rsquo;s available in your target market &mdash; including properties you won&rsquo;t find on any website.</p>`,
      publishedAt: new Date("2026-01-15"),
      status: "PUBLISHED" as const,
    },

    // ─── Post 4: Property Market Outlook 2026 ───────────────────
    {
      title: "Australian Property Market Outlook 2026: Where Smart Investors Are Buying",
      slug: "australian-property-market-outlook-2026",
      categoryId: marketUpdates!.id,
      featuredImage: "/images/blog/property-market-outlook.webp",
      metaTitle: "Australian Property Market Outlook 2026 | Where to Invest Now",
      metaDescription: "Our 2026 Australian property market forecast for investors. We analyse interest rates, supply shortages, growth corridors, and which cities and suburbs offer the best opportunity.",
      excerpt: "The Australian property market in 2026 is defined by selective growth, chronic supply shortages, and a widening gap between well-chosen and poorly-chosen investments. Here's our analysis of where the opportunities are — and the traps to avoid.",
      content: `<p>After a turbulent few years of rate hikes, affordability pressures, and mixed signals from every commentator with an opinion, the Australian property market in 2026 is entering a new phase. Not a boom. Not a bust. Something more nuanced &mdash; and more rewarding for investors who know where to look.</p>
<p>Here&rsquo;s our honest assessment of what&rsquo;s happening and where the opportunities are.</p>

<h2>The Big Picture: Supply Shortage Isn&rsquo;t Going Away</h2>
<p>Australia has a structural housing undersupply that will take years &mdash; possibly a decade &mdash; to resolve. The numbers are stark:</p>
<ul>
<li>Over the last 10 years, the population increased by roughly 3 million people while the total number of properties listed for sale dropped by a third</li>
<li>Rental vacancy rates in most capital cities remain below 2%, with many suburbs below 1%</li>
<li>New housing completions continue to fall short of household formation rates</li>
<li>Construction costs remain elevated, making many new developments financially unviable</li>
</ul>
<p>This isn&rsquo;t a cyclical issue. It&rsquo;s a structural one. And it means well-located properties in supply-constrained areas will continue to see upward pressure on both rents and values.</p>

<h2>Interest Rates: The &ldquo;New Normal&rdquo;</h2>
<p>The RBA cash rate is expected to remain relatively stable through 2026. After the aggressive hiking cycle of 2023&ndash;2024 and gradual easing beginning in 2025, we&rsquo;re now settling into what most economists consider the medium-term normal.</p>
<p>What this means for investors:</p>
<ul>
<li>Don&rsquo;t expect rates to return to the emergency-era lows of 2020&ndash;2021. Those were the exception, not the rule</li>
<li>Borrowing capacity has stabilised, giving investors clearer parameters for what they can afford</li>
<li>The focus shifts from &ldquo;when will rates drop?&rdquo; to &ldquo;how do I find value in the current environment?&rdquo;</li>
</ul>

<h2>City-by-City: Where Are the Opportunities?</h2>

<h3>Perth and Adelaide: Continued Outperformance</h3>
<p>Perth and Adelaide have been the standout markets of the past two years, driven by relative affordability, strong migration, mining sector employment, and severe supply constraints. While some commentators worry about &ldquo;overheating,&rdquo; the fundamentals suggest there&rsquo;s still room for measured growth in select suburbs &mdash; particularly established houses in middle-ring locations.</p>

<h3>Brisbane and South East Queensland</h3>
<p>Brisbane continues to benefit from interstate migration and infrastructure investment. The ripple effect of growth is now reaching outer suburbs and satellite cities like the Gold Coast, Sunshine Coast, and Ipswich. Investors should focus on areas with genuine infrastructure catalysts rather than chasing recent past performance.</p>

<h3>Sydney</h3>
<p>Sydney remains expensive but is showing signs of stabilisation after years of boom-and-correction cycles. The opportunity here is in the middle ring &mdash; suburbs 15&ndash;30km from the CBD that offer genuine lifestyle appeal, transport access, and are undervalued relative to inner-city areas. Apartments remain challenging in many areas due to oversupply, but well-located houses on land continue to perform.</p>

<h3>Melbourne</h3>
<p>Melbourne is currently the value opportunity that many investors are overlooking. After underperforming other capitals for several years, the price gap has created a compelling entry point &mdash; particularly in the inner and middle rings. The caveat: Melbourne&rsquo;s recovery requires economic improvement, so selectivity is essential.</p>

<h3>Regional Markets</h3>
<p>Regional markets that saw strong growth during the pandemic migration have largely stabilised. The best opportunities are in regional centres with diverse employment bases, genuine population growth (not just tree-changers who may return to cities), and limited housing supply. Be cautious of small towns where a single employer or industry drives the economy.</p>

<h2>What Smart Investors Are Doing in 2026</h2>
<ol>
<li><strong>Focusing on established houses on land</strong> in middle-ring suburbs with owner-occupier appeal. These properties have the broadest demand base and strongest long-term growth fundamentals</li>
<li><strong>Targeting the $550,000&ndash;$850,000 price range</strong> &mdash; the sweet spot where investor demand, first-home buyer demand, and rental demand all converge</li>
<li><strong>Prioritising locations with infrastructure investment</strong> &mdash; new transport links, hospital upgrades, university expansions, and employment hubs</li>
<li><strong>Looking for rental yield AND growth potential</strong> rather than chasing one at the expense of the other</li>
<li><strong>Using professional buyer&rsquo;s agents</strong> to access off-market opportunities and negotiate better prices in competitive markets</li>
</ol>

<h2>The Traps to Avoid</h2>
<ul>
<li><strong>Buying apartments in oversupplied areas:</strong> Many suburban apartment markets still face oversupply issues. Stick to houses on land unless you&rsquo;re buying in a genuinely supply-constrained, premium apartment market</li>
<li><strong>Chasing yesterday&rsquo;s growth:</strong> Suburbs that have already seen 30&ndash;40% growth may be due for consolidation. The best returns come from identifying the next growth corridor, not piling into one that&rsquo;s already run</li>
<li><strong>Ignoring holding costs:</strong> In the current rate environment, the difference between a 3.5% yield and a 5% yield on an $800,000 property is over $12,000 per year. Run the numbers carefully</li>
<li><strong>Waiting for the &ldquo;perfect&rdquo; time:</strong> There is no perfect time to buy. There&rsquo;s only the right property at the right price. Analysis paralysis has cost more investors more money than any market downturn</li>
</ul>

<h2>Our View</h2>
<p>2026 is a year where knowledge, not luck, determines outcomes. The broad market will deliver modest, unspectacular growth. But within that market, specific properties in specific locations will significantly outperform &mdash; and others will underperform.</p>
<p>The gap between a well-chosen investment and a poorly-chosen one has never been wider. Professional guidance isn&rsquo;t a luxury in this market. It&rsquo;s the difference between building wealth and treading water.</p>

<h2>Get a Personalised Market Briefing</h2>
<p><strong><a href="/contact">Book a free strategy call with Strategic Buys</a></strong> and we&rsquo;ll give you an honest, no-obligation assessment of where the opportunities are in your target market &mdash; tailored to your budget, goals, and investment timeline.</p>`,
      publishedAt: new Date("2026-02-05"),
      status: "PUBLISHED" as const,
    },
  ];

  for (const post of posts) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
    if (!existing) {
      await prisma.blogPost.create({
        data: {
          ...post,
          authorId: admin.id,
        },
      });
    }
  }
  console.log("Blog posts seeded:", posts.length);

  // 4. Create site settings
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      siteName: "Strategic Buys",
      siteDescription: "Australia's trusted buyer's agency. Expert property sourcing, negotiation & investment strategy.",
      contactEmail: "info@strategicbuys.com.au",
      contactPhone: "1300 BUYS AU",
    },
  });
  console.log("Site settings created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
