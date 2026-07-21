// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_session_token";
const USER_COOKIE = "session_token";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const adminToken = request.cookies.get(ADMIN_COOKIE)?.value;
  const userToken = request.cookies.get(USER_COOKIE)?.value;

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLoginPage = pathname === "/admin/login";

  // ---- Guard /admin/* ----
  if (isAdminRoute && !isAdminLoginPage) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // ---- Admin logged in, trying to browse customer-facing routes → send back to admin dashboard ----
  if (!isAdminRoute && adminToken) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // ---- Customer logged in, trying to reach /admin/* → send to admin login ----
  if (isAdminRoute && !isAdminLoginPage && userToken && !adminToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match everything except:
     * - api routes (handled by requireAdmin/requireUser directly)
     * - static files, images, favicon
     */
    "/((?!api|_next/static|_next/image|favicon.ico|uploads).*)",
  ],
};