import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isAdminApi =
    req.nextUrl.pathname.startsWith("/api/blog") ||
    req.nextUrl.pathname.startsWith("/api/enquiries") ||
    req.nextUrl.pathname.startsWith("/api/settings") ||
    req.nextUrl.pathname.startsWith("/api/upload");

  if ((isAdminRoute || isAdminApi) && !isLoggedIn) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/blog/:path*", "/api/enquiries/:path*", "/api/settings/:path*", "/api/upload/:path*"],
};
