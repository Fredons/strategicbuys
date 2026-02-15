"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, UserX, UserCheck, Download } from "lucide-react";

interface SubscriberActionsProps {
  subscriberId: string;
  email: string;
  currentStatus: string;
}

export function SubscriberActions({
  subscriberId,
  email,
  currentStatus,
}: SubscriberActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    const newStatus =
      currentStatus === "ACTIVE" ? "UNSUBSCRIBED" : "ACTIVE";
    setLoading(true);
    try {
      await fetch("/api/subscribers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: subscriberId, status: newStatus }),
      });
      router.refresh();
    } catch {
      alert("Failed to update subscriber.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Remove ${email} from the subscriber list?`)) return;
    setLoading(true);
    try {
      await fetch("/api/subscribers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: subscriberId }),
      });
      router.refresh();
    } catch {
      alert("Failed to delete subscriber.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`rounded-lg p-2 transition-colors disabled:opacity-50 ${
          currentStatus === "ACTIVE"
            ? "text-gray-400 hover:bg-yellow-50 hover:text-yellow-600"
            : "text-gray-400 hover:bg-green-50 hover:text-green-600"
        }`}
        title={
          currentStatus === "ACTIVE" ? "Unsubscribe" : "Reactivate"
        }
      >
        {currentStatus === "ACTIVE" ? (
          <UserX className="h-4 w-4" />
        ) : (
          <UserCheck className="h-4 w-4" />
        )}
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
        title="Delete subscriber"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ExportButton() {
  function handleExport() {
    window.open("/api/subscribers?format=csv", "_blank");
  }

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 shadow-sm transition-colors hover:border-gray-300 hover:text-gray-800"
    >
      <Download className="h-4 w-4" />
      Export CSV
    </button>
  );
}
