import type { NextConfig } from "next";

/**
 * Configuración de headers de seguridad por ambiente
 *
 * DESARROLLO: Más permisivo para debugging
 * PRODUCCIÓN: Restrictivo para máxima seguridad
 */

// ✅ CSP diferente por ambiente
const getCSP = (): string => {
  const cspDirectives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://cdn.jsdelivr.net https://api.mapbox.com https://events.mapbox.com`,
    `style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net`,
    "img-src 'self' data: https: https://anriverax.s3.us-east-2.amazonaws.com",
    "font-src 'self' data: https://cdn.jsdelivr.net",
    `connect-src 'self' http://localhost:3001 ws://localhost:3001 ws://localhost:3000 https://api.mapbox.com https://events.mapbox.com https:`,
    "form-action 'self'",
    "frame-ancestors 'none'",
    "worker-src blob:"
  ];

  return cspDirectives.join("; ");
};

// ✅ HSTS diferente por ambiente
const getHSTS = (): string => {
  // DESARROLLO: Corto TTL para testing
  return "max-age=3600; includeSubDomains"; // 1 hora
};

// ✅ CORS diferente por ambiente
const getCORSOrigin = (): string => {
  return process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
};

const nextConfig: NextConfig = {
  /* config options here */
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        // ✅ Siempre activo: Previene clickjacking
        {
          key: "X-Frame-Options",
          value: "DENY"
        },
        // ✅ Siempre activo: Previene MIME type sniffing
        {
          key: "X-Content-Type-Options",
          value: "nosniff"
        },
        // ✅ Siempre activo: Legacy XSS protection
        {
          key: "X-XSS-Protection",
          value: "1; mode=block"
        },
        // ✅ Dinámico: HSTS
        {
          key: "Strict-Transport-Security",
          value: getHSTS()
        },
        // ✅ Dinámico: CSP
        {
          key: "Content-Security-Policy",
          value: getCSP()
        },
        // ✅ Siempre activo: Referrer Policy
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin"
        },
        // ✅ Solo en desarrollo: Permite DevTools
        {
          key: "X-Dev-Mode",
          value: "true"
        }
      ]
    },
    {
      // ✅ Headers adicionales para API routes
      source: "/api/(.*)",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: getCORSOrigin()
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "Content-Type, Authorization"
        }
      ]
    }
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "anriverax.s3.us-east-2.amazonaws.com",
        pathname: "/**"
      }
    ]
  }
  // Root redirect is handled via middleware for auth-aware behavior
};

export default nextConfig;
