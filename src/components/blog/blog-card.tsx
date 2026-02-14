import Link from "next/link";
import Image from "next/image";
import { formatDate, getReadTime } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: Date | null;
  category: { name: string; slug: string } | null;
  author: { name: string | null } | null;
  content: string;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  category,
  author,
  content,
}: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-light/10 to-gold/10">
              <span className="text-4xl font-bold text-gray-200">SB</span>
            </div>
          )}
          {category && (
            <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-purple-dark backdrop-blur-sm">
              {category.name}
            </span>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-3 text-xs text-gray-500">
          {publishedAt && <time>{formatDate(publishedAt)}</time>}
          <span>{getReadTime(content)} min read</span>
        </div>

        <Link href={`/blog/${slug}`}>
          <h3 className="mb-2 font-heading text-lg font-bold text-gray-900 transition-colors group-hover:text-gold">
            {title}
          </h3>
        </Link>

        {excerpt && (
          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-500">
            {excerpt}
          </p>
        )}

        <div className="flex items-center justify-between">
          {author?.name && (
            <span className="text-xs font-medium text-gray-500">
              By {author.name}
            </span>
          )}
          <Link
            href={`/blog/${slug}`}
            className="text-xs font-semibold text-gold transition-colors hover:text-gold-dark"
          >
            Read More &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
