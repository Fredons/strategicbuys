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
  const now = new Date();

  const where = {
    status: "PUBLISHED" as const,
    publishedAt: { lte: now },
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
  const now = new Date();

  return prisma.blogPost.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
      publishedAt: { lte: now },
    },
    include: {
      category: true,
      author: { select: { name: true } },
      tags: true,
    },
  });
}

export async function getRelatedPosts(postId: string, categoryId: string | null, limit = 3) {
  const now = new Date();

  return prisma.blogPost.findMany({
    where: {
      id: { not: postId },
      status: "PUBLISHED",
      publishedAt: { lte: now },
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
  const now = new Date();

  return prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: { lte: now },
    },
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
  const now = new Date();

  return prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      publishedAt: { lte: now },
    },
    select: { slug: true, updatedAt: true },
  });
}
