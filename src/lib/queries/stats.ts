import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const now = new Date();

  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    scheduledPosts,
    totalEnquiries,
    newEnquiries,
    totalSubscribers,
    totalCategories,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({
      where: { status: "PUBLISHED", publishedAt: { lte: now } },
    }),
    prisma.blogPost.count({ where: { status: "DRAFT" } }),
    prisma.blogPost.count({
      where: { status: "PUBLISHED", publishedAt: { gt: now } },
    }),
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.subscriber.count({ where: { status: "ACTIVE" } }),
    prisma.category.count(),
  ]);

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    scheduledPosts,
    totalEnquiries,
    newEnquiries,
    totalSubscribers,
    totalCategories,
  };
}
