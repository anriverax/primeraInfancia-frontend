import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getRoutePermissionsMap, hasAccess } from "@/shared/utils/accessControl";
import { ROUTES } from "./shared/constants";

/**
 * Next.js middleware to protect routes.
 * Flow:
 * 1. Check if the user is authenticated (using JWT)
 * 2. Redirect authenticated users who try to access /auth
 * 3. Redirect unauthenticated users who try to access /admin
 * 4. Validate route-specific permissions for authenticated users
 */
export async function middleware(request: NextRequest): Promise<NextResponse<unknown>> {
  const pathname = request.nextUrl.pathname;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;

  const isAuthPage = pathname.startsWith("/auth");
  const isAdminPage = pathname.startsWith("/admin");

  if (isAuthPage) {
    return NextResponse.next();
  }

  // 0. Root path redirect handled here to avoid double hops with next.config redirects
  /*
  if (pathname === ROUTES.ROOT) {
    const target = isAuthenticated ? ROUTES.DASHBOARD_PARTICIPANTES : ROUTES.AUTH_LOGIN;
    return NextResponse.redirect(new URL(target, request.url));
  }
*/
  // 1. Authenticated user attempting to access /auth → redirect to dashboard
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD_PARTICIPANTES, request.url));
  }

  // 2. Unauthenticated user attempting to access /admin → redirect to login
  if (!isAuthenticated && isAdminPage) {
    return NextResponse.redirect(new URL(ROUTES.AUTH_LOGIN, request.url));
  }

  // 3. Authenticated user in protected route → validate specific permissions
  if (isAuthenticated && isAdminPage) {
    const bearer = token?.accessToken ? `Bearer ${token.accessToken as string}` : undefined;
    const routeMap = await getRoutePermissionsMap({ bearer });

    if (!hasAccess(pathname, token, routeMap)) {
      console.warn(`[middleware] Acceso denegado para ${pathname}`);
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD_PARTICIPANTES, request.url));
    }
  }

  // 4. Allow access
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
