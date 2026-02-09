import { BlogForm } from "@/components/admin/blog-form";
import { prisma } from "@/lib/prisma";

export default async function AdminNewPostPage() {
  let categories: { id: string; name: string }[] = [];

  try {
    categories = await prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
  } catch {
    // Database not available
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">New Post</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create a new blog post
        </p>
      </div>

      <BlogForm categories={categories} />
    </>
  );
}
