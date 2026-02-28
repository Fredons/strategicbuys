/**
 * Search Engine Indexing Utilities
 *
 * Automatically notifies search engines when blog posts are published, updated, or deleted.
 *
 * Supported:
 * - IndexNow (Bing, Yandex, Naver, Seznam) — requires INDEXNOW_API_KEY env var
 * - Google Indexing API — requires GOOGLE_INDEXING_CREDENTIALS env var (optional)
 *
 * Google Cloud Setup (one-time):
 * 1. Go to https://console.cloud.google.com → Create project
 * 2. Enable "Web Search Indexing API"
 * 3. Create a Service Account → Keys → Add Key → JSON → Download
 * 4. In Google Search Console → Settings → Users and permissions → Add user
 *    → Enter the service account email (e.g., indexing@project.iam.gserviceaccount.com)
 *    → Set permission to "Owner"
 * 5. Set GOOGLE_INDEXING_CREDENTIALS env var in Vercel with the full JSON string
 */

import { siteConfig } from "@/lib/constants/site";

const INDEXNOW_API_KEY = process.env.INDEXNOW_API_KEY;
const GOOGLE_INDEXING_CREDENTIALS = process.env.GOOGLE_INDEXING_CREDENTIALS;

// ── IndexNow ────────────────────────────────────────────────────────

/**
 * Submit URLs to IndexNow (covers Bing, Yandex, Naver, Seznam).
 * Silently fails — never throws.
 */
async function submitToIndexNow(urls: string[]): Promise<void> {
  if (!INDEXNOW_API_KEY) {
    console.warn("[Indexing] INDEXNOW_API_KEY not set — skipping IndexNow submission.");
    return;
  }

  if (urls.length === 0) return;

  const host = new URL(siteConfig.url).host;

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host,
        key: INDEXNOW_API_KEY,
        keyLocation: `${siteConfig.url}/api/indexnow`,
        urlList: urls,
      }),
    });

    if (response.ok || response.status === 202) {
      console.log(`[IndexNow] ✓ Submitted ${urls.length} URL(s): ${response.status}`);
    } else {
      const text = await response.text().catch(() => "");
      console.error(`[IndexNow] ✗ Failed (${response.status}): ${text}`);
    }
  } catch (error) {
    console.error("[IndexNow] ✗ Network error:", error instanceof Error ? error.message : error);
  }
}

// ── Google Indexing API ─────────────────────────────────────────────

/**
 * Create a JWT for Google API authentication using a service account.
 */
async function createGoogleJWT(credentials: { client_email: string; private_key: string }): Promise<string> {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const unsignedToken = `${encode(header)}.${encode(payload)}`;

  // Import the private key and sign
  const crypto = await import("crypto");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsignedToken);
  const signature = sign.sign(credentials.private_key, "base64url");

  return `${unsignedToken}.${signature}`;
}

/**
 * Get an access token from Google OAuth2 using JWT assertion.
 */
async function getGoogleAccessToken(credentials: { client_email: string; private_key: string }): Promise<string | null> {
  try {
    const jwt = await createGoogleJWT(credentials);

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error(`[Google] ✗ Token error (${response.status}): ${text}`);
      return null;
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("[Google] ✗ Auth error:", error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * Submit a URL to Google's Indexing API.
 * Silently fails — never throws.
 */
async function submitToGoogle(
  url: string,
  type: "URL_UPDATED" | "URL_DELETED"
): Promise<void> {
  if (!GOOGLE_INDEXING_CREDENTIALS) {
    // Optional — only log at debug level
    return;
  }

  try {
    const credentials = JSON.parse(GOOGLE_INDEXING_CREDENTIALS);
    const accessToken = await getGoogleAccessToken(credentials);
    if (!accessToken) return;

    const response = await fetch(
      "https://indexing.googleapis.com/v3/urlNotifications:publish",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ url, type }),
      }
    );

    if (response.ok) {
      console.log(`[Google] ✓ ${type}: ${url}`);
    } else {
      const text = await response.text().catch(() => "");
      console.error(`[Google] ✗ Failed (${response.status}): ${text}`);
    }
  } catch (error) {
    console.error("[Google] ✗ Error:", error instanceof Error ? error.message : error);
  }
}

// ── Public API ──────────────────────────────────────────────────────

/**
 * Notify all configured search engines of a URL change.
 * Fire-and-forget — runs in the background, never blocks the caller.
 *
 * @param url - Full URL (e.g., "https://strategicbuys.com.au/blog/my-post")
 * @param action - "update" for new/updated content, "delete" for removed content
 */
export function notifySearchEngines(url: string, action: "update" | "delete"): void {
  const googleType = action === "delete" ? "URL_DELETED" : "URL_UPDATED";

  // Run both in parallel, fire-and-forget
  Promise.allSettled([
    submitToIndexNow([url]),
    submitToGoogle(url, googleType),
  ]).then((results) => {
    const failures = results.filter((r) => r.status === "rejected");
    if (failures.length > 0) {
      console.error("[Indexing] Some submissions failed:", failures);
    }
  });
}

/**
 * Batch submit multiple URLs (for initial setup or re-indexing).
 * IndexNow supports batch; Google requires individual calls.
 */
export async function batchNotifySearchEngines(urls: string[]): Promise<void> {
  if (urls.length === 0) return;

  console.log(`[Indexing] Submitting ${urls.length} URLs to search engines...`);

  // IndexNow supports batch (up to 10,000 URLs)
  await submitToIndexNow(urls);

  // Google requires individual submissions (rate limit: ~200/day)
  if (GOOGLE_INDEXING_CREDENTIALS) {
    for (const url of urls) {
      await submitToGoogle(url, "URL_UPDATED");
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  console.log("[Indexing] Batch submission complete.");
}
