/**
 * Batch URL Submission Script
 *
 * Submits all published blog post URLs to IndexNow (Bing, Yandex, etc.)
 * and Google Indexing API (if configured).
 *
 * Usage: npm run db:submit-urls
 *
 * Safe to run multiple times — search engines handle duplicates gracefully.
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Read site URL from env or use default
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://strategicbuys.com.au";
const INDEXNOW_API_KEY = process.env.INDEXNOW_API_KEY;
const GOOGLE_INDEXING_CREDENTIALS = process.env.GOOGLE_INDEXING_CREDENTIALS;

async function submitToIndexNow(urls: string[]): Promise<void> {
  if (!INDEXNOW_API_KEY) {
    console.log("  ⚠ INDEXNOW_API_KEY not set — skipping IndexNow.");
    return;
  }

  const host = new URL(SITE_URL).host;

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_API_KEY,
        keyLocation: `${SITE_URL}/api/indexnow`,
        urlList: urls,
      }),
    });

    if (response.ok || response.status === 202) {
      console.log(`  ✓ IndexNow: Submitted ${urls.length} URLs (status: ${response.status})`);
    } else {
      const text = await response.text().catch(() => "");
      console.error(`  ✗ IndexNow: Failed (${response.status}): ${text}`);
    }
  } catch (error) {
    console.error("  ✗ IndexNow: Network error:", error instanceof Error ? error.message : error);
  }
}

async function createGoogleJWT(credentials: { client_email: string; private_key: string }): Promise<string> {
  const crypto = await import("crypto");
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: object) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const unsignedToken = `${encode(header)}.${encode(payload)}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsignedToken);
  const signature = sign.sign(credentials.private_key, "base64url");

  return `${unsignedToken}.${signature}`;
}

async function submitToGoogle(urls: string[]): Promise<void> {
  if (!GOOGLE_INDEXING_CREDENTIALS) {
    console.log("  ⚠ GOOGLE_INDEXING_CREDENTIALS not set — skipping Google.");
    return;
  }

  try {
    const credentials = JSON.parse(GOOGLE_INDEXING_CREDENTIALS);
    const jwt = await createGoogleJWT(credentials);

    // Get access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!tokenRes.ok) {
      console.error(`  ✗ Google: Auth failed (${tokenRes.status})`);
      return;
    }

    const { access_token } = await tokenRes.json();
    let success = 0;
    let failed = 0;

    for (const url of urls) {
      try {
        const res = await fetch(
          "https://indexing.googleapis.com/v3/urlNotifications:publish",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            body: JSON.stringify({ url, type: "URL_UPDATED" }),
          }
        );

        if (res.ok) {
          success++;
        } else {
          failed++;
          const text = await res.text().catch(() => "");
          console.error(`    ✗ ${url}: ${res.status} ${text}`);
        }

        // Rate limit: 200ms between requests
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch {
        failed++;
      }
    }

    console.log(`  ✓ Google: ${success} submitted, ${failed} failed`);
  } catch (error) {
    console.error("  ✗ Google: Error:", error instanceof Error ? error.message : error);
  }
}

async function main() {
  console.log("🔍 Fetching published blog posts...\n");

  const posts = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: { lte: new Date() },
    },
    select: { slug: true, title: true },
    orderBy: { publishedAt: "desc" },
  });

  if (posts.length === 0) {
    console.log("No published posts found.");
    return;
  }

  const urls = posts.map((p) => `${SITE_URL}/blog/${p.slug}`);

  console.log(`Found ${posts.length} published posts:\n`);
  posts.forEach((p, i) => console.log(`  ${i + 1}. ${p.title}`));

  // Also include key static pages
  const staticUrls = [
    SITE_URL,
    `${SITE_URL}/about`,
    `${SITE_URL}/services`,
    `${SITE_URL}/contact`,
    `${SITE_URL}/blog`,
    `${SITE_URL}/faq`,
  ];

  const allUrls = [...staticUrls, ...urls];
  console.log(`\nSubmitting ${allUrls.length} URLs (${staticUrls.length} static + ${urls.length} blog posts)...\n`);

  // Submit to IndexNow (batch)
  await submitToIndexNow(allUrls);

  // Submit to Google (individual)
  await submitToGoogle(allUrls);

  console.log("\n✅ Batch submission complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
