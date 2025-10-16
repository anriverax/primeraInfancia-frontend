import { JWT } from "next-auth/jwt";

// Fallback local por si el backend no responde
export const staticRoutePermissionsMap: Record<string, string[]> = {
  "/admin/grupos": ["VIEW_GROUPS"]
};

type RoutePerms = Record<string, string[]>;

declare global {
  // eslint-disable-next-line no-var
  var __routePermCache: { at: number; data: RoutePerms } | undefined;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

export async function getRoutePermissionsMap(): Promise<RoutePerms> {
  // Cache en memoria para evitar fetch en cada request
  const now = Date.now();
  if (globalThis.__routePermCache && now - globalThis.__routePermCache.at < CACHE_TTL_MS) {
    return globalThis.__routePermCache.data;
  }

  try {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND}/auth/route-permissions`;
    const res = await fetch(endpoint, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as { data?: RoutePerms } | RoutePerms;
    const data = (json as any).data ?? json;
    if (!data || typeof data !== "object") throw new Error("Invalid permissions payload");
    globalThis.__routePermCache = { at: now, data };
    return data;
  } catch {
    // Fallback al estático para no romper navegación
    globalThis.__routePermCache = { at: now, data: staticRoutePermissionsMap };
    return staticRoutePermissionsMap;
  }
}

export function hasAccess(pathname: string, token: JWT | null, map?: RoutePerms): boolean {
  const routeMap = map ?? staticRoutePermissionsMap;
  for (const route in routeMap) {
    if (pathname.startsWith(route)) {
      const allowed = routeMap[route];
      return (
        !!token &&
        Array.isArray((token as any).permissions) &&
        (token as any).permissions.some((p: string) => allowed.includes(p))
      );
    }
  }
  return true;
}
