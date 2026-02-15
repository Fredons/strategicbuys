"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Eye, Calendar } from "lucide-react";
import { slugify } from "@/lib/utils";
import { ImageUpload } from "@/components/admin/image-upload";

interface Category {
  id: string;
  name: string;
}

interface BlogFormProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featuredImage: string | null;
    status: string;
    publishedAt: string | null;
    categoryId: string | null;
    metaTitle: string | null;
    metaDescription: string | null;
    tags: { id: string; name: string }[];
  };
  categories: Category[];
}

function toLocalDatetime(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function BlogForm({ post, categories }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [featuredImage, setFeaturedImage] = useState(
    post?.featuredImage || ""
  );
  const [status, setStatus] = useState(post?.status || "DRAFT");
  const [publishedAt, setPublishedAt] = useState(
    toLocalDatetime(post?.publishedAt || null)
  );
  const [categoryId, setCategoryId] = useState(post?.categoryId || "");
  const [metaTitle, setMetaTitle] = useState(post?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    post?.metaDescription || ""
  );
  const [tagsInput, setTagsInput] = useState(
    post?.tags.map((t) => t.name).join(", ") || ""
  );

  const isEditing = !!post;

  useEffect(() => {
    if (!isEditing && title) {
      setSlug(slugify(title));
    }
  }, [title, isEditing]);

  const isScheduled =
    status === "PUBLISHED" &&
    publishedAt &&
    new Date(publishedAt) > new Date();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const body = {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      featuredImage: featuredImage || null,
      status,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
      categoryId: categoryId || null,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      tags,
    };

    try {
      const url = isEditing ? `/api/blog/${post.id}` : "/api/blog";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save post");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main Content */}
        <div className="space-y-5">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 transition-all focus:border-gold focus:outline-none"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 transition-all focus:border-gold focus:outline-none"
              placeholder="auto-generated-from-title"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Excerpt
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              className="w-full resize-y rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 transition-all focus:border-gold focus:outline-none"
              placeholder="Short description for blog listing and SEO"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Content * (HTML)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={20}
              className="w-full resize-y rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 font-mono text-sm text-gray-800 transition-all focus:border-gold focus:outline-none"
              placeholder="<h2>Your content here...</h2><p>Write your blog post content in HTML.</p>"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-gray-900">Publish</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-gold focus:outline-none"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              {status === "PUBLISHED" && (
                <div>
                  <label className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-700">
                    <Calendar className="h-3 w-3" />
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-gold focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {isScheduled ? (
                      <span className="font-medium text-blue-600">
                        Scheduled — will go live at this date
                      </span>
                    ) : publishedAt ? (
                      "Published immediately"
                    ) : (
                      "Leave blank to publish now"
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="gradient-gold inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isScheduled
                  ? "Schedule"
                  : isEditing
                    ? "Update"
                    : status === "PUBLISHED"
                      ? "Publish"
                      : "Save Draft"}
              </button>
              {isEditing && post.status === "PUBLISHED" && (
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:border-gold hover:text-gold"
                >
                  <Eye className="h-4 w-4" />
                  View
                </a>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-gray-900">Category</h3>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-gold focus:outline-none"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-gray-900">Tags</h3>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-gold focus:outline-none"
              placeholder="Tag 1, Tag 2, Tag 3"
            />
            <p className="mt-1 text-xs text-gray-500">
              Separate tags with commas
            </p>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-gray-900">
              Featured Image
            </h3>
            <ImageUpload
              value={featuredImage}
              onChange={setFeaturedImage}
              folder="blog"
            />
          </div>

          {/* SEO */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold text-gray-900">SEO</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 flex items-center justify-between text-xs text-gray-500">
                  Meta Title
                  <span
                    className={
                      metaTitle.length > 60 ? "text-red-500" : "text-gray-400"
                    }
                  >
                    {metaTitle.length}/70
                  </span>
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  maxLength={70}
                  className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-gold focus:outline-none"
                  placeholder="Custom meta title (optional)"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center justify-between text-xs text-gray-500">
                  Meta Description
                  <span
                    className={
                      metaDescription.length > 150
                        ? "text-red-500"
                        : "text-gray-400"
                    }
                  >
                    {metaDescription.length}/160
                  </span>
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  maxLength={160}
                  rows={3}
                  className="w-full resize-y rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 focus:border-gold focus:outline-none"
                  placeholder="Custom meta description (optional)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
