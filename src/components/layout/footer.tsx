import Link from "next/link";
import Image from "next/image";
import {
  footerQuickLinks,
  footerServiceLinks,
  footerLegalLinks,
} from "@/lib/constants/navigation";
import { siteConfig } from "@/lib/constants/site";
import { Mail, Phone, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 pt-16 text-gray-400 lg:pt-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        {/* Grid */}
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] lg:gap-8 lg:pb-16">
          {/* Brand */}
          <div>
            <Image
              src="/images/PNG.png"
              alt="Strategic Buys"
              width={140}
              height={44}
              className="mb-3 h-12 w-auto brightness-125"
            />
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Strategic Buys is a licensed, independent buyer&apos;s agency
              helping Australians purchase high-growth residential and commercial
              properties. We work exclusively for buyers &mdash; never sellers.
            </p>
            {/* Social */}
            <div className="mt-4 flex gap-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-gray-500 transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-gray-500 transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] text-gray-500 transition-all hover:-translate-y-0.5 hover:bg-gold hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="space-y-1">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-all hover:pl-1 hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Services
            </h4>
            <ul className="space-y-1">
              {footerServiceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-all hover:pl-1 hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{siteConfig.phone}</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-500">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{siteConfig.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 py-5 text-xs text-gray-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Strategic Buys. All rights
            reserved. ABN: {siteConfig.abn}
          </p>
          <div className="flex gap-4">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-500 transition-colors hover:text-gold-light"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
