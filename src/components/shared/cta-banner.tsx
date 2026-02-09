import Link from "next/link";

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
    <section className="px-6 py-16 lg:px-8 lg:py-20">
      <div className="gradient-cta relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl px-8 py-14 text-center lg:px-12 lg:py-16">
        {/* Decorative orb */}
        <div className="pointer-events-none absolute -top-[40%] -right-[15%] h-[350px] w-[350px] rounded-full bg-gold/[0.06]" />

        <h2 className="relative font-heading text-2xl font-bold text-white md:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="relative mx-auto mt-3 mb-6 max-w-[480px] text-base text-white/80">
          {subtitle}
        </p>
        <Link
          href={buttonHref}
          className="relative inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 text-sm font-bold text-purple-dark transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}
