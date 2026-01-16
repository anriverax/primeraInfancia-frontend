# Mantenimiento y Troubleshooting - Primera Infancia Frontend

## Índice

1. [Problemas Comunes](#problemas-comunes)
2. [Mantenimiento Regular](#mantenimiento-regular)
3. [Monitoreo](#monitoreo)
4. [Actualizaciones de Dependencias](#actualizaciones-de-dependencias)
5. [Performance Optimization](#performance-optimization)

---

## Problemas Comunes

### 1. Error: "Failed to fetch - CORS error"

**Síntoma**:

```
Access to XMLHttpRequest blocked by CORS policy
```

**Causa**:

- Backend no permite requests desde frontend
- Headers CORS no configurados correctamente

**Solución**:

En el backend:

```typescript
// Express/NestJS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
```

En frontend:

```typescript
// Incluir credenciales en requests
const response = await fetch(`${baseUrl}/endpoint`, {
  method: "POST",
  credentials: "include", // ← Importante para cookies
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
});
```

---

### 2. Tokens expirados no se refrescan

**Síntoma**:

- Usuario deslogueado inesperadamente
- Token expira sin refresh automático

**Solución**:

Implementar refresh automático:

```typescript
// shared/hooks/http/useApiRequest.ts
import { useSession } from "next-auth/react";

export function useApiRequest() {
  const { data: session } = useSession();

  const request = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    let response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        ...options.headers
      }
    });

    // Si 401, intentar refresh
    if (response.status === 401) {
      await fetch("/api/auth/refresh", { method: "POST" });

      response = await fetch(url, {
        ...options,
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          ...options.headers
        }
      });
    }

    if (!response.ok) throw new Error("API Error");
    return response.json();
  };

  return request;
}
```

---


## Monitoreo

### Métricas a Trackear

**Performance**:

```typescript
// Usar Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

getCLS(console.log); // Cumulative Layout Shift
getFID(console.log); // First Input Delay
getFCP(console.log); // First Contentful Paint
getLCP(console.log); // Largest Contentful Paint
getTTFB(console.log); // Time to First Byte
```

**Errores**:

```typescript
// Capturar errores con Sentry (opcional)
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

**Analíticos**:

```typescript
// Google Analytics
import { useEffect } from "react";
import { useRouter } from "next/router";

export function usePageView() {
  const router = useRouter();

  useEffect(() => {
    window.gtag?.config("GA_MEASUREMENT_ID", {
      page_path: router.pathname
    });
  }, [router.pathname]);
}
```

---

## Actualizaciones de Dependencias

### Versioning

Entender semantic versioning:

```
1.2.3
│ │ └─ Patch: bugfixes (automático con ~)
│ └─── Minor: features compatibles (automático con ^)
└───── Major: cambios breaking (manual)
```

### Proceso de Actualización

**1. Actualizar una librería específica**:

```bash
npm update react@latest
npm update next@latest
```

**2. Actualizar todo (menores y patches)**:

```bash
npm update
```

**3. Actualizar a versiones mayores**:

```bash
# Ver qué se actualizaría
npm outdated

# Actualizar librería específica
npm install react@latest

# O usar interactivo
npm install -g npm-check-updates
ncu -u  # Actualizar package.json
npm install
```

**4. Después de actualizar**:

```bash
# Tests
npm test

# Lint
npm run lint

# Build
npm run build

# Verificar cambios
git diff package.json
git diff package-lock.json
```

### Manejo de Vulnerabilidades

```bash
# Auditar vulnerabilidades
npm audit

# Arreglar automáticamente
npm audit fix

# Arreglar vulnerabilidades mayores (más riesgoso)
npm audit fix --force
```

---

## Performance Optimization

### Bundle Size Analysis

```bash
# Instalar analyzer
npm install --save-dev @next/bundle-analyzer

# En next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // config
})

# Analizar
ANALYZE=true npm run build

# Usar el HTML generado en .next/static/chunks/
```

### Optimizaciones Comunes

**1. Code Splitting**:

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/Heavy'), {
  loading: () => <Skeleton />
});
```

**2. Image Optimization**:

```typescript
import Image from 'next/image';

export const Logo = () => (
  <Image
    src="/logo.png"
    alt="Logo"
    width={100}
    height={100}
    priority // Para above-the-fold images
  />
);
```

**3. Font Optimization**:

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

**4. Lazy Loading**:

```typescript
const Component = lazy(() => import('@/components/Heavy'));

<Suspense fallback={<Spinner />}>
  <Component />
</Suspense>
```

### Lighthouse Audits

```bash
# Chrome DevTools → Lighthouse
# o usando CLI
npm install -g lighthouse

lighthouse https://localhost:3000 --view
```

**Objetivos**:

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

---

## Debugging

### Browser DevTools

**Console**:

```typescript
// Logar con contexto
console.log("[auth]", "Token expired", token);
console.warn("[api]", "Request failed", error);
console.error("[form]", "Validation error", errors);
```

**Network Tab**:

- Revisar status codes de requests
- Headers de autenticación presentes
- Response payloads correctos

**React DevTools**:

- Inspeccionar props de componentes
- Revisar estado con hooks
- Profiler para performance

**NextAuth Debug**:

```env
# En .env.local
DEBUG=next-auth:*
```

---

## Checklist de Troubleshooting

Antes de escalar:

- [ ] Limpiar node_modules: `rm -rf node_modules && npm install`
- [ ] Limpiar caché Next.js: `rm -rf .next`
- [ ] Revisar logs de consola (navegador y servidor)
- [ ] Verificar variables de entorno
- [ ] Probar en navegador privado (sin extensiones)
- [ ] Reiniciar servidor de desarrollo
- [ ] Verificar conectividad del backend
- [ ] Revisar versión de Node.js

---

## Recursos de Soporte

### Documentación

- [Next.js Troubleshooting](https://nextjs.org/docs/messages)
- [NextAuth.js FAQ](https://next-auth.js.org/faq)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

### Comunidades

- Stack Overflow
- GitHub Issues
- Discord de Next.js
- TypeScript Discord
