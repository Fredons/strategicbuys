import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.siteSettings.findFirst();
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const {
    siteName,
    contactEmail,
    contactPhone,
    address,
    facebookUrl,
    instagramUrl,
    linkedinUrl,
    defaultMetaTitle,
    defaultMetaDescription,
  } = body;

  // Upsert: create if not exists, update if exists
  const existing = await prisma.siteSettings.findFirst();

  let settings;
  if (existing) {
    settings = await prisma.siteSettings.update({
      where: { id: existing.id },
      data: {
        siteName,
        contactEmail,
        contactPhone,
        address,
        facebookUrl,
        instagramUrl,
        linkedinUrl,
        defaultMetaTitle,
        defaultMetaDescription,
      },
    });
  } else {
    settings = await prisma.siteSettings.create({
      data: {
        siteName: siteName || "Strategic Buys",
        contactEmail: contactEmail || "support@strategicbuys.com.au",
        address,
        facebookUrl,
        instagramUrl,
        linkedinUrl,
        defaultMetaTitle,
        defaultMetaDescription,
      },
    });
  }

  return NextResponse.json(settings);
}
