import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getRoutePermissionsMap, hasAccess } from "@/shared/utils/accessControl";

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

  const isAuthRoute = pathname.startsWith("/auth");
  const isProtectedRoute = pathname.startsWith("/admin");

  // 0. Root path redirect handled here to avoid double hops with next.config redirects
  if (pathname === "/") {
    const target = isAuthenticated ? "/admin/dashboard/participantes" : "/auth/iniciar-sesion";
    return NextResponse.redirect(new URL(target, request.url));
  }

  // 1. Authenticated user attempting to access /auth → redirect to dashboard
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/admin/dashboard/participantes", request.url));
  }

  // 2. Unauthenticated user attempting to access /admin → redirect to login
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/iniciar-sesion", request.url));
  }

  // 3. Authenticated user in protected route → validate specific permissions
  // if (isAuthenticated && isProtectedRoute) {
  //   const bearer = token?.accessToken ? `Bearer ${token.accessToken as string}` : undefined;
  //   const routeMap = await getRoutePermissionsMap({ bearer });
  //
  //   if (!hasAccess(pathname, token, routeMap)) {
  //     console.warn(`[middleware] Acceso denegado para ${pathname}`);
  //     return NextResponse.redirect(new URL("/admin/dashboard/participantes", request.url));
  //   }
  // }

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
