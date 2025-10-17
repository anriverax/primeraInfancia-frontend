import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getRoutePermissionsMap, hasAccess } from "@/shared/utils/accessControl";
/*
const roleAccessMap: Record<string, string[]> = {
  "/admin/grupos": ["VIEW_GROUPS"]
};
*/
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest): Promise<NextResponse<unknown>> {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const pathname = request.nextUrl.pathname;
  // Rely on getToken only (supports both dev and __Secure cookies)
  const isAuthenticated = !!token;
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

  const routeMap = await getRoutePermissionsMap();
  if (!hasAccess(pathname, token, routeMap)) {
    return NextResponse.redirect(new URL("/admin/dashboard/participantes", request.url));
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
