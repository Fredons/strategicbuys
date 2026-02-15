import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all subscribers (with optional status filter)
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const format = searchParams.get("format");

  const where = status && status !== "ALL" ? { status: status as "ACTIVE" | "UNSUBSCRIBED" } : {};

  const subscribers = await prisma.subscriber.findMany({
    where,
    orderBy: { subscribedAt: "desc" },
  });

  // CSV export
  if (format === "csv") {
    const header = "Email,Name,Status,Subscribed At\n";
    const rows = subscribers
      .map(
        (s) =>
          `"${s.email}","${s.name || ""}","${s.status}","${s.subscribedAt.toISOString()}"`
      )
      .join("\n");

    return new NextResponse(header + rows, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json(subscribers);
}

// DELETE a subscriber
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  await prisma.subscriber.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

// PATCH — toggle subscriber status
export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();

  if (!id || !["ACTIVE", "UNSUBSCRIBED"].includes(status)) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  const subscriber = await prisma.subscriber.update({
    where: { id },
    data: {
      status,
      unsubscribedAt: status === "UNSUBSCRIBED" ? new Date() : null,
    },
  });

  return NextResponse.json(subscriber);
}
