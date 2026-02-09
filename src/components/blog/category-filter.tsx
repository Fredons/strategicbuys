"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  categories: { name: string; slug: string }[];
  activeSlug?: string;
}

export function CategoryFilter({ categories, activeSlug }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleFilter(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    params.delete("page");
    router.push(`/blog?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleFilter(null)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          !activeSlug
            ? "gradient-gold text-white shadow-sm"
            : "border border-gray-200 bg-white text-gray-600 hover:border-gold hover:text-gold"
        }`}
      >
        All Posts
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleFilter(cat.slug)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeSlug === cat.slug
              ? "gradient-gold text-white shadow-sm"
              : "border border-gray-200 bg-white text-gray-600 hover:border-gold hover:text-gold"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
