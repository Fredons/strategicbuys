import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const format = searchParams.get("format");

  // Build filter
  const where: Record<string, unknown> = {};
  if (status && status !== "ALL") {
    where.status = status;
  }
  if (priority && priority !== "ALL") {
    where.priority = priority;
  }

  const enquiries = await prisma.enquiry.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  // CSV export
  if (format === "csv") {
    const header =
      "Name,Email,Phone,Service,Budget,Status,Priority,Date,Notes\n";
    const rows = enquiries
      .map(
        (e) =>
          `"${e.name}","${e.email}","${e.phone || ""}","${e.service || ""}","${e.budget || ""}","${e.status}","${e.priority}","${e.createdAt.toISOString()}","${(e.notes || "").replace(/"/g, '""')}"`
      )
      .join("\n");

    return new NextResponse(header + rows, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json(enquiries);
}
