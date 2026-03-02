import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendFollowUpEmail } from "@/lib/email";

/**
 * Cron job: Auto-sends follow-up emails for NEW enquiries
 * that are older than 48 hours and haven't been followed up on.
 *
 * Only follows up on HOT and WARM leads (not COLD).
 *
 * Triggered by Vercel Cron — runs daily at 9 AM UTC (7 PM AEST).
 */
export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

    // Find NEW enquiries older than 48h that haven't been followed up
    const staleEnquiries = await prisma.enquiry.findMany({
      where: {
        status: "NEW",
        priority: { in: ["HOT", "WARM"] },
        followUpSentAt: null,
        createdAt: { lt: fortyEightHoursAgo },
      },
      select: {
        id: true,
        name: true,
        email: true,
        service: true,
      },
    });

    if (staleEnquiries.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No stale enquiries to follow up on",
        count: 0,
      });
    }

    let sentCount = 0;

    for (const enquiry of staleEnquiries) {
      const result = await sendFollowUpEmail({
        name: enquiry.name,
        email: enquiry.email,
        service: enquiry.service,
      });

      if (result) {
        await prisma.enquiry.update({
          where: { id: enquiry.id },
          data: { followUpSentAt: new Date() },
        });
        sentCount++;
      }

      // Small delay between emails to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    console.log(
      `[Cron] Follow-up: Sent ${sentCount}/${staleEnquiries.length} follow-up emails`
    );

    return NextResponse.json({
      success: true,
      message: `Sent ${sentCount} follow-up emails`,
      count: sentCount,
    });
  } catch (error) {
    console.error("[Cron] Follow-up error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
