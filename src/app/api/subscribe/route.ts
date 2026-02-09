import { NextRequest, NextResponse } from "next/server";
import { subscribeSchema } from "@/lib/validations/subscribe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { email, name } = parsed.data;

    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.status === "UNSUBSCRIBED") {
        // Re-subscribe
        await prisma.subscriber.update({
          where: { email },
          data: { status: "ACTIVE", unsubscribedAt: null },
        });
        return NextResponse.json({ success: true, resubscribed: true });
      }
      return NextResponse.json({ success: true, alreadySubscribed: true });
    }

    await prisma.subscriber.create({
      data: {
        email,
        name: name || null,
      },
    });

    // TODO: Send welcome email via Resend when API key is configured

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
