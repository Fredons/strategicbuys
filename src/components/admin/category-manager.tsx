"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, X, Loader2, Check } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  _count: { posts: number };
}

interface CategoryManagerProps {
  categories: Category[];
}

export function CategoryManager({ categories }: CategoryManagerProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function startCreate() {
    setEditingId(null);
    setName("");
    setDescription("");
    setError("");
    setShowForm(true);
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description || "");
    setError("");
    setShowForm(true);
  }

  function cancel() {
    setShowForm(false);
    setEditingId(null);
    setName("");
    setDescription("");
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const body = editingId
        ? { id: editingId, name, description }
        : { name, description };

      const res = await fetch("/api/categories", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save");
      }

      cancel();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(cat: Category) {
    if (
      !window.confirm(
        `Delete category "${cat.name}"? ${cat._count.posts > 0 ? `It has ${cat._count.posts} post(s).` : ""}`
      )
    )
      return;

    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cat.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to delete");
        return;
      }

      router.refresh();
    } catch {
      alert("Failed to delete category");
    }
  }

  return (
    <div className="space-y-6">
      {/* Add button */}
      {!showForm && (
        <button
          onClick={startCreate}
          className="gradient-gold inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      )}

      {/* Create / Edit form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">
              {editingId ? "Edit Category" : "New Category"}
            </h3>
            <button
              type="button"
              onClick={cancel}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {error && (
            <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-gold focus:outline-none"
                placeholder="e.g. Property Investment"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-gold focus:outline-none"
                placeholder="Brief description (optional)"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="gradient-gold inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {editingId ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Categories list */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-3">Name</th>
              <th className="hidden px-5 py-3 sm:table-cell">Slug</th>
              <th className="hidden px-5 py-3 md:table-cell">Description</th>
              <th className="px-5 py-3 text-center">Posts</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-3 text-sm font-medium text-gray-800">
                    {cat.name}
                  </td>
                  <td className="hidden px-5 py-3 text-sm text-gray-500 sm:table-cell">
                    {cat.slug}
                  </td>
                  <td className="hidden max-w-[200px] truncate px-5 py-3 text-sm text-gray-500 md:table-cell">
                    {cat.description || "—"}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {cat._count.posts}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => startEdit(cat)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat)}
                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-sm text-gray-500"
                >
                  No categories yet. Create one to organise your blog posts.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
