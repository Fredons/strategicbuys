"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { mainNavLinks } from "@/lib/constants/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger button */}
      <button
        className="flex flex-col gap-1.5 p-2 lg:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <span className="block h-0.5 w-[22px] rounded-sm bg-gray-800" />
        <span className="block h-0.5 w-[22px] rounded-sm bg-gray-800" />
        <span className="block h-0.5 w-[22px] rounded-sm bg-gray-800" />
      </button>

      {/* Overlay — closes menu on tap */}
      <div
        className={`fixed inset-0 z-[60] bg-black/30 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile menu panel */}
      <nav
        className={`fixed top-0 right-0 z-[70] flex h-dvh w-[280px] flex-col overflow-y-auto bg-white px-6 pt-6 pb-6 shadow-[-8px_0_24px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="mb-6 self-end rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <ul className="flex flex-col">
          {mainNavLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block border-b border-gray-100 py-4 text-base font-medium text-gray-600 transition-colors hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className="gradient-gold mt-6 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white"
          onClick={() => setIsOpen(false)}
        >
          Free Strategy Call
        </Link>
      </nav>
    </>
  );
}
