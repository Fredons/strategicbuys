import {
  FileText,
  Send,
  MessageSquare,
  Users,
  Eye,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { StatsCard } from "@/components/admin/stats-card";
import { getDashboardStats } from "@/lib/queries/stats";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  let stats = {
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
    totalSubscribers: 0,
  };
  let recentPosts: {
    id: string;
    title: string;
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

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your website activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard
          title="Total Posts"
          value={stats.totalPosts}
          icon={FileText}
        />
        <StatsCard
          title="Published"
          value={stats.publishedPosts}
          icon={Eye}
        />
        <StatsCard
          title="Drafts"
          value={stats.draftPosts}
          icon={Clock}
        />
        <StatsCard
          title="Enquiries"
          value={stats.totalEnquiries}
          icon={MessageSquare}
        />
        <StatsCard
          title="New Enquiries"
          value={stats.newEnquiries}
          icon={Send}
        />
        <StatsCard
          title="Subscribers"
          value={stats.totalSubscribers}
          icon={Users}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
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
              recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/blog/${post.id}`}
                  className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-gray-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-800">
                      {post.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`ml-3 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      post.status === "PUBLISHED"
                        ? "bg-green-50 text-green-700"
                        : post.status === "DRAFT"
                        ? "bg-yellow-50 text-yellow-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {post.status.charAt(0) + post.status.slice(1).toLowerCase()}
                  </span>
                </Link>
              ))
            ) : (
              <div className="px-5 py-8 text-center text-sm text-gray-400">
                No posts yet
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
                  <span
                    className={`ml-3 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
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
                </Link>
              ))
            ) : (
              <div className="px-5 py-8 text-center text-sm text-gray-400">
                No enquiries yet
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
