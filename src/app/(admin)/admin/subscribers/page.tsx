import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminSubscribersPage() {
  let subscribers: {
    id: string;
    email: string;
    name: string | null;
    status: string;
    subscribedAt: Date;
  }[] = [];

  try {
    subscribers = await prisma.subscriber.findMany({
      orderBy: { subscribedAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        status: true,
        subscribedAt: true,
      },
    });
  } catch {
    // Database not available
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Subscribers</h1>
        <p className="mt-1 text-sm text-gray-500">
          Newsletter subscriber management
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Subscribed</th>
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
                  <td className="px-5 py-3 text-sm text-gray-500">
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
                      {sub.status.charAt(0) +
                        sub.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">
                    {formatDate(sub.subscribedAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-12 text-center text-sm text-gray-500"
                >
                  No subscribers yet. They will appear here when users subscribe
                  via the newsletter form.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
