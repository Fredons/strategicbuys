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
      name: "Admin",
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

  // 3. Seed blog posts
  const buyingTips = await prisma.category.findUnique({ where: { slug: "buying-tips" } });
  const investment = await prisma.category.findUnique({ where: { slug: "investment" } });
  const firstHome = await prisma.category.findUnique({ where: { slug: "first-home" } });
  const marketUpdates = await prisma.category.findUnique({ where: { slug: "market-updates" } });

  const posts = [
    {
      title: "5 Reasons to Hire a Buyer's Agent in 2025",
      slug: "5-reasons-hire-buyers-agent-2025",
      categoryId: buyingTips!.id,
      excerpt: "Discover why more Australians are turning to buyer's agents to secure their dream property and save thousands in the process.",
      content: `<h2>Why a Buyer's Agent is Your Best Investment</h2><p>In today's competitive Australian property market, having a professional in your corner can make the difference between missing out and securing your dream property at the right price.</p><h2>1. Access to Off-Market Properties</h2><p>Up to 30% of property sales happen off-market. A buyer's agent has the network and relationships to access these hidden opportunities before they ever hit the public market.</p><h2>2. Expert Negotiation</h2><p>Selling agents negotiate property deals every day. As a buyer, you might negotiate a property purchase once every few years. A buyer's agent levels the playing field with professional negotiation skills and market knowledge.</p><h2>3. Save Time</h2><p>The average property search takes hundreds of hours. A buyer's agent does the heavy lifting, presenting you with only the best-matched properties that meet your criteria.</p><h2>4. Avoid Costly Mistakes</h2><p>Overpaying, buying in the wrong location, or missing critical due diligence issues can cost tens of thousands. A buyer's agent helps you avoid these common pitfalls.</p><h2>5. Reduce Stress</h2><p>Property buying is one of life's most stressful experiences. With a buyer's agent managing the process, you can enjoy the journey rather than dreading it.</p><blockquote><p>The right buyer's agent doesn't cost you money &mdash; they save you money while delivering a better outcome.</p></blockquote><h2>Ready to Get Started?</h2><p>Contact Strategic Buys today for a free consultation and discover how we can help you buy smarter.</p>`,
      publishedAt: new Date("2025-01-15"),
      status: "PUBLISHED" as const,
    },
    {
      title: "Understanding Off-Market Properties: Your Hidden Advantage",
      slug: "understanding-off-market-properties",
      categoryId: investment!.id,
      excerpt: "Off-market properties represent some of the best buying opportunities in Australia. Learn how to access them and why they matter for your property strategy.",
      content: `<h2>What Are Off-Market Properties?</h2><p>Off-market properties are those sold without public advertising. They're not listed on Domain, REA, or any other portal. Instead, they're shared quietly through networks of agents, buyer's advocates, and industry professionals.</p><h2>Why Do Sellers Go Off-Market?</h2><ul><li>Privacy concerns &mdash; high-profile sellers who want discretion</li><li>Testing the market without public exposure</li><li>Avoiding the cost and hassle of a public marketing campaign</li><li>Wanting a quick, quiet sale</li></ul><h2>The Advantages for Buyers</h2><p>Off-market properties often present exceptional value because there's less competition. Without public marketing driving up interest, you can negotiate more effectively and often secure a better price.</p><h2>How to Access Off-Market Deals</h2><p>The most reliable way to access off-market properties is through a buyer's agent with established industry relationships. At Strategic Buys, our network gives you access to opportunities that most buyers never see.</p>`,
      publishedAt: new Date("2025-01-08"),
      status: "PUBLISHED" as const,
    },
    {
      title: "First Home Buyer's Guide: From Pre-Approval to Settlement",
      slug: "first-home-buyers-guide",
      categoryId: firstHome!.id,
      excerpt: "A comprehensive step-by-step guide for first-time home buyers in Australia, covering everything from finance to settlement.",
      content: `<h2>Your Journey to Home Ownership</h2><p>Buying your first home is exciting, but it can also feel overwhelming. This guide breaks down the entire process into manageable steps.</p><h2>Step 1: Get Your Finances in Order</h2><p>Before you start looking at properties, understand your borrowing capacity. Speak with a mortgage broker or bank to get pre-approved for a loan. This gives you a clear budget and shows sellers you're serious.</p><h2>Step 2: Define Your Requirements</h2><p>Make a list of must-haves versus nice-to-haves. Consider location, property type, number of bedrooms, proximity to transport, schools, and your workplace.</p><h2>Step 3: Research the Market</h2><p>Understand what properties are selling for in your target areas. Look at recent sales data, attend open homes, and get a feel for market conditions.</p><h2>Step 4: Make an Offer</h2><p>When you find the right property, it's time to negotiate. This is where having a buyer's agent can save you thousands through expert negotiation techniques.</p><h2>Step 5: Due Diligence</h2><p>Once your offer is accepted, conduct thorough inspections including building and pest reports, strata reports (for units), and any other relevant checks.</p><h2>Step 6: Exchange and Settlement</h2><p>Work with your solicitor or conveyancer to review the contract, exchange, and prepare for settlement day.</p><blockquote><p>The most important step? Getting the right advice from the start. A buyer's agent can guide you through every stage and help you avoid costly mistakes.</p></blockquote>`,
      publishedAt: new Date("2025-01-02"),
      status: "PUBLISHED" as const,
    },
    {
      title: "Australian Property Market Outlook for 2025",
      slug: "australian-property-market-outlook-2025",
      categoryId: marketUpdates!.id,
      excerpt: "What does 2025 hold for Australian property? Our analysis of key trends, growth corridors, and what buyers should watch for.",
      content: `<h2>The Year Ahead for Property</h2><p>The Australian property market continues to evolve, driven by population growth, interest rate movements, and shifting buyer preferences. Here's our outlook for 2025.</p><h2>Key Trends to Watch</h2><ul><li><strong>Population growth</strong> continues to drive demand, particularly in major cities</li><li><strong>Regional markets</strong> remain attractive for lifestyle buyers and investors</li><li><strong>Interest rates</strong> are expected to stabilise, improving borrowing capacity</li><li><strong>Housing supply</strong> constraints persist, supporting price growth in key areas</li></ul><h2>Growth Corridors</h2><p>Infrastructure investment continues to create opportunities in outer suburbs and regional centres. Areas with planned transport upgrades, new hospitals, and education facilities typically see above-average growth.</p><h2>What This Means for Buyers</h2><p>Despite market uncertainty, well-located properties with strong fundamentals continue to perform. The key is buying the right property in the right location at the right price &mdash; exactly what a buyer's agent helps you achieve.</p>`,
      publishedAt: new Date("2024-12-20"),
      status: "PUBLISHED" as const,
    },
    {
      title: "Auction vs Private Treaty: Which is Better for Buyers?",
      slug: "auction-vs-private-treaty",
      categoryId: buyingTips!.id,
      excerpt: "Understanding the difference between auction and private treaty sales, and how to navigate each as a buyer.",
      content: `<h2>Two Ways to Buy Property</h2><p>In Australia, properties are sold either by auction or private treaty (private sale). Each method has distinct advantages and challenges for buyers.</p><h2>Auction Sales</h2><p>At auction, buyers compete openly. The property sells to the highest bidder above the reserve price. Auctions are popular in Sydney and Melbourne, creating a competitive atmosphere.</p><h3>Auction Advantages</h3><ul><li>Transparent process &mdash; you can see what others are willing to pay</li><li>Defined timeline &mdash; you know exactly when the decision will be made</li><li>No cooling-off period &mdash; the sale is unconditional</li></ul><h3>Auction Challenges</h3><ul><li>Emotional bidding can lead to overpaying</li><li>No cooling-off means you need all due diligence done beforehand</li><li>Competition can push prices above fair value</li></ul><h2>Private Treaty Sales</h2><p>In a private sale, the vendor sets an asking price and buyers negotiate directly or through agents.</p><h2>The Professional Advantage</h2><p>Whether buying at auction or by private treaty, a buyer's agent provides a significant advantage. We handle auction bidding on your behalf (removing emotion from the process) and negotiate private sales using market data and proven techniques.</p>`,
      publishedAt: new Date("2024-12-10"),
      status: "PUBLISHED" as const,
    },
    {
      title: "NDIS Property Investment: What You Need to Know",
      slug: "ndis-property-investment-guide",
      categoryId: investment!.id,
      excerpt: "A guide to investing in NDIS Specialist Disability Accommodation, including returns, requirements, and how to get started.",
      content: `<h2>What is NDIS Property Investment?</h2><p>The National Disability Insurance Scheme (NDIS) provides funding for Specialist Disability Accommodation (SDA) for participants with extreme functional impairment or very high support needs. SDA properties are purpose-built or modified homes that can provide attractive returns for investors while making a genuine social impact.</p><h2>Why Consider NDIS Investment?</h2><ul><li>Government-backed rental income through SDA payments</li><li>Higher yields than traditional residential property</li><li>Growing demand with significant undersupply of compliant properties</li><li>Positive social impact &mdash; providing homes for those who need them most</li></ul><h2>Key Considerations</h2><p>NDIS property investment requires understanding the SDA framework, design categories, building requirements, and participant needs. Properties must be enrolled with the NDIS and meet specific standards.</p><h2>How Strategic Buys Can Help</h2><p>We help investors navigate the complexities of NDIS property investment, from identifying suitable properties to understanding compliance requirements and connecting you with specialist builders and property managers.</p>`,
      publishedAt: new Date("2024-11-28"),
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
