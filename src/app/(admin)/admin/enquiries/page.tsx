import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { EnquiryListActions } from "@/components/admin/enquiry-list-actions";

interface Props {
  searchParams: Promise<{ status?: string }>;
}

export default async function AdminEnquiriesPage({ searchParams }: Props) {
  const { status: filterStatus } = await searchParams;

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
      where:
        filterStatus && filterStatus !== "ALL"
          ? { status: filterStatus as "NEW" | "READ" | "REPLIED" | "ARCHIVED" }
          : undefined,
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

  // Get counts for the filter tabs
  let counts = { ALL: 0, NEW: 0, READ: 0, REPLIED: 0, ARCHIVED: 0 };
  try {
    const allEnquiries = await prisma.enquiry.groupBy({
      by: ["status"],
      _count: true,
    });
    let total = 0;
    for (const g of allEnquiries) {
      counts[g.status as keyof typeof counts] = g._count;
      total += g._count;
    }
    counts.ALL = total;
  } catch {
    // Ignore
  }

  const activeFilter = filterStatus || "ALL";

  const tabs = [
    { key: "ALL", label: "All", count: counts.ALL },
    { key: "NEW", label: "New", count: counts.NEW },
    { key: "READ", label: "Read", count: counts.READ },
    { key: "REPLIED", label: "Replied", count: counts.REPLIED },
    { key: "ARCHIVED", label: "Archived", count: counts.ARCHIVED },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage incoming contact form enquiries
        </p>
      </div>

      {/* Status filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={
              tab.key === "ALL"
                ? "/admin/enquiries"
                : `/admin/enquiries?status=${tab.key}`
            }
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              activeFilter === tab.key
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                  activeFilter === tab.key
                    ? "bg-white/20 text-white"
                    : tab.key === "NEW"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-500"
                }`}
              >
                {tab.count}
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3">Name</th>
                <th className="hidden px-5 py-3 sm:table-cell">Email</th>
                <th className="hidden px-5 py-3 md:table-cell">Service</th>
                <th className="px-5 py-3">Status</th>
                <th className="hidden px-5 py-3 sm:table-cell">Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {enquiries.length > 0 ? (
                enquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className={`transition-colors hover:bg-gray-50 ${
                      enquiry.status === "NEW"
                        ? "bg-blue-50/30"
                        : ""
                    }`}
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/enquiries/${enquiry.id}`}
                        className="text-sm font-medium text-gray-800 hover:text-gold"
                      >
                        {enquiry.name}
                      </Link>
                    </td>
                    <td className="hidden px-5 py-3 text-sm text-gray-500 sm:table-cell">
                      {enquiry.email}
                    </td>
                    <td className="hidden px-5 py-3 text-sm text-gray-500 md:table-cell">
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
                    <td className="hidden px-5 py-3 text-sm text-gray-500 sm:table-cell">
                      {formatDate(enquiry.createdAt)}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <EnquiryListActions
                        enquiryId={enquiry.id}
                        enquiryName={enquiry.name}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    {activeFilter === "ALL"
                      ? "No enquiries yet. They will appear here when submitted via the contact form."
                      : `No ${activeFilter.toLowerCase()} enquiries.`}
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
