import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import {
  SubscriberActions,
  ExportButton,
} from "@/components/admin/subscriber-actions";

export default async function AdminSubscribersPage() {
  let subscribers: {
    id: string;
    email: string;
    name: string | null;
    status: string;
    subscribedAt: Date;
    unsubscribedAt: Date | null;
  }[] = [];

  try {
    subscribers = await prisma.subscriber.findMany({
      orderBy: { subscribedAt: "desc" },
    });
  } catch {
    // Database not available
  }

  const activeCount = subscribers.filter((s) => s.status === "ACTIVE").length;
  const unsubCount = subscribers.filter(
    (s) => s.status === "UNSUBSCRIBED"
  ).length;

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>
          <p className="mt-1 text-sm text-gray-500">
            {subscribers.length} total — {activeCount} active
            {unsubCount > 0 && `, ${unsubCount} unsubscribed`}
          </p>
        </div>
        {subscribers.length > 0 && <ExportButton />}
      </div>

      {/* Summary pills */}
      {subscribers.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {activeCount} Active
          </span>
          {unsubCount > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-100">
              <span className="h-2 w-2 rounded-full bg-gray-400" />
              {unsubCount} Unsubscribed
            </span>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3">Email</th>
                <th className="hidden px-5 py-3 sm:table-cell">Name</th>
                <th className="px-5 py-3">Status</th>
                <th className="hidden px-5 py-3 md:table-cell">Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {subscribers.length > 0 ? (
                subscribers.map((sub) => (
                  <tr
                    key={sub.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="px-5 py-3 text-sm font-medium text-gray-800">
                      {sub.email}
                    </td>
                    <td className="hidden px-5 py-3 text-sm text-gray-500 sm:table-cell">
                      {sub.name || "—"}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          sub.status === "ACTIVE"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {sub.status === "ACTIVE" ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                    <td className="hidden px-5 py-3 text-sm text-gray-500 md:table-cell">
                      {formatDate(sub.subscribedAt)}
                    </td>
                    <td className="px-5 py-3">
                      <SubscriberActions
                        subscriberId={sub.id}
                        email={sub.email}
                        currentStatus={sub.status}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No subscribers yet. They will appear here when users
                    subscribe via the newsletter form.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
