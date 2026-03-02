import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { prisma } from "@/lib/prisma";
import {
  sendEnquiryNotification,
  sendEnquiryConfirmation,
  getNotificationEmails,
} from "@/lib/email";
import { scoreLead } from "@/lib/lead-scoring";
import {
  serviceBlogMapping,
  defaultBlogSlugs,
} from "@/lib/constants/blog-mapping";

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

    // Score the lead
    const priority = scoreLead({ service, budget, message });

    // Save enquiry to database
    const enquiry = await prisma.enquiry.create({
      data: {
        name: fullName,
        email,
        phone: phone || null,
        service: service || null,
        budget: budget || null,
        message,
        priority,
        source: "contact-form",
      },
    });

    // Get notification recipients from settings
    const recipients = await getNotificationEmails();

    // Look up relevant blog posts based on service
    const slugs = service
      ? serviceBlogMapping[service] || defaultBlogSlugs
      : defaultBlogSlugs;

    let blogPosts: { title: string; slug: string }[] = [];
    try {
      const posts = await prisma.blogPost.findMany({
        where: {
          slug: { in: slugs },
          status: "PUBLISHED",
        },
        select: { title: true, slug: true },
        take: 3,
      });
      blogPosts = posts;
    } catch {
      // Non-critical — continue without blog posts
    }

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
      sendEnquiryNotification(emailData, recipients),
      sendEnquiryConfirmation(emailData, blogPosts),
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
