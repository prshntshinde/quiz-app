import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/admin/dashboard", "/admin/quiz", "/admin/questions"];
const publicAdminPaths = ["/admin", "/api/auth"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isPublicAdminPath = publicAdminPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath) {
    const session = request.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (isPublicAdminPath && pathname === "/admin") {
    const session = request.cookies.get("admin_session");
    if (session?.value === "authenticated") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};