import { NextResponse } from "next/server";

/**
 * IndexNow Key Verification Endpoint
 *
 * IndexNow requires the API key to be accessible at a public URL.
 * This endpoint returns the key as plain text for verification.
 *
 * GET /api/indexnow → returns the INDEXNOW_API_KEY as text/plain
 */
export async function GET() {
  const key = process.env.INDEXNOW_API_KEY;

  if (!key) {
    return NextResponse.json(
      { error: "IndexNow API key not configured" },
      { status: 500 }
    );
  }

  return new NextResponse(key, {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
