import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/validations/blog";
import { slugify } from "@/lib/utils";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: {
      category: true,
      author: { select: { name: true, email: true } },
      tags: true,
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = blogPostSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { title, slug, excerpt, content, featuredImage, status, categoryId, tags, metaTitle, metaDescription } = parsed.data;

  const finalSlug = slug || slugify(title);

  // Check slug uniqueness (excluding current post)
  const existing = await prisma.blogPost.findFirst({
    where: { slug: finalSlug, NOT: { id } },
  });
  if (existing) {
    return NextResponse.json(
      { error: "A post with this slug already exists" },
      { status: 409 }
    );
  }

  // Get current post to check status transition
  const currentPost = await prisma.blogPost.findUnique({ where: { id } });
  if (!currentPost) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const publishedAt =
    status === "PUBLISHED" && currentPost.status !== "PUBLISHED"
      ? new Date()
      : currentPost.publishedAt;

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug: finalSlug,
      excerpt: excerpt || null,
      content,
      featuredImage: featuredImage || null,
      status: status || currentPost.status,
      publishedAt,
      categoryId: categoryId || null,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      tags: {
        set: [],
        connectOrCreate: (tags || []).map((tag: string) => ({
          where: { name: tag },
          create: { name: tag, slug: slugify(tag) },
        })),
      },
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  await prisma.blogPost.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
