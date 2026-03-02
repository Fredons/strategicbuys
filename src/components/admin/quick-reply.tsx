"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { replyTemplates } from "@/lib/constants/reply-templates";

interface QuickReplyProps {
  enquiryId: string;
  enquiryName: string;
}

export function QuickReply({ enquiryId, enquiryName }: QuickReplyProps) {
  const router = useRouter();
  const firstName = enquiryName.split(" ")[0];

  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleTemplateChange(templateId: string) {
    setSelectedTemplate(templateId);
    setError("");
    setSent(false);

    if (!templateId) {
      setSubject("");
      setBody("");
      return;
    }

    const template = replyTemplates.find((t) => t.id === templateId);
    if (template) {
      setSubject(template.subject);
      setBody(template.body.replace(/\{\{name\}\}/g, firstName));
    }
  }

  async function handleSend() {
    if (!subject.trim() || !body.trim()) {
      setError("Subject and body are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/enquiries/${enquiryId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, body }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }

      setSent(true);
      router.refresh();
      setTimeout(() => {
        setSent(false);
        setSelectedTemplate("");
        setSubject("");
        setBody("");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send reply");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-sm font-bold text-gray-900">Quick Reply</h2>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Template
          </label>
          <select
            value={selectedTemplate}
            onChange={(e) => handleTemplateChange(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-gold focus:outline-none"
          >
            <option value="">Select a template...</option>
            {replyTemplates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-gold focus:outline-none"
            placeholder="Email subject..."
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
            Message
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="w-full resize-y rounded-lg border-[1.5px] border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:border-gold focus:outline-none"
            placeholder="Type your reply or select a template above..."
          />
        </div>

        <button
          onClick={handleSend}
          disabled={loading || !subject.trim() || !body.trim()}
          className="gradient-gold inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : sent ? (
            "Sent!"
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Reply
            </>
          )}
        </button>
      </div>
    </div>
  );
}
