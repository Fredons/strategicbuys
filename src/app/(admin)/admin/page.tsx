import {
  FileText,
  Send,
  MessageSquare,
  Users,
  Plus,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats } from "@/lib/queries/stats";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  let stats = {
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    scheduledPosts: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    totalSubscribers: 0,
    totalCategories: 0,
  };
  let recentPosts: {
    id: string;
    title: string;
    slug: string;
    status: string;
    publishedAt: Date | null;
    createdAt: Date;
  }[] = [];
  let recentEnquiries: {
    id: string;
    name: string;
    email: string;
    service: string | null;
    status: string;
    createdAt: Date;
  }[] = [];

  try {
    [stats, recentPosts, recentEnquiries] = await Promise.all([
      getDashboardStats(),
      prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          publishedAt: true,
          createdAt: true,
        },
      }),
      prisma.enquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          service: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);
  } catch {
    // Database not available
  }

  const now = new Date();

  return (
    <>
      {/* Welcome Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back. Here&apos;s what&apos;s happening with your site.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="gradient-gold inline-flex items-center gap-2 self-start rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Blog Posts
              </p>
              <p className="mt-1.5 text-3xl font-bold text-gray-900">
                {stats.totalPosts}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  {stats.publishedPosts} live
                </span>
                {stats.draftPosts > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                    {stats.draftPosts} drafts
                  </span>
                )}
                {stats.scheduledPosts > 0 && (
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {stats.scheduledPosts} scheduled
                  </span>
                )}
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
              <FileText className="h-5 w-5 text-gold" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Enquiries
              </p>
              <p className="mt-1.5 text-3xl font-bold text-gray-900">
                {stats.totalEnquiries}
              </p>
              {stats.newEnquiries > 0 ? (
                <p className="mt-2 text-xs font-medium text-blue-600">
                  {stats.newEnquiries} new — needs attention
                </p>
              ) : (
                <p className="mt-2 text-xs text-gray-400">All caught up</p>
              )}
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <MessageSquare className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Subscribers
              </p>
              <p className="mt-1.5 text-3xl font-bold text-gray-900">
                {stats.totalSubscribers}
              </p>
              <p className="mt-2 text-xs text-gray-400">Active subscribers</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <Users className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Categories
              </p>
              <p className="mt-1.5 text-3xl font-bold text-gray-900">
                {stats.totalCategories}
              </p>
              <p className="mt-2 text-xs text-gray-400">Blog categories</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10">
            <Plus className="h-4 w-4 text-gold" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Write Post</p>
            <p className="text-[11px] text-gray-400">Create new blog post</p>
          </div>
        </Link>
        <Link
          href="/admin/enquiries"
          className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
            <Send className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Enquiries</p>
            <p className="text-[11px] text-gray-400">
              {stats.newEnquiries > 0
                ? `${stats.newEnquiries} unread`
                : "View all"}
            </p>
          </div>
        </Link>
        <Link
          href="/admin/categories"
          className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Categories</p>
            <p className="text-[11px] text-gray-400">Manage categories</p>
          </div>
        </Link>
        <Link
          href="/admin/subscribers"
          className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
            <Users className="h-4 w-4 text-green-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Subscribers</p>
            <p className="text-[11px] text-gray-400">Manage list</p>
          </div>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Posts */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-bold text-gray-900">Recent Posts</h2>
            <Link
              href="/admin/blog"
              className="text-xs font-semibold text-gold hover:text-gold-dark"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => {
                const isScheduled =
                  post.status === "PUBLISHED" &&
                  post.publishedAt &&
                  post.publishedAt > now;
                const isLive =
                  post.status === "PUBLISHED" &&
                  post.publishedAt &&
                  post.publishedAt <= now;

                return (
                  <div
                    key={post.id}
                    className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="block truncate text-sm font-medium text-gray-800 hover:text-gold"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-gray-400">
                        {formatDate(post.publishedAt || post.createdAt)}
                      </p>
                    </div>
                    <div className="ml-3 flex items-center gap-2">
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                          isScheduled
                            ? "bg-blue-50 text-blue-600"
                            : isLive
                              ? "bg-green-50 text-green-700"
                              : post.status === "DRAFT"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isScheduled
                          ? "Scheduled"
                          : post.status.charAt(0) +
                            post.status.slice(1).toLowerCase()}
                      </span>
                      {isLive && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="text-gray-300 hover:text-green-500"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-5 py-8 text-center text-sm text-gray-500">
                No posts yet.{" "}
                <Link
                  href="/admin/blog/new"
                  className="font-semibold text-gold"
                >
                  Create one
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Enquiries */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-bold text-gray-900">
              Recent Enquiries
            </h2>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-gold hover:text-gold-dark"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentEnquiries.length > 0 ? (
              recentEnquiries.map((enquiry) => (
                <Link
                  key={enquiry.id}
                  href={`/admin/enquiries/${enquiry.id}`}
                  className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-gray-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {enquiry.name}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {enquiry.service || enquiry.email}
                    </p>
                  </div>
                  <div className="ml-3 flex items-center gap-2">
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                        enquiry.status === "NEW"
                          ? "bg-blue-50 text-blue-700"
                          : enquiry.status === "READ"
                            ? "bg-yellow-50 text-yellow-700"
                            : enquiry.status === "REPLIED"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {enquiry.status.charAt(0) +
                        enquiry.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="px-5 py-8 text-center text-sm text-gray-500">
                No enquiries yet
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
