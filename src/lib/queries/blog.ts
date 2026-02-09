import { prisma } from "@/lib/prisma";

export async function getPublishedPosts({
  page = 1,
  perPage = 6,
  categorySlug,
}: {
  page?: number;
  perPage?: number;
  categorySlug?: string;
} = {}) {
  const where = {
    status: "PUBLISHED" as const,
    ...(categorySlug && categorySlug !== "all"
      ? { category: { slug: categorySlug } }
      : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: {
        category: true,
        author: { select: { name: true } },
      },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return {
    posts,
    total,
    totalPages: Math.ceil(total / perPage),
    currentPage: page,
  };
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({
    where: { slug },
    include: {
      category: true,
      author: { select: { name: true } },
      tags: true,
    },
  });
}

export async function getRelatedPosts(postId: string, categoryId: string | null, limit = 3) {
  return prisma.blogPost.findMany({
    where: {
      id: { not: postId },
      status: "PUBLISHED",
      ...(categoryId ? { categoryId } : {}),
    },
    include: {
      category: true,
      author: { select: { name: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getRecentPosts(limit = 3) {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    include: {
      category: true,
      author: { select: { name: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getAllPublishedSlugs() {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });
}
