import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalEnquiries,
    newEnquiries,
    totalSubscribers,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.blogPost.count({ where: { status: "DRAFT" } }),
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.subscriber.count({ where: { status: "ACTIVE" } }),
  ]);

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalEnquiries,
    newEnquiries,
    totalSubscribers,
  };
}
