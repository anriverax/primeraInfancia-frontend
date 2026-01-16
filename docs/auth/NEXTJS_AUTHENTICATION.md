# Next.js Authentication System Documentation

## Overview

Esta documentación cubre el sistema de autenticación implementado en la aplicación Next.js de Primera Infancia. El sistema utiliza NextAuth.js con estrategia JWT y un proveedor de credenciales personalizado.

---

## Componentes Principales

### 1. Configuración de NextAuth (`src/app/auth/infrastructure/nextAuth.ts`)

#### Descripción

Configura las opciones de NextAuth.js incluyendo estrategia de sesión, proveedores de autenticación y callbacks.

#### Características Clave

- **Estrategia de Sesión**: JWT (JSON Web Tokens)
- **Proveedor**: Credentials (email y contraseña)
- **Endpoint de Autenticación**: Backend en `NEXT_PUBLIC_BACKEND_URL/auth/login`
- **Páginas Personalizadas**:
  - Login: `/auth/iniciar-sesion`
  - Error: `/auth/iniciar-sesion`

#### Funcionalidad Detallada

**Método `authorize()`**

- Valida que email y contraseña estén presentes
- Realiza POST a backend con credenciales
- Maneja errores de respuesta HTTP
- Valida formato de respuesta del backend (statusCode 200 y data presente)
- Retorna datos del usuario autenticado

**Callback `jwt()`**

- Enriquece el token JWT con datos del usuario
- Preserva tokens de acceso y refresco
- Almacena email, rol, estado de verificación y permisos
- Maneja actualizaciones de sesión

**Callback `session()`**

- Estructura los datos del usuario para la sesión
- Incluye: email, nombre, rol, verificación, imagen de perfil

#### Manejo de Errores

- Email o contraseña ausentes: Error inmediato
- HTTP no-ok: Mensaje del backend o genérico
- Respuesta inválida: Error genérico de credenciales
- Errores inesperados: Mensaje de reintento

---

### 2. Formulario de Inicio de Sesión (`src/components/auth/signInForm.tsx`)

#### Descripción

Componente React memoizado que renderiza el formulario de login con validación en tiempo real.

#### Props

```typescript
type SignInFormProps = {
  formik: FormikProps<ISignIn>;
};
```

#### Estructura del Formulario

1. **Campo Email**

   - Tipo: email
   - Validación: required
   - Icono: User de lucide-react
   - Autocompletado activado

2. **Campo Contraseña**

   - Tipo: password
   - Validación: required
   - Icono: Lock de lucide-react

3. **Botón Submit**
   - Ancho completo
   - Estado de carga: `isSubmitting`
   - Estilos: Gradiente azul

#### Características de Validación

- Usa `formik.touched` para mostrar errores solo después de interacción
- Integración con `useCustomFormFields` para estilos consistentes
- Manejo de campos con `getFieldProps` para vinculación de datos

#### Performance

- Memoizado con `React.memo()` para prevenir re-renders innecesarios
- `displayName` establecido para debugging

---

### 3. API Route Handler (`src/app/api/auth/[...nextauth]/route.ts`)

#### Descripción

Ruta API dinámica que maneja todas las solicitudes de NextAuth.js.

#### Funcionalidad

- Exporta handlers GET y POST
- Delega toda la lógica a `NextAuth(authOptions)`
- Soporta flujos: signin, signout, callback, refresh, etc.

---

### 4. Hooks Personalizados

#### `useSignIn` (`src/components/auth/hook/useSignIn.ts`)

Maneja la lógica de inicio de sesión.

#### `useSignInForm` (`src/components/auth/hook/useSignInForm.ts`)

Inicializa y gestiona la instancia de Formik para el formulario.

#### `useSignOut` (`src/components/auth/hook/useSignOut.ts`)

Maneja el cierre de sesión del usuario.

---

## Flujo de Autenticación

```
┌─────────────────────────────────────────────────────┐
│ 1. Usuario ingresa credenciales en SignInForm       │
└────────────────┬────────────────────────────────────┘
                 │ (onSubmit con Formik)
                 ▼
┌─────────────────────────────────────────────────────┐
│ 2. Validación del lado del cliente                  │
│    (signInValidation.ts)                            │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 3. NextAuth envia POST a [...nextauth]/route.ts     │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 4. authorize() en nextAuth.ts                       │
│    - Fetch a BACKEND_URL/auth/login                │
│    - Valida respuesta                              │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 5. JWT Callback - Enriquece token                   │
│    - accessToken, refreshToken                     │
│    - user data (email, role, permissions)          │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 6. Session Callback - Estructura sesión             │
│    - Retorna user object con datos públicos         │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│ 7. Usuario autenticado + Redirect                   │
│    (AuthToastProvider muestra feedback)             │
└─────────────────────────────────────────────────────┘
```

---

## Variables de Entorno Requeridas

```env
NEXTAUTH_SECRET=<generated-secret-key>
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
```

---

## Tipos de Datos

### ISignIn

```typescript
interface ISignIn {
  email: string;
  passwd: string;
}
```

### Respuesta del Backend

```typescript
{
  statusCode: 200,
  data: {
    accessToken: string,
    refreshToken: string,
    user: {
      email: string,
      role: string,
      isVerified: boolean
    },
    permissions: string[]
  }
}
```

### Token JWT Enriquecido

```typescript
{
  accessToken: string,
  refreshToken: string,
  email: string,
  role: string,
  isVerified: boolean,
  permissions: string[]
}
```

---

## Validación

### Cliente (`src/components/auth/signInValidation.ts`)

- Email: requerido, formato válido
- Contraseña: requerido, mínimo de caracteres

### Servidor (`src/app/auth/infrastructure/nextAuth.ts`)

- Email y contraseña: no pueden estar vacíos
- Validación de respuesta HTTP
- Validación de estructura de datos

---

## Manejo de Errores

| Escenario              | Mensaje                                | Código HTTP |
| ---------------------- | -------------------------------------- | ----------- |
| Credenciales vacías    | "Email y contraseña son requeridos"    | -           |
| Backend no disponible  | "No pudimos iniciar sesión..."         | 500+        |
| Credenciales inválidas | Mensaje del backend o genérico         | 401/403     |
| Respuesta inválida     | "No pudimos iniciar sesión..."         | -           |
| Error inesperado       | "Por favor intenta de nuevo más tarde" | -           |

---

## Componentes Dependientes

- **AuthToastProvider**: Muestra notificaciones de autenticación
- **withProtectedRoute**: HOC para rutas protegidas
- **useAppStateStore**: Estado global de la aplicación
- **HeroUI**: Componentes UI (Button, Input)

---

## Buenas Prácticas Implementadas

✅ Tokens JWT seguros con secret encriptado
✅ Manejo robusto de errores con mensajes específicos
✅ Validación tanto en cliente como en servidor
✅ Componentes memoizados para performance
✅ Separación de concerns (config, UI, hooks)
✅ Integración segura con backend
✅ Soporte para permisos y roles basados en tokens

---

## Consideraciones de Seguridad

⚠️ **IMPORTANTE**:

- Nunca exponer `NEXTAUTH_SECRET` en el código
- Validar `NEXTAUTH_SECRET` en producción (mínimo 32 caracteres)
- El backend debe validar credenciales de forma segura
- Implementar rate limiting en el endpoint de login
- Usar HTTPS en producción
- Considerar MFA para usuarios con permisos elevados
- Implementar refresh token rotation

---

## Próximas Mejoras Sugeridas

1. Implementar refresh automático de tokens
2. Agregar logout en token expirado
3. Validación adicional de permisos en rutas
4. Logging centralizado de autenticación
5. Recuperación de contraseña olvidada
6. Autenticación multifactor (MFA)
7. Login con proveedores sociales (Google, Microsoft)
