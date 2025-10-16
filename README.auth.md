# Autenticación (NextAuth.js)

Este proyecto usa NextAuth con estrategia JWT y middleware para proteger rutas.

## Variables de entorno

Copia `.env.example` a `.env.local` y ajusta:

- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=valor-seguro
- NEXT_PUBLIC_URL=http://localhost:3000
- NEXT_PUBLIC_BACKEND=http://localhost:3001

## Flujo

- /app/api/auth/[...nextauth]/route.ts: usa `authOptions` con provider Credentials.
- session/jwt callbacks: exponen `accessToken`, `refreshToken`, `user`, `permissions`.
- Middleware (`src/middleware.ts`):
  - Si hay token y estás en /auth/\* -> redirige a /admin/dashboard/participantes.
  - Si no hay token y vas a /admin/\* -> redirige a /auth/iniciar-sesion.
  - Valida permisos con `hasAccess` (`src/shared/utils/accessControl.ts`).

## Refresh de tokens

`src/shared/hooks/useAxios.ts`:

- Añade Authorization en requests privadas.
- En 401, llama a `/auth/refresh-token`, actualiza la sesión (`update`) y reintenta.
- Evita intentar refresh en endpoints de auth (login/logout/refresh/change-password).

## Protección en cliente

`src/app/withProtectedRoute.tsx` usa `useSession({ required: true })` y redirige al login en `onUnauthenticated`.

## Permisos por ruta

Permisos dinámicos desde backend:

- `src/shared/utils/accessControl.ts` expone `getRoutePermissionsMap()` que hace fetch a `${NEXT_PUBLIC_BACKEND}/auth/route-permissions` con caché de 5m.
- Fallback a un mapa estático si el backend no responde.
- `middleware.ts` usa `hasAccess(pathname, token, routeMap)`.

Ejemplo de respuesta del backend:

```json
{
  "data": {
    "/admin/grupos": ["VIEW_GROUPS"],
    "/admin/catalogo": ["VIEW_CATALOGUE"]
  }
}
```

## Tips

- En producción, usa HTTPS y configura `NEXTAUTH_URL` correctamente.
- Evita cookies personalizadas para indicar autenticación; usa `getToken` en el middleware.

## Guard SSR y fetch de datos protegido

- `src/shared/utils/ssrAuth.ts`:
  - `requireAuthSSR(pathname)`: obtiene la sesión en servidor y valida permisos contra el mapa dinámico.
  - `ssrFetch(input, init)`: añade Authorization desde la sesión del servidor.

Uso en una page/route handler:

```ts
import { requireAuthSSR, ssrFetch } from "@/shared/utils/ssrAuth";

export default async function Page() {
  const { isAuthenticated, hasPermission } = await requireAuthSSR("/admin/grupos");
  if (!isAuthenticated) redirect("/auth/iniciar-sesion");
  if (!hasPermission) redirect("/admin/dashboard/participantes");

  const res = await ssrFetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/protegido`);
  const data = await res.json();
  return <div>{JSON.stringify(data)}</div>;
}
```
