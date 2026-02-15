"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, Trash2, Archive } from "lucide-react";

interface EnquiryListActionsProps {
  enquiryId: string;
  enquiryName: string;
}

export function EnquiryListActions({
  enquiryId,
  enquiryName,
}: EnquiryListActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleArchive() {
    setLoading(true);
    try {
      await fetch(`/api/enquiries/${enquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ARCHIVED" }),
      });
      router.refresh();
    } catch {
      alert("Failed to archive enquiry.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (
      !window.confirm(
        `Delete enquiry from "${enquiryName}"? This cannot be undone.`
      )
    )
      return;

    setLoading(true);
    try {
      const res = await fetch(`/api/enquiries/${enquiryId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete enquiry.");
      }
    } catch {
      alert("Failed to delete enquiry.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/admin/enquiries/${enquiryId}`}
        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        title="View details"
      >
        <Eye className="h-4 w-4" />
      </Link>
      <button
        onClick={handleArchive}
        disabled={loading}
        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-yellow-50 hover:text-yellow-600 disabled:opacity-50"
        title="Archive"
      >
        <Archive className="h-4 w-4" />
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
