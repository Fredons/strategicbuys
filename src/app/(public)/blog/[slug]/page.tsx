import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
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

      <PageHeader
        title={post.title}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="py-10 lg:py-14">
        <div className="mx-auto max-w-[800px] px-6 lg:px-8">
          {/* Meta */}
          <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {post.category && (
              <Link
                href={`/blog?category=${post.category.slug}`}
                className="rounded-full bg-purple-light/10 px-3 py-1 text-xs font-semibold text-purple-dark transition-colors hover:bg-purple-light/20"
              >
                {post.category.name}
              </Link>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(post.publishedAt)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readTime} min read
            </span>
            {post.author?.name && (
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {post.author.name}
              </span>
            )}
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-xl">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 800px) 100vw, 800px"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-gray max-w-none prose-headings:font-heading prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Tags:
              </span>
              {post.tags.map((tag: { id: string; name: string }) => (
                <span
                  key={tag.id}
                  className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
            <ShareButtons title={post.title} url={postUrl} />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 py-14">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
            <h2 className="mb-8 text-center font-heading text-2xl font-bold text-gray-900">
              Related Articles
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
