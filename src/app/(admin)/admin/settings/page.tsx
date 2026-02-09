import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  let settings = null;

  try {
    settings = await prisma.siteSettings.findFirst();
  } catch {
    // Database not available
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your website configuration
        </p>
      </div>

      <div className="max-w-[800px]">
        <SettingsForm settings={settings} />
      </div>
    </>
  );
}
