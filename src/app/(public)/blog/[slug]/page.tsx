import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import { CTABanner } from "@/components/shared/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/constants/site";
import {
  getPostBySlug,
  getRelatedPosts,
  getAllPublishedSlugs,
} from "@/lib/queries/blog";
import { formatDate, getReadTime } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Always serve fresh data from database
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const posts: { slug: string }[] = await getAllPublishedSlugs();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return { title: "Post Not Found" };

    return {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      alternates: { canonical: `/blog/${slug}` },
      openGraph: {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt || undefined,
        type: "article",
        publishedTime: post.publishedAt?.toISOString(),
        authors: post.author?.name ? [post.author.name] : undefined,
        images: post.featuredImage ? [post.featuredImage] : undefined,
      },
    };
  } catch {
    return { title: "Post Not Found" };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();

  const readTime = getReadTime(post.content);
  const postUrl = `${siteConfig.url}/blog/${slug}`;

  const related = await getRelatedPosts(post.id, post.categoryId).catch(
    () => [] as Awaited<ReturnType<typeof getRelatedPosts>>
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: post.featuredImage || undefined,
          datePublished: post.publishedAt?.toISOString(),
          dateModified: post.updatedAt.toISOString(),
          author: {
            "@type": "Person",
            name: post.author?.name || "Strategic Buys",
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
          },
          mainEntityOfPage: postUrl,
          wordCount: post.content.split(/\s+/).length,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: siteConfig.url,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${siteConfig.url}/blog`,
            },
            { "@type": "ListItem", position: 3, name: post.title },
          ],
        }}
      />

      {/* ── Article Header ─────────────────────────────────── */}
      <header className="bg-white pt-28 pb-8 md:pt-36 md:pb-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-gold">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition-colors hover:text-gold">
              Blog
            </Link>
            <span>/</span>
            <span className="truncate text-gray-500">
              {post.title.length > 40
                ? post.title.slice(0, 40) + "..."
                : post.title}
            </span>
          </nav>

          {/* Category + Reading Time */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {post.category && (
              <Link
                href={`/blog?category=${post.category.slug}`}
                className="inline-flex items-center rounded-full bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold-dark transition-colors hover:bg-gold/20"
              >
                {post.category.name}
              </Link>
            )}
            <span className="flex items-center gap-1.5 text-sm text-gray-400">
              <Clock className="h-3.5 w-3.5" />
              {readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl font-extrabold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem]">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-5 text-lg leading-relaxed text-gray-500 md:text-xl">
              {post.excerpt}
            </p>
          )}

          {/* Author + Date */}
          <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold/20 to-gold/5 font-heading text-sm font-bold text-gold-dark">
              {post.author?.name
                ? post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "SB"}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {post.author?.name || "Strategic Buys"}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                {post.publishedAt && (
                  <time dateTime={post.publishedAt.toISOString()}>
                    {formatDate(post.publishedAt)}
                  </time>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Featured Image (wider than content) ────────────── */}
      {post.featuredImage && (
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="relative aspect-[2/1] overflow-hidden rounded-xl md:rounded-2xl">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>
        </div>
      )}

      {/* ── Article Content ────────────────────────────────── */}
      <article className="py-10 md:py-14">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          {/* Content — styled via .article-content in globals.css */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-6">
              <Tag className="h-4 w-4 text-gray-400" />
              {post.tags.map((tag: { id: string; name: string }) => (
                <span
                  key={tag.id}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500 transition-colors hover:border-gold/30 hover:bg-gold/5 hover:text-gold-dark"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Share + Back */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-semibold text-gray-400 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              All Articles
            </Link>
            <ShareButtons title={post.title} url={postUrl} />
          </div>
        </div>
      </article>

      {/* ── Newsletter CTA ─────────────────────────────────── */}
      <section className="mx-auto max-w-2xl px-6 pb-14 lg:px-8">
        <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-off-white to-cream p-8 text-center md:p-10">
          <h3 className="font-heading text-xl font-bold text-gray-900 md:text-2xl">
            Want more property insights?
          </h3>
          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Get expert market updates and buying tips delivered to your inbox.
          </p>
          <form
            className="mt-5 flex flex-col gap-3 sm:flex-row"
            action="/api/subscribe"
            method="POST"
          >
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

      {/* ── Related Posts ──────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-14 lg:py-20">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
            <h2 className="mb-10 text-center font-heading text-2xl font-bold text-gray-900 md:text-3xl">
              You Might Also Like
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relPost) => (
                <BlogCard
                  key={relPost.id}
                  title={relPost.title}
                  slug={relPost.slug}
                  excerpt={relPost.excerpt}
                  featuredImage={relPost.featuredImage}
                  publishedAt={relPost.publishedAt}
                  category={relPost.category}
                  author={relPost.author}
                  content={relPost.content}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
