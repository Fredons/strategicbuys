import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Map of incorrect/assumed slugs → actual DB slugs
const slugMap: Record<string, string> = {
  "is-a-buyers-agent-worth-the-cost": "is-a-buyers-agent-worth-the-cost-heres-what-the-numbers-say",
  "negative-gearing-vs-positive-cashflow-australia": "negative-gearing-vs-positive-cashflow-which-strategy-is-right-for-australian-investors-in-2026",
  "first-home-buyer-guide-australia-2026": "first-home-buyers-guide-australia-2026",
  "best-suburbs-to-invest-in-australia-2026": "best-suburbs-to-invest-australia-2026",
  "how-to-choose-a-buyers-agent-australia": "how-to-choose-buyers-agent-7-questions",
  "ultimate-auction-strategy-guide-australia": "how-to-win-at-auction-australia",
  // These are correct:
  "buyers-agent-fees-australia-2026-guide": "buyers-agent-fees-australia-2026-guide",
  "ndis-property-investment-guide-australia": "ndis-property-investment-guide-australia",
  "buying-property-sydney-2026-investors-guide": "buying-property-sydney-2026-investors-guide",
  "buying-property-melbourne-2026-guide": "buying-property-melbourne-2026-guide",
  "buying-property-brisbane-2026-guide": "buying-property-brisbane-2026-guide",
  "buying-property-perth-2026-guide": "buying-property-perth-2026-guide",
  "what-does-a-buyers-agent-do": "what-does-a-buyers-agent-do",
  "deposit-for-investment-property-australia": "deposit-for-investment-property-australia",
  "property-investment-tax-deductions-2026": "property-investment-tax-deductions-2026",
  "due-diligence-buying-property-checklist": "due-diligence-buying-property-checklist",
  "rentvesting-australia-2026-guide": "rentvesting-australia-2026-guide",
  "how-to-build-property-portfolio": "how-to-build-property-portfolio",
};

// Posts that don't exist in DB (off-market and market-outlook were never seeded or were deleted)
// We'll skip links to these for now
const missingPosts = ["off-market-property-deals-australia", "australian-property-market-outlook-2026"];

async function main() {
  // ── 1. Fix image paths: null out any /images/blog/ paths ──────────
  const fixedImages = await prisma.blogPost.updateMany({
    where: {
      featuredImage: { startsWith: "/images/blog/" },
    },
    data: { featuredImage: null },
  });
  console.log(`Fixed ${fixedImages.count} posts with local image paths.`);

  // ── 2. Fix cross-link URLs in ALL posts ───────────────────────────
  // Replace incorrect slug references with actual DB slugs
  const allPosts = await prisma.blogPost.findMany({
    select: { id: true, slug: true, content: true },
  });

  let linksFixed = 0;
  for (const post of allPosts) {
    let newContent = post.content;
    let changed = false;

    for (const [oldSlug, newSlug] of Object.entries(slugMap)) {
      if (oldSlug !== newSlug && newContent.includes(`/blog/${oldSlug}`)) {
        newContent = newContent.replace(
          new RegExp(`/blog/${oldSlug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "g"),
          `/blog/${newSlug}`
        );
        changed = true;
      }
    }

    if (changed) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { content: newContent },
      });
      linksFixed++;
      console.log(`  ✓ Fixed links in: ${post.slug}`);
    }
  }
  console.log(`Fixed cross-links in ${linksFixed} posts.`);

  // ── 3. Add "Related Reading" sections to original 8 posts ─────────
  const linkUpdates: { slug: string; linksHtml: string }[] = [
    {
      slug: "is-a-buyers-agent-worth-the-cost-heres-what-the-numbers-say",
      linksHtml: `<h3>Related Reading</h3>
<ul>
<li><a href="/blog/buyers-agent-fees-australia-2026-guide">Buyer&rsquo;s Agent Fees in Australia 2026 &mdash; City-by-City Breakdown</a></li>
<li><a href="/blog/how-to-choose-buyers-agent-7-questions">How to Choose a Buyer&rsquo;s Agent in Australia</a></li>
<li><a href="/blog/what-does-a-buyers-agent-do">What Does a Buyer&rsquo;s Agent Actually Do?</a></li>
</ul>`,
    },
    {
      slug: "negative-gearing-vs-positive-cashflow-which-strategy-is-right-for-australian-investors-in-2026",
      linksHtml: `<h3>Related Reading</h3>
<ul>
<li><a href="/blog/property-investment-tax-deductions-2026">Property Investment Tax Deductions 2026: What Can You Claim?</a></li>
<li><a href="/blog/best-suburbs-to-invest-australia-2026">Best Suburbs to Invest in Australia 2026</a></li>
<li><a href="/blog/how-to-build-property-portfolio">How to Build a Property Portfolio from Scratch</a></li>
</ul>`,
    },
    {
      slug: "buyers-agent-fees-australia-2026-guide",
      linksHtml: `<h3>Related Reading</h3>
<ul>
<li><a href="/blog/is-a-buyers-agent-worth-the-cost-heres-what-the-numbers-say">Is a Buyer&rsquo;s Agent Worth the Cost?</a></li>
<li><a href="/blog/how-to-choose-buyers-agent-7-questions">How to Choose a Buyer&rsquo;s Agent in Australia</a></li>
<li><a href="/blog/what-does-a-buyers-agent-do">What Does a Buyer&rsquo;s Agent Actually Do?</a></li>
</ul>`,
    },
    {
      slug: "first-home-buyers-guide-australia-2026",
      linksHtml: `<h3>Related Reading</h3>
<ul>
<li><a href="/blog/how-to-win-at-auction-australia">How to Win at Auction in Australia</a></li>
<li><a href="/blog/deposit-for-investment-property-australia">How Much Deposit Do You Need for an Investment Property?</a></li>
<li><a href="/blog/rentvesting-australia-2026-guide">Rentvesting in Australia: Is It a Smart Strategy in 2026?</a></li>
</ul>`,
    },
    {
      slug: "best-suburbs-to-invest-australia-2026",
      linksHtml: `<h3>Related Reading</h3>
<ul>
<li><a href="/blog/buying-property-sydney-2026-investors-guide">Buying Property in Sydney 2026</a></li>
<li><a href="/blog/buying-property-melbourne-2026-guide">Buying Property in Melbourne 2026</a></li>
<li><a href="/blog/buying-property-brisbane-2026-guide">Buying Property in Brisbane 2026</a></li>
<li><a href="/blog/buying-property-perth-2026-guide">Buying Property in Perth 2026</a></li>
</ul>`,
    },
    {
      slug: "how-to-choose-buyers-agent-7-questions",
      linksHtml: `<h3>Related Reading</h3>
<ul>
<li><a href="/blog/is-a-buyers-agent-worth-the-cost-heres-what-the-numbers-say">Is a Buyer&rsquo;s Agent Worth the Cost?</a></li>
<li><a href="/blog/buyers-agent-fees-australia-2026-guide">Buyer&rsquo;s Agent Fees in Australia 2026</a></li>
<li><a href="/blog/what-does-a-buyers-agent-do">What Does a Buyer&rsquo;s Agent Actually Do?</a></li>
</ul>`,
    },
    {
      slug: "how-to-win-at-auction-australia",
      linksHtml: `<h3>Related Reading</h3>
<ul>
<li><a href="/blog/due-diligence-buying-property-checklist">Due Diligence When Buying Property: The Complete Checklist</a></li>
<li><a href="/blog/how-to-choose-buyers-agent-7-questions">How to Choose a Buyer&rsquo;s Agent</a></li>
<li><a href="/blog/first-home-buyers-guide-australia-2026">First Home Buyers Guide Australia 2026</a></li>
</ul>`,
    },
    {
      slug: "ndis-property-investment-guide-australia",
      linksHtml: `<h3>Related Reading</h3>
<ul>
<li><a href="/blog/property-investment-tax-deductions-2026">Property Investment Tax Deductions 2026</a></li>
<li><a href="/blog/negative-gearing-vs-positive-cashflow-which-strategy-is-right-for-australian-investors-in-2026">Negative Gearing vs Positive Cashflow</a></li>
<li><a href="/blog/how-to-build-property-portfolio">How to Build a Property Portfolio from Scratch</a></li>
</ul>`,
    },
  ];

  let updated = 0;
  for (const { slug, linksHtml } of linkUpdates) {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) {
      console.log(`  ⚠ Post not found: ${slug}`);
      continue;
    }

    // Skip if already has related reading links
    if (post.content.includes("Related Reading")) {
      console.log(`  → Already linked: ${slug}`);
      continue;
    }

    // Insert related links before the last <h2> (CTA section)
    const lastH2Idx = post.content.lastIndexOf("<h2>");
    let newContent: string;
    if (lastH2Idx > 0) {
      newContent =
        post.content.slice(0, lastH2Idx) +
        linksHtml +
        "\n\n" +
        post.content.slice(lastH2Idx);
    } else {
      newContent = post.content + "\n\n" + linksHtml;
    }

    await prisma.blogPost.update({
      where: { slug },
      data: { content: newContent },
    });
    updated++;
    console.log(`  ✓ Added links: ${slug}`);
  }

  console.log(`\nUpdate complete: ${updated} posts updated with internal links.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
