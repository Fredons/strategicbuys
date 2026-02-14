import Link from "next/link";
import Image from "next/image";
import { Phone, Clock } from "lucide-react";
import { mainNavLinks } from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top info bar — desktop only */}
      <div className="hidden border-b border-gray-100 bg-gray-50 lg:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-end gap-4 px-6 py-1.5 text-xs text-gray-500 lg:px-8">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-1 transition-colors hover:text-gold"
          >
            <Phone className="h-3 w-3" />
            {siteConfig.phone}
          </a>
          <span className="h-3 w-px bg-gray-200" />
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Mon–Sun 9AM–5PM AEST
          </span>
        </div>
      </div>

      {/* Main header */}
      <header className="h-20 border-b border-black/[0.04] bg-white/95 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/PNG.png"
              alt="Strategic Buys - Buyer's Agency"
              width={160}
              height={50}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            <ul className="flex items-center gap-6">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative py-1 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:rounded-sm after:bg-gradient-to-r after:from-gold after:to-purple after:transition-all hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="gradient-gold ml-2 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-[--shadow-gold] transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Free Strategy Call
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </header>
    </div>
  );
}
