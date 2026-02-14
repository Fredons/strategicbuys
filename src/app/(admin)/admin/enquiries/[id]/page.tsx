import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar, Tag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { EnquiryActions } from "@/components/admin/enquiry-actions";

interface EnquiryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEnquiryDetailPage({
  params,
}: EnquiryDetailPageProps) {
  const { id } = await params;

  let enquiry = null;
  try {
    enquiry = await prisma.enquiry.findUnique({ where: { id } });
  } catch {
    notFound();
  }

  if (!enquiry) notFound();

  // Auto-mark as READ if NEW
  if (enquiry.status === "NEW") {
    try {
      await prisma.enquiry.update({
        where: { id },
        data: { status: "READ" },
      });
      enquiry.status = "READ";
    } catch {
      // Ignore
    }
  }

  return (
    <>
      <div className="mb-8">
        <Link
          href="/admin/enquiries"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Enquiries
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Enquiry from {enquiry.name}
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-gray-900">Message</h2>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
              {enquiry.message}
            </p>
          </div>

          <EnquiryActions
            enquiryId={enquiry.id}
            currentStatus={enquiry.status}
            currentNotes={enquiry.notes}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-bold text-gray-900">Details</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800">{enquiry.email}</p>
                  <p className="text-xs text-gray-500">Email</p>
                </div>
              </div>
              {enquiry.phone && (
                <div className="flex items-start gap-3 text-sm">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800">{enquiry.phone}</p>
                    <p className="text-xs text-gray-500">Phone</p>
                  </div>
                </div>
              )}
              {enquiry.service && (
                <div className="flex items-start gap-3 text-sm">
                  <Tag className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {enquiry.service}
                    </p>
                    <p className="text-xs text-gray-500">Service</p>
                  </div>
                </div>
              )}
              {enquiry.budget && (
                <div className="flex items-start gap-3 text-sm">
                  <Tag className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {enquiry.budget}
                    </p>
                    <p className="text-xs text-gray-500">Budget</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3 text-sm">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-800">
                    {formatDate(enquiry.createdAt)}
                  </p>
                  <p className="text-xs text-gray-500">Submitted</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-2 text-sm font-bold text-gray-900">Status</h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
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
          </div>
        </div>
      </div>
    </>
  );
}
