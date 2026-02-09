import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

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

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="text-sm font-medium text-gray-800 hover:text-gold"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">
                    {post.category?.name || "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        post.status === "PUBLISHED"
                          ? "bg-green-50 text-green-700"
                          : post.status === "DRAFT"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {post.status.charAt(0) +
                        post.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-400">
                    {formatDate(post.publishedAt || post.createdAt)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <form action={`/api/blog/${post.id}`} method="POST">
                        <input type="hidden" name="_method" value="DELETE" />
                        <button
                          type="submit"
                          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center text-sm text-gray-400">
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
