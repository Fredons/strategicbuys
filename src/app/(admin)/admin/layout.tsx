import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { SessionProvider } from "@/providers/session-provider";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="min-h-screen pt-14 lg:ml-[260px] lg:pt-0">
          <div className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
}
