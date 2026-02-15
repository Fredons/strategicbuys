import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET all categories with post count
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: true } } },
  });

  return NextResponse.json(categories);
}

// POST — create new category
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, description } = await req.json();

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { error: "Category name is required" },
      { status: 400 }
    );
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Check uniqueness
  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json(
      { error: "A category with this name already exists" },
      { status: 409 }
    );
  }

  const category = await prisma.category.create({
    data: {
      name: name.trim(),
      slug,
      description: description?.trim() || null,
    },
  });

  return NextResponse.json(category, { status: 201 });
}

// PUT — update category
export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, name, description } = await req.json();

  if (!id || !name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { error: "ID and name are required" },
      { status: 400 }
    );
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Check uniqueness (exclude current)
  const existing = await prisma.category.findFirst({
    where: { slug, id: { not: id } },
  });
  if (existing) {
    return NextResponse.json(
      { error: "A category with this name already exists" },
      { status: 409 }
    );
  }

  const category = await prisma.category.update({
    where: { id },
    data: {
      name: name.trim(),
      slug,
      description: description?.trim() || null,
    },
  });

  return NextResponse.json(category);
}

// DELETE — remove category
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  // Check if category has posts
  const count = await prisma.blogPost.count({ where: { categoryId: id } });
  if (count > 0) {
    return NextResponse.json(
      {
        error: `Cannot delete — ${count} post${count > 1 ? "s" : ""} use this category. Reassign them first.`,
      },
      { status: 400 }
    );
  }

  await prisma.category.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
