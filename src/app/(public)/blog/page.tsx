import { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { BlogCard } from "@/components/blog/blog-card";
import { CategoryFilter } from "@/components/blog/category-filter";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";
import { getPublishedPosts, getAllCategories } from "@/lib/queries/blog";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Property Insights & Buyer's Agent Tips",
  description:
    "Expert insights on the Australian property market. Read tips on buying property, investment strategies, auction advice, and market updates from Strategic Buys.",
  alternates: { canonical: "/blog" },
};

const POSTS_PER_PAGE = 9;

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

async function BlogContent({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const categorySlug = params.category || undefined;

  let posts: Awaited<ReturnType<typeof getPublishedPosts>> = {
    posts: [],
    total: 0,
    totalPages: 0,
    currentPage: 1,
  };
  let categories: { name: string; slug: string }[] = [];

  try {
    [posts, categories] = await Promise.all([
      getPublishedPosts({
        page: currentPage,
        perPage: POSTS_PER_PAGE,
        categorySlug,
      }),
      getAllCategories(),
    ]);
  } catch {
    // Database not available yet
  }

  return (
    <>
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mx-auto max-w-[1200px] px-6 pt-10 lg:px-8">
          <Suspense>
            <CategoryFilter
              categories={categories}
              activeSlug={categorySlug}
            />
          </Suspense>
        </div>
      )}

      {/* Blog Grid */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
          {posts.posts.length > 0 ? (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.posts.map((post, idx) => (
                  <div key={post.id} className={idx === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
                    <BlogCard
                      title={post.title}
                      slug={post.slug}
                      excerpt={post.excerpt}
                      featuredImage={post.featuredImage}
                      publishedAt={post.publishedAt}
                      category={post.category}
                      author={post.author}
                      content={post.content}
                      featured={idx === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {posts.totalPages > 1 && (
                <nav className="mt-12 flex items-center justify-center gap-2">
                  {currentPage > 1 && (
                    <Link
                      href={`/blog?${new URLSearchParams({
                        ...(categorySlug ? { category: categorySlug } : {}),
                        page: String(currentPage - 1),
                      }).toString()}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-gold hover:text-gold"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  )}

                  {Array.from({ length: posts.totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Link
                        key={page}
                        href={`/blog?${new URLSearchParams({
                          ...(categorySlug ? { category: categorySlug } : {}),
                          page: String(page),
                        }).toString()}`}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          page === currentPage
                            ? "gradient-gold text-white"
                            : "border border-gray-200 text-gray-500 hover:border-gold hover:text-gold"
                        }`}
                      >
                        {page}
                      </Link>
                    )
                  )}

                  {currentPage < posts.totalPages && (
                    <Link
                      href={`/blog?${new URLSearchParams({
                        ...(categorySlug ? { category: categorySlug } : {}),
                        page: String(currentPage + 1),
                      }).toString()}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:border-gold hover:text-gold"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                </nav>
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <h3 className="font-heading text-xl font-bold text-gray-900">
                No posts yet
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Check back soon for property insights and market updates.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-gray-100 bg-gray-50 py-14">
        <div className="mx-auto max-w-[560px] px-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Stay Informed
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Get the latest property insights and market updates delivered to your
            inbox.
          </p>
          <form className="mt-6 flex gap-3" action="/api/subscribe" method="POST">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              className="flex-1 rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(184,134,11,0.08)] focus:outline-none"
            />
            <button
              type="submit"
              className="gradient-gold shrink-0 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default function BlogPage(props: BlogPageProps) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Strategic Buys Blog",
          description:
            "Expert insights on the Australian property market from licensed buyer's agents.",
          url: `${siteConfig.url}/blog`,
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Blog" },
          ],
        }}
      />

      <PageHeader
        title="Property Insights"
        subtitle="Expert analysis, buying tips, and market updates from our team of licensed buyer's agents."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent" />
          </div>
        }
      >
        <BlogContent {...props} />
      </Suspense>
    </>
  );
}
