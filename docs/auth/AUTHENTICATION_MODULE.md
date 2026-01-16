# Documentación del Módulo de Autenticación

## 📋 Descripción General

Este documento proporciona una descripción completa del módulo de autenticación de la aplicación Next.js 15, incluyendo flujos de seguridad, configuración y patrones implementados.

---

## 🏗️ Arquitectura General

### Componentes Principales

```
src/
├── app/
│   ├── auth/
│   │   ├── infrastructure/
│   │   │   └── nextAuth.ts           # Configuración NextAuth.js
│   │   ├── layout.tsx                # Layout de autenticación
│   │   └── iniciar-sesion/
│   │       └── page.tsx              # Página de login
│   └── api/
│       └── auth/
│           ├── [...nextauth]/
│           │   └── route.ts          # NextAuth route handler
│           └── refresh/
│               └── route.ts          # Token refresh endpoint
└── components/
    └── auth/
        ├── signInForm.tsx            # Componente del formulario
        ├── AuthToastProvider.ts      # Toast notifications
        └── hook/
            ├── useSignIn.ts          # Hook NextAuth integration
            ├── useSignInForm.ts      # Hook Formik integration
            └── useSignOut.ts         # Hook logout
```

---

## 🔐 Configuración de Seguridad

### NextAuth.js Configuration (`nextAuth.ts`)

**Estrategia:** JWT-based authentication con Credentials Provider

```typescript
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/iniciar-sesion",
    error: "/auth/iniciar-sesion"
  }
};
```

### Características de Seguridad

| Característica                | Implementación                       | Beneficio                     |
| ----------------------------- | ------------------------------------ | ----------------------------- |
| **JWT Strategy**              | Stateless authentication             | Escalabilidad horizontal      |
| **httpOnly Cookies**          | Tokens inaccessibles a client JS     | Protección CSRF/XSS           |
| **Credential Encryption**     | AES encryption before transmission   | Obfuscation layer             |
| **Generic Error Messages**    | Prevención de user enumeration       | Seguridad adicional           |
| **Server-side Token Refresh** | Refresh token nunca llega al cliente | Protección contra token leaks |
| **Type Safety**               | Strict TypeScript types              | Prevención de runtime errors  |

---

## 🔄 Flujo de Autenticación

### 1. Login Flow

```
Usuario introduce credenciales
         ↓
useSignInForm (Formik validation)
         ↓
encrypt(email, password) [Client-side AES]
         ↓
useSignIn → NextAuth.signIn("credentials")
         ↓
API: POST /auth/login [Backend valida]
         ↓
Backend retorna { accessToken, refreshToken, user, permissions }
         ↓
NextAuth JWT callback enriquece token
         ↓
Session callback expone datos al cliente
         ↓
Redirect a /admin/dashboard
```

### 2. Token Refresh Flow

```
Request 401 (accessToken expirado)
         ↓
useAxios detecta 401
         ↓
Llamada a POST /api/auth/refresh [Server-side]
         ↓
getServerSession obtiene refreshToken
         ↓
Backend /auth/refresh-token con refreshToken
         ↓
Retorna nuevo accessToken
         ↓
JWT callback actualiza token
         ↓
Request reintentar con nuevo token
```

### 3. Logout Flow

```
Usuario hace clic en "Cerrar sesión"
         ↓
useSignOut → api.post("/auth/logout")
         ↓
NextAuth signOut() elimina sesión
         ↓
Redirect a /auth/iniciar-sesion
```

---

## 📦 Hooks Principales

### `useSignIn()`

**Propósito:** Integración con NextAuth para autenticación

```typescript
const { signInWithCredentials, isLoading, error } = useSignIn();

// Uso
const result = await signInWithCredentials(email, password);
if (result.ok) {
  // Éxito - NextAuth redirige automáticamente
}
```

**Responsabilidades:**

- Llamada a NextAuth signIn con provider "credentials"
- Manejo de estados (loading, error)
- Retorno de resultado con estado ok/error

### `useSignInForm()`

**Propósito:** Integración Formik + NextAuth + Zustand

```typescript
const formik = useSignInForm();

// Validación automática + encryption + sign-in
<input {...getInputProps(formik, "email")} />
```

**Responsabilidades:**

- Formik setup con schema de validación
- Encriptación de credenciales
- Manejo de respuestas del servidor
- Actualización de Zustand store

### `useSignOut()`

**Propósito:** Logout dual-phase (backend + NextAuth)

```typescript
const { signOutWithCredentials, isLoading } = useSignOut();

await signOutWithCredentials();
```

**Responsabilidades:**

- Call backend logout endpoint
- Clear NextAuth session
- Redirect to login

---

## 🔑 Gestión de Tokens

### Almacenamiento

| Token            | Ubicación       | Acceso              | Seguridad    |
| ---------------- | --------------- | ------------------- | ------------ |
| **accessToken**  | httpOnly cookie | Server-side header  | ✅ Protegido |
| **refreshToken** | httpOnly cookie | Server-side refresh | ✅ Protegido |
| **JWT**          | httpOnly cookie | NextAuth internal   | ✅ Protegido |

### Ciclo de Vida

```
Login
 ├─ accessToken: 15 minutos
 ├─ refreshToken: 7 días
 └─ JWT: Mismo que refreshToken

Token expirado → Refresh automático
 └─ Nuevo accessToken válido por 15 minutos

Refresh token expirado
 └─ Usuario debe re-autenticarse
```

---

## 📡 API Endpoints

### POST `/auth/login` (Backend)

**Request:**

```json
{
  "value1": "email_encriptado",
  "value2": "password_encriptado"
}
```

**Response (200):**

```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "user": {
      "email": "usuario@ejemplo.com",
      "role": "admin",
      "isVerified": true
    },
    "permissions": ["write:users", "read:reports"]
  }
}
```

### POST `/api/auth/refresh` (Frontend)

**Request:** Automático con cookies

**Response (200):**

```json
{
  "accessToken": "new_jwt_token",
  "refreshToken": "new_refresh_token"
}
```

**Error Responses:**

- `401`: No session o refresh token expirado
- `500`: Backend refresh failed

---

## 🎯 Selectors de Zustand

Se implementaron selectors para optimizar re-renders:

### Uso Recomendado

```typescript
// ✅ Bien - Solo suscribe a isSigningOut
const isSigningOut = useIsSigningOut();

// ❌ Evitar - Suscribe a TODO el store
const { isSigningOut } = useAppStateStore();
```

---

## ⚠️ Manejo de Errores

### Errores Genéricos (Por Seguridad)

Todos los errores de autenticación muestran mensajes genéricos:

```
❌ "Email o contraseña incorrectos"
❌ "No pudimos iniciar sesión"
✅ Sin detalles que revelen si el email existe
```

### Logging en Desarrollo

```typescript
// ✅ Solo se loguea en desarrollo
if (process.env.NEXT_PUBLIC_NODE_ENV_ENV === "development") {
  console.error("[auth] Error:", error);
}
```

### Errores Comunes

| Error                             | Causa            | Solución               |
| --------------------------------- | ---------------- | ---------------------- |
| "No hay refresh token disponible" | Session expirada | Re-login necesario     |
| "Invalid token format"            | JWT malformado   | Limpiar cookies        |
| "Failed to refresh token"         | Backend error    | Verificar conectividad |

---

## 🔐 Mejores Prácticas Implementadas

### ✅ Seguridad

- [x] Credenciales encriptadas antes de enviar
- [x] Tokens en httpOnly cookies
- [x] Refresh token server-side only
- [x] Mensajes de error genéricos
- [x] HTTPS-only en producción
- [x] CSRF protection via NextAuth

### ✅ Rendimiento

- [x] Selectors de Zustand para re-renders
- [x] Memoización de componentes
- [x] Lazy loading de páginas
- [x] Token caching inteligente

### ✅ Developer Experience

- [x] Tipos TypeScript completos
- [x] JSDoc documentación
- [x] Errores claros y accionables
- [x] Logging en desarrollo

---

## 📝 Tipos TypeScript

### Session Interface

```typescript
interface Session extends IToken {
  user: IUser;
  permissions: string[];
  accessToken: string;
  refreshToken: string;
}

interface IUser {
  role: string;
  isVerified: boolean;
  picture: string;
  email: string | null;
  name: string | null;
}
```

### JWT Token

```typescript
interface JWT {
  accessToken: string;
  refreshToken: string;
  email: string;
  role: string;
  isVerified: boolean;
  permissions: string[];
}
```

---

## 🧪 Testing

### Unit Tests Recomendados

```typescript
// useSignIn.ts
- ✓ Must return ok: true on success
- ✓ Must set error on invalid credentials
- ✓ Must handle network errors gracefully

// nextAuth.ts
- ✓ JWT callback must enrich token with user data
- ✓ Session callback must expose permissions
- ✓ Authorize must reject invalid credentials
```

---

## 🚀 Deployment

### Environment Variables Requeridas

```bash
NEXTAUTH_SECRET=<strong_random_string>
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_BACKEND_URL=https://api.your-domain.com
```

### Checklist Pre-Deploy

- [ ] `NEXTAUTH_SECRET` configurado y seguro
- [ ] `NEXTAUTH_URL` apunta a dominio real (no localhost)
- [ ] Backend HTTPS disponible
- [ ] Refresh token lifetime configurado
- [ ] Logging en console.error removido en production
- [ ] Error messages no revelan información sensible

---

## 📚 Referencias Adicionales

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

---

## 📞 Soporte

Para preguntas sobre el módulo de autenticación:

1. Revisar esta documentación
2. Revisar comentarios en el código
3. Contactar al equipo de backend para cambios de API
