import { prisma } from "@/lib/prisma";
import { CategoryManager } from "@/components/admin/category-manager";

export default async function AdminCategoriesPage() {
  let categories: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    _count: { posts: number };
  }[] = [];

  try {
    categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: true } } },
    });
  } catch {
    // Database not available
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage blog post categories
        </p>
      </div>

      <CategoryManager categories={categories} />
    </>
  );
}
