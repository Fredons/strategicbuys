"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  FolderOpen,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { siteConfig } from "@/lib/constants/site";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/categories", label: "Categories", icon: FolderOpen },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebar = (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
        <Link
          href="/admin"
          className="font-heading text-lg font-bold text-gray-900"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
        </Link>
        <button
          onClick={() => setOpen(false)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gold/10 text-gold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-100 p-3 space-y-1">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header bar */}
      <div className="fixed left-0 right-0 top-0 z-40 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-heading text-sm font-bold text-gray-900">
          {siteConfig.name} Admin
        </span>
        <Link
          href="/"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — desktop: always visible, mobile: slide-in */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:z-30 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>
    </>
  );
}
