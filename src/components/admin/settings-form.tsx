"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";

interface SettingsFormProps {
  settings: {
    id: string;
    siteName: string;
    contactEmail: string | null;
    contactPhone: string | null;
    address: string | null;
    facebookUrl: string | null;
    instagramUrl: string | null;
    linkedinUrl: string | null;
    defaultMetaTitle: string | null;
    defaultMetaDescription: string | null;
    notificationEmails: string | null;
  } | null;
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [siteName, setSiteName] = useState(settings?.siteName || "");
  const [contactEmail, setContactEmail] = useState(
    settings?.contactEmail || ""
  );
  const [contactPhone, setContactPhone] = useState(
    settings?.contactPhone || ""
  );
  const [address, setAddress] = useState(settings?.address || "");
  const [notificationEmails, setNotificationEmails] = useState(
    settings?.notificationEmails || ""
  );
  const [facebookUrl, setFacebookUrl] = useState(settings?.facebookUrl || "");
  const [instagramUrl, setInstagramUrl] = useState(
    settings?.instagramUrl || ""
  );
  const [linkedinUrl, setLinkedinUrl] = useState(settings?.linkedinUrl || "");
  const [defaultMetaTitle, setDefaultMetaTitle] = useState(
    settings?.defaultMetaTitle || ""
  );
  const [defaultMetaDescription, setDefaultMetaDescription] = useState(
    settings?.defaultMetaDescription || ""
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          siteName,
          contactEmail,
          contactPhone,
          address: address || null,
          notificationEmails: notificationEmails || null,
          facebookUrl: facebookUrl || null,
          instagramUrl: instagramUrl || null,
          linkedinUrl: linkedinUrl || null,
          defaultMetaTitle: defaultMetaTitle || null,
          defaultMetaDescription: defaultMetaDescription || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save settings. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* General */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-bold text-gray-900">General</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Site Name
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-gold focus:outline-none"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
                Contact Phone
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-gold focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-gold focus:outline-none"
              placeholder="123 Street, City, State, Postcode"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-bold text-gray-900">
          Enquiry Notifications
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Notification Emails
            </label>
            <textarea
              value={notificationEmails}
              onChange={(e) => setNotificationEmails(e.target.value)}
              rows={3}
              className="w-full resize-y rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-gold focus:outline-none"
              placeholder={"support@strategicbuys.com.au\nstratinvest.go@gmail.com"}
            />
            <p className="mt-1.5 text-xs text-gray-500">
              One email per line. All listed emails will receive enquiry
              notifications from the contact form.
            </p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-bold text-gray-900">Social Media</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Facebook URL
            </label>
            <input
              type="url"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-gold focus:outline-none"
              placeholder="https://facebook.com/strategicbuys"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Instagram URL
            </label>
            <input
              type="url"
              value={instagramUrl}
              onChange={(e) => setInstagramUrl(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-gold focus:outline-none"
              placeholder="https://instagram.com/strategicbuys"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-gold focus:outline-none"
              placeholder="https://linkedin.com/company/strategicbuys"
            />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-bold text-gray-900">
          Default SEO Settings
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Default Meta Title
            </label>
            <input
              type="text"
              value={defaultMetaTitle}
              onChange={(e) => setDefaultMetaTitle(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-gold focus:outline-none"
              placeholder="Strategic Buys | Licensed Buyer's Agents Australia"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-700">
              Default Meta Description
            </label>
            <textarea
              value={defaultMetaDescription}
              onChange={(e) => setDefaultMetaDescription(e.target.value)}
              rows={3}
              className="w-full resize-y rounded-lg border-[1.5px] border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 focus:border-gold focus:outline-none"
              placeholder="Strategic Buys is a licensed buyer's agent..."
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="gradient-gold inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : saved ? (
          "Saved!"
        ) : (
          <>
            <Save className="h-4 w-4" />
            Save Settings
          </>
        )}
      </button>
    </form>
  );
}
