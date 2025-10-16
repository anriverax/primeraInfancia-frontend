import { cookies, headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/service/nextAuth";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { getRoutePermissionsMap, hasAccess } from "./accessControl";

/**
 * Obtiene la sesión en el servidor y valida permisos para una ruta dada.
 * Lanza o devuelve un objeto con flags para decidir redirecciones en la page.
 */
export async function requireAuthSSR(pathname: string): Promise<{
  isAuthenticated: boolean;
  hasPermission: boolean;
  session: Awaited<ReturnType<typeof getServerSession>>;
}> {
  const session = await getServerSession(authOptions);
  const req = { headers: Object.fromEntries((await headers()).entries()) } as unknown as NextRequest;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const routeMap = await getRoutePermissionsMap();
  const ok = hasAccess(pathname, token, routeMap);

  return {
    isAuthenticated: !!session,
    hasPermission: ok,
    session
  };
}

/**
 * Helper SSR para fetch protegido. Inyecta Authorization si hay sesión.
 */
export async function ssrFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const session = await getServerSession(authOptions);
  const headersInit = new Headers(init?.headers);
  if (session?.accessToken) headersInit.set("Authorization", `Bearer ${session.accessToken}`);
  return fetch(input, { ...init, headers: headersInit });
}
