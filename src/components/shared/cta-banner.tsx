import Link from "next/link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/constants/site";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CTABanner({
  title = "Ready to Buy Smarter?",
  subtitle = "Book a free, no-obligation strategy call with our team and discover how we can help you secure your ideal property.",
  buttonText = "Book Your Free Call",
  buttonHref = "/contact",
}: CTABannerProps) {
  return (
    <section className="gradient-hero relative overflow-hidden py-16 lg:py-20">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -top-1/2 right-0 h-[600px] w-[600px] rounded-full bg-gold/[0.04]" />
      <div className="pointer-events-none absolute -bottom-1/3 -left-[10%] h-[400px] w-[400px] rounded-full bg-purple-light/[0.03]" />

      <div className="relative mx-auto max-w-[700px] px-6 text-center lg:px-8">
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        <p className="mx-auto mt-4 mb-8 max-w-[500px] text-base leading-relaxed text-white/80">
          {subtitle}
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={buttonHref}
            className="gradient-gold inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-bold text-white shadow-[--shadow-gold] transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            {buttonText}
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-gold-light"
          >
            <Phone className="h-4 w-4" />
            or call {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
