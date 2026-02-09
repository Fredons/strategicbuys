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
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-purple-dark pt-32 pb-12 text-center lg:pt-36 lg:pb-16">
      {/* Decorative orb */}
      <div className="pointer-events-none absolute -top-1/4 -right-[8%] h-[400px] w-[400px] rounded-full bg-gold/[0.04]" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            className="mb-5 flex items-center justify-center gap-1.5 text-xs text-white/40"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="text-gold-light transition-colors hover:text-gold-lighter">
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                {crumb.href ? (
                  <Link href={crumb.href} className="text-gold-light transition-colors hover:text-gold-lighter">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-[560px] text-base text-white/65 lg:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
