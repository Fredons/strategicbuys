import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendReplyEmail } from "@/lib/email";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { subject, body } = await req.json();

  if (!subject || !body) {
    return NextResponse.json(
      { error: "Subject and body are required" },
      { status: 400 }
    );
  }

  // Get the enquiry
  const enquiry = await prisma.enquiry.findUnique({ where: { id } });
  if (!enquiry) {
    return NextResponse.json({ error: "Enquiry not found" }, { status: 404 });
  }

  // Send the reply email
  const result = await sendReplyEmail({
    to: enquiry.email,
    subject,
    body,
    enquirerName: enquiry.name,
  });

  if (!result) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }

  // Update enquiry: mark as REPLIED and add a note
  const timestamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  const replyNote = `[${timestamp}] Replied: "${subject}"`;
  const updatedNotes = enquiry.notes
    ? `${enquiry.notes}\n${replyNote}`
    : replyNote;

  await prisma.enquiry.update({
    where: { id },
    data: {
      status: "REPLIED",
      notes: updatedNotes,
    },
  });

  return NextResponse.json({ success: true });
}
