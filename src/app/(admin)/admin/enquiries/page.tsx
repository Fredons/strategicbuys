import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminEnquiriesPage() {
  let enquiries: {
    id: string;
    name: string;
    email: string;
    service: string | null;
    status: string;
    createdAt: Date;
  }[] = [];

  try {
    enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        service: true,
        status: true,
        createdAt: true,
      },
    });
  } catch {
    // Database not available
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage incoming contact form enquiries
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Service</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {enquiries.length > 0 ? (
              enquiries.map((enquiry) => (
                <tr
                  key={enquiry.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-3">
                    <Link
                      href={`/admin/enquiries/${enquiry.id}`}
                      className="text-sm font-medium text-gray-800 hover:text-gold"
                    >
                      {enquiry.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">
                    {enquiry.email}
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">
                    {enquiry.service || "—"}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        enquiry.status === "NEW"
                          ? "bg-blue-50 text-blue-700"
                          : enquiry.status === "READ"
                          ? "bg-yellow-50 text-yellow-700"
                          : enquiry.status === "REPLIED"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {enquiry.status.charAt(0) +
                        enquiry.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">
                    {formatDate(enquiry.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-sm text-gray-500"
                >
                  No enquiries yet. They will appear here when submitted via the
                  contact form.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
