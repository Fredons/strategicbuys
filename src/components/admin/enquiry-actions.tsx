"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface EnquiryActionsProps {
  enquiryId: string;
  currentStatus: string;
  currentPriority: string;
  currentNotes: string | null;
}

export function EnquiryActions({
  enquiryId,
  currentStatus,
  currentPriority,
  currentNotes,
}: EnquiryActionsProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [priority, setPriority] = useState(currentPriority);
  const [notes, setNotes] = useState(currentNotes || "");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch(`/api/enquiries/${enquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, priority, notes }),
      });

      if (!res.ok) throw new Error("Failed to update");

      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-bold text-gray-900">Actions</h2>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Update Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-gold focus:outline-none"
            >
              <option value="NEW">New</option>
              <option value="READ">Read</option>
              <option value="REPLIED">Replied</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Lead Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-gold focus:outline-none"
            >
              <option value="HOT">🔴 Hot</option>
              <option value="WARM">🟡 Warm</option>
              <option value="COLD">⚪ Cold</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Admin Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full resize-y rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-gold focus:outline-none"
            placeholder="Add internal notes about this enquiry..."
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="gradient-gold inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : saved ? (
            "Saved!"
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  );
}
