import Link from "next/link";
import { Download } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { EnquiryListActions } from "@/components/admin/enquiry-list-actions";
import { EnquirySearch } from "@/components/admin/enquiry-search";

interface Props {
  searchParams: Promise<{
    status?: string;
    priority?: string;
    search?: string;
  }>;
}

export default async function AdminEnquiriesPage({ searchParams }: Props) {
  const {
    status: filterStatus,
    priority: filterPriority,
    search: searchQuery,
  } = await searchParams;

  let enquiries: {
    id: string;
    name: string;
    email: string;
    service: string | null;
    status: string;
    priority: string;
    createdAt: Date;
  }[] = [];

  try {
    // Build filter
    const where: Record<string, unknown> = {};

    if (filterStatus && filterStatus !== "ALL") {
      where.status = filterStatus as
        | "NEW"
        | "READ"
        | "REPLIED"
        | "ARCHIVED";
    }

    if (filterPriority && filterPriority !== "ALL") {
      where.priority = filterPriority as "HOT" | "WARM" | "COLD";
    }

    if (searchQuery) {
      where.OR = [
        { name: { contains: searchQuery, mode: "insensitive" } },
        { email: { contains: searchQuery, mode: "insensitive" } },
        { message: { contains: searchQuery, mode: "insensitive" } },
      ];
    }

    enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: [{ priority: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        email: true,
        service: true,
        status: true,
        priority: true,
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

  // Build CSV export URL with current filters
  const csvParams = new URLSearchParams();
  csvParams.set("format", "csv");
  if (filterStatus && filterStatus !== "ALL") csvParams.set("status", filterStatus);
  if (filterPriority && filterPriority !== "ALL") csvParams.set("priority", filterPriority);

  return (
    <>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage incoming contact form enquiries
          </p>
        </div>
        <a
          href={`/api/enquiries?${csvParams.toString()}`}
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-gray-50"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </a>
      </div>

      {/* Status filter tabs */}
      <div className="mb-4 flex flex-wrap gap-2">
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

      {/* Search & Priority filter */}
      <EnquirySearch />

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
                      enquiry.status === "NEW" ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/enquiries/${enquiry.id}`}
                          className="text-sm font-medium text-gray-800 hover:text-gold"
                        >
                          {enquiry.name}
                        </Link>
                        {enquiry.priority === "HOT" && (
                          <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                            HOT
                          </span>
                        )}
                        {enquiry.priority === "WARM" && (
                          <span className="rounded-full bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-600">
                            WARM
                          </span>
                        )}
                      </div>
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
                    {searchQuery
                      ? `No enquiries matching "${searchQuery}".`
                      : activeFilter === "ALL"
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
