import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { blogPostSchema } from "@/lib/validations/blog";
import { slugify } from "@/lib/utils";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true, slug: true } },
      author: { select: { name: true } },
      tags: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = blogPostSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { title, slug, excerpt, content, featuredImage, status, publishedAt, categoryId, tags, metaTitle, metaDescription } = parsed.data;

  const finalSlug = slug || slugify(title);

  // Check for slug uniqueness
  const existing = await prisma.blogPost.findUnique({
    where: { slug: finalSlug },
  });
  if (existing) {
    return NextResponse.json(
      { error: "A post with this slug already exists" },
      { status: 409 }
    );
  }

  // Determine publishedAt date
  let finalPublishedAt: Date | null = null;
  if (status === "PUBLISHED") {
    finalPublishedAt = publishedAt ? new Date(publishedAt) : new Date();
  }

  const post = await prisma.blogPost.create({
    data: {
      title,
      slug: finalSlug,
      excerpt: excerpt || null,
      content,
      featuredImage: featuredImage || null,
      status: status || "DRAFT",
      publishedAt: finalPublishedAt,
      categoryId: categoryId || null,
      authorId: session.user.id!,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      tags: tags?.length
        ? {
            connectOrCreate: tags.map((tag: string) => ({
              where: { name: tag },
              create: { name: tag, slug: slugify(tag) },
            })),
          }
        : undefined,
    },
  });

  // Revalidate blog listing so new post appears immediately
  revalidatePath("/blog");

  return NextResponse.json(post, { status: 201 });
}
