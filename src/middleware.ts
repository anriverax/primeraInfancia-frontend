import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const roleAccessMap: Record<string, string[]> = {
  "/admin/grupos": ["VIEW_GROUPS"]
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest): Promise<NextResponse<unknown>> {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const pathname = request.nextUrl.pathname;

  const isAuthenticated = request.cookies.get("next-auth.session-token");
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/admin");

  // If you are authenticated and try to go to /auth, redirect to dashboard
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/admin/dashboard/participantes", request.url));
  }

  // If you are not authenticated and try to go to a protected route
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/iniciar-sesion", request.url));
  }

  for (const route in roleAccessMap) {
    if (pathname.startsWith(route)) {
      const allowedRoles = roleAccessMap[route];

      if (
        !token ||
        !Array.isArray(token.permissions) ||
        !token.permissions.some((role) => allowedRoles.includes(role))
      ) {
        return NextResponse.redirect(new URL("/admin/dashboard/participantes", request.url));
      }
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
