import { JWT } from "next-auth/jwt";

/**
 * Types aligned with the Prisma backend model:
 * - MenuItem.path → app path
 * - Permission.name → permission name (e.g., “VIEW_GROUPS”)
 */

/** Route map → required permissions. E.g.: { “/admin/groups”: [“VIEW_GROUPS”] } */
export type RoutePermissionsMap = Record<string, string[]>;

/** Response from the /auth/route-permissions endpoint */
interface RoutePermissionsResponse {
  data?: RoutePermissionsMap;
}

/** Global cache in memory (per instance/edge worker) */
declare global {
  var routePermCache: { at: number; data: RoutePermissionsMap } | undefined;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

/**
 * Static fallback. Used if the backend does not respond.
 * Add all protected routes here with their minimum permissions.
 * IMPORTANT: This map must be kept synchronized with the backend.
 */
export const staticRoutePermissionsMap: RoutePermissionsMap = {
  "/admin/grupos": ["VIEW_GROUPS"],
  "/admin/dashboard": [], // Requires authentication but no specific permissions
  "/admin/asistencia": ["VIEW_ATTENDANCE"],
  "/admin/mentoria": ["VIEW_MENTORING"],
  "/admin/catalogo": ["VIEW_CATALOGUE"]
};

/**
 * Gets the route map → permissions from the backend.
 * Implements memory cache with a 5-minute TTL.
 * In case of error, uses the static fallback.
 *
 * @returns Map of protected routes and their required permissions
 */
export async function getRoutePermissionsMap(opts?: { bearer?: string }): Promise<RoutePermissionsMap> {
  const now = Date.now();

  // Return from cache if still valid
  if (globalThis.routePermCache && now - globalThis.routePermCache.at < CACHE_TTL_MS) {
    return globalThis.routePermCache.data;
  }

  try {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/route-permissions`;
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(opts?.bearer ? { Authorization: opts.bearer } : {})
      },
      // Prevent browser HTTP caching; we want manual control
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`Backend respondió con HTTP ${res.status}`);
    }

    const json = (await res.json()) as RoutePermissionsResponse;
    const data = json.data ?? (json as unknown as RoutePermissionsMap);

    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error("Respuesta de permisos inválida del backend");
    }

    // Cache successful result
    globalThis.routePermCache = { at: now, data };
    return data;
  } /* eslint-disable @typescript-eslint/no-unused-vars */ catch (error) {
    // Fallback to static map
    globalThis.routePermCache = { at: now, data: staticRoutePermissionsMap };
    return staticRoutePermissionsMap;
  } /* eslint-enable @typescript-eslint/no-unused-vars */
}

/**
 * Checks if a user has access to a specific path.
 * Policy: DEFAULT DENY for paths under /admin/* not listed in the map.
 *
 * @param pathname - Path to verify (e.g., “/admin/groups”)
 * @param token - JWT token of the user with permissions
 * @param map - Map of optional paths (use staticRoutePermissionsMap by default)
 * @returns true if the user has access, false otherwise
 */
export function hasAccess(pathname: string, token: JWT | null, map?: RoutePermissionsMap): boolean {
  const routeMap = map ?? staticRoutePermissionsMap;

  // Find most specific match (longest route that matches)
  let matchedRoute: string | null = null;
  let requiredPermissions: string[] = [];

  for (const route in routeMap) {
    if (pathname.startsWith(route)) {
      // Prefer more specific (longer) routes
      if (!matchedRoute || route.length > matchedRoute.length) {
        matchedRoute = route;
        requiredPermissions = routeMap[route];
      }
    }
  }

  // If there is no match and we are under /admin/*, apply DEFAULT DENY
  if (!matchedRoute) {
    if (pathname.startsWith("/admin/")) {
      return false;
    }
    // Routes outside of /admin/* are public (or protected by other means)
    return true;
  }

  // No token → access denied
  if (!token) {
    return false;
  }

  // Validate user permissions
  const userPermissions = token.permissions;
  if (!Array.isArray(userPermissions)) {
    return false;
  }

  // If the route does not require specific permissions (empty array), only authentication is needed
  if (requiredPermissions.length === 0) {
    return true;
  }

  // Check that the user has at least one of the required permissions
  const hasPermission = requiredPermissions.some((perm) => userPermissions.includes(perm));

  return hasPermission;
}
