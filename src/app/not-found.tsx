import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-gold">404</p>
        <h1 className="mt-4 font-heading text-2xl font-bold text-gray-900">
          Page Not Found
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="gradient-gold mt-6 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
