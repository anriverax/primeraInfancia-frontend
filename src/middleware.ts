import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest): NextResponse<unknown> {
  const isAuth = request.cookies.get("isAuth");
  const hasToken = request.cookies.get("next-auth.csrf-token");
  const hasSessionToken = request.cookies.get("next-auth.session-token");

  if (isAuth && hasToken && hasSessionToken) {
    if (request.nextUrl.pathname.includes("/auth"))
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  } else {
    request.cookies.delete("isAuth");
    request.cookies.delete("next-auth.csrf-token");
    request.cookies.delete("next-auth.session-token");

    if (request.nextUrl.pathname.includes("/admin"))
      return NextResponse.redirect(new URL("/auth/iniciar-sesion", request.url));
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
  matcher: ["/auth/", "/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
