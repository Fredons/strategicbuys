import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { prisma } from "@/lib/prisma";
import {
  sendEnquiryNotification,
  sendEnquiryConfirmation,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { firstName, lastName, email, phone, service, budget, message } =
      parsed.data;

    const fullName = `${firstName} ${lastName}`;

    // Save enquiry to database
    const enquiry = await prisma.enquiry.create({
      data: {
        name: fullName,
        email,
        phone: phone || null,
        service: service || null,
        budget: budget || null,
        message,
        source: "contact-form",
      },
    });

    // Send email notifications (non-blocking — don't let email failures break the form)
    const emailData = {
      name: fullName,
      email,
      phone,
      service,
      budget,
      message,
    };
    await Promise.allSettled([
      sendEnquiryNotification(emailData),
      sendEnquiryConfirmation(emailData),
    ]);

    return NextResponse.json(
      { success: true, id: enquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
