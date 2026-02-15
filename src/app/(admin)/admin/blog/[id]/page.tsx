import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { prisma } from "@/lib/prisma";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  let post = null;
  let categories: { id: string; name: string }[] = [];

  try {
    [post, categories] = await Promise.all([
      prisma.blogPost.findUnique({
        where: { id },
        include: { tags: { select: { id: true, name: true } } },
      }),
      prisma.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
    ]);
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
        <p className="mt-1 text-sm text-gray-500">
          Editing: {post.title}
        </p>
      </div>

      <BlogForm
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          featuredImage: post.featuredImage,
          status: post.status,
          publishedAt: post.publishedAt?.toISOString() || null,
          categoryId: post.categoryId,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          tags: post.tags,
        }}
        categories={categories}
      />
    </>
  );
}
