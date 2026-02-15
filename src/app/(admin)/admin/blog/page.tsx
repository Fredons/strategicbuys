import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink, Clock, CalendarClock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { DeletePostButton } from "@/components/admin/delete-post-button";

export default async function AdminBlogListPage() {
  let posts: {
    id: string;
    title: string;
    slug: string;
    status: string;
    publishedAt: Date | null;
    createdAt: Date;
    category: { name: string } | null;
    author: { name: string | null } | null;
  }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        category: { select: { name: true } },
        author: { select: { name: true } },
      },
    });
  } catch {
    // Database not available
  }

  const now = new Date();

  // Counts for summary
  const publishedCount = posts.filter(
    (p) => p.status === "PUBLISHED" && p.publishedAt && p.publishedAt <= now
  ).length;
  const scheduledCount = posts.filter(
    (p) => p.status === "PUBLISHED" && p.publishedAt && p.publishedAt > now
  ).length;
  const draftCount = posts.filter((p) => p.status === "DRAFT").length;

  function getStatusInfo(post: (typeof posts)[0]) {
    if (post.status === "PUBLISHED" && post.publishedAt && post.publishedAt > now) {
      return {
        label: "Scheduled",
        className: "bg-blue-50 text-blue-700",
        icon: <CalendarClock className="mr-1 h-3 w-3" />,
      };
    }
    if (post.status === "PUBLISHED") {
      return {
        label: "Published",
        className: "bg-green-50 text-green-700",
        icon: null,
      };
    }
    if (post.status === "DRAFT") {
      return {
        label: "Draft",
        className: "bg-yellow-50 text-yellow-700",
        icon: null,
      };
    }
    return {
      label: post.status.charAt(0) + post.status.slice(1).toLowerCase(),
      className: "bg-gray-100 text-gray-500",
      icon: null,
    };
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your blog content
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="gradient-gold inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {/* Summary Stats */}
      {posts.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {publishedCount} Published
          </span>
          {scheduledCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              {scheduledCount} Scheduled
            </span>
          )}
          {draftCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              {draftCount} Drafts
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-400 shadow-sm ring-1 ring-gray-100">
            {posts.length} Total
          </span>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-3">Title</th>
              <th className="hidden px-5 py-3 md:table-cell">Category</th>
              <th className="px-5 py-3">Status</th>
              <th className="hidden px-5 py-3 sm:table-cell">Date</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.length > 0 ? (
              posts.map((post) => {
                const status = getStatusInfo(post);
                const isLive =
                  post.status === "PUBLISHED" &&
                  post.publishedAt &&
                  post.publishedAt <= now;
                const isScheduled =
                  post.status === "PUBLISHED" &&
                  post.publishedAt &&
                  post.publishedAt > now;

                return (
                  <tr
                    key={post.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    {/* Title */}
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-sm font-medium text-gray-800 hover:text-gold"
                      >
                        {post.title}
                      </Link>
                      {isScheduled && post.publishedAt && (
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-blue-500">
                          <Clock className="h-3 w-3" />
                          Publishes {formatDate(post.publishedAt)}
                        </p>
                      )}
                    </td>

                    {/* Category */}
                    <td className="hidden px-5 py-3 text-sm text-gray-500 md:table-cell">
                      {post.category?.name || "—"}
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                      >
                        {status.icon}
                        {status.label}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="hidden px-5 py-3 text-sm text-gray-500 sm:table-cell">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* View live post */}
                        {isLive && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-600"
                            title="View live post"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        )}

                        {/* Edit */}
                        <Link
                          href={`/admin/blog/${post.id}`}
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                          title="Edit post"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>

                        {/* Delete */}
                        <DeletePostButton postId={post.id} postTitle={post.title} />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-sm text-gray-500"
                >
                  No blog posts yet.{" "}
                  <Link
                    href="/admin/blog/new"
                    className="font-semibold text-gold hover:text-gold-dark"
                  >
                    Create your first post
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
