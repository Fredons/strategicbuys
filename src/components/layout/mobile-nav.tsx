"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { mainNavLinks } from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        className="flex flex-col gap-1.5 p-2 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span
          className={`block h-0.5 w-[22px] rounded-sm bg-gray-800 transition-all ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-[22px] rounded-sm bg-gray-800 transition-all ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-[22px] rounded-sm bg-gray-800 transition-all ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Mobile menu panel */}
      <nav
        className={`fixed top-0 right-0 z-50 flex h-dvh w-[280px] flex-col overflow-y-auto bg-white px-6 pt-24 pb-6 shadow-[-8px_0_24px_rgba(0,0,0,0.08)] transition-all lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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
        <a
          href={siteConfig.phoneHref}
          className="mt-3 inline-flex items-center justify-center gap-2 text-sm text-gray-500 transition-colors hover:text-gold"
          onClick={() => setIsOpen(false)}
        >
          <Phone className="h-4 w-4" />
          {siteConfig.phone}
        </a>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
