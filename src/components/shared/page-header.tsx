import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
}

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="gradient-page-header relative overflow-hidden pt-28 pb-12 text-center lg:pt-36 lg:pb-16">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -top-1/4 -right-[8%] h-[400px] w-[400px] rounded-full bg-gold/[0.05]" />
      <div className="pointer-events-none absolute -bottom-1/3 -left-[10%] h-[300px] w-[300px] rounded-full bg-gold/[0.03]" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            className="mb-6 flex items-center justify-center gap-1.5 text-sm text-white/50"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="text-gold-light transition-colors hover:text-gold-lighter">
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5" />
                {crumb.href ? (
                  <Link href={crumb.href} className="text-gold-light transition-colors hover:text-gold-lighter">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-[580px] text-base leading-relaxed text-white/70 lg:text-lg">
            {subtitle}
          </p>
        )}

        {/* Gold rule */}
        <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>
    </section>
  );
}
