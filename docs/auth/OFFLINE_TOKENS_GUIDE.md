# 🔐 Guía de Gestión de Tokens NextAuth en Modo Offline

**Última actualización:** 17 de enero de 2026
**Versión:** 1.0
**Autor:** Análisis de Arquitectura Offline

---

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Estado Actual](#estado-actual)
3. [Problemas Identificados](#problemas-identificados)
4. [Soluciones Propuestas](#soluciones-propuestas)
5. [Arquitectura de Tokens](#arquitectura-de-tokens)
6. [Flujos de Operación](#flujos-de-operación)
7. [Implementación Técnica](#implementación-técnica)
8. [Consideraciones de Seguridad](#consideraciones-de-seguridad)
9. [Matriz de Riesgos](#matriz-de-riesgos)
10. [Checklist de Implementación](#checklist-de-implementación)

---

## 🎯 Visión General

Este documento detalla cómo gestionar los tokens de autenticación de NextAuth cuando la aplicación funciona en modo **offline** (sin conexión a internet). Es una guía técnica para implementar la funcionalidad offline en el módulo de asistencia manteniendo la seguridad y autenticación.

### Objetivos

- ✅ Permitir que usuarios registren asistencia sin conexión
- ✅ Mantener autenticación válida offline
- ✅ Sincronizar automáticamente al recuperar conexión
- ✅ Prevenir acceso no autorizado
- ✅ Resolver conflictos de tokens expirados

---

## 🔄 Estado Actual

### Implementación Existente

Tu aplicación utiliza la siguiente configuración de autenticación:

```typescript
// Fuente: src/app/auth/infrastructure/nextAuth.ts
session: {
  strategy: "jwt"; // JWT Strategy, no sesiones en BD
}
```

### Componentes Involucrados

| Componente               | Ubicación                         | Responsabilidad         |
| ------------------------ | --------------------------------- | ----------------------- |
| **nextAuth.ts**          | `src/app/auth/infrastructure/`    | Configuración principal |
| **useAxios.ts**          | `src/shared/hooks/http/`          | Interceptor de requests |
| **next-auth.d.ts**       | `src/shared/types/`               | Definición de tipos     |
| **useAttendanceForm.ts** | `src/components/attendance/hook/` | Envío de datos          |

### Flujo de Autenticación Actual

```
┌─────────────────────────────────────────────────┐
│ 1. Usuario ingresa credenciales en login        │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│ 2. Backend retorna:                             │
│    - accessToken (~15 min de vigencia)          │
│    - refreshToken (~7-30 días de vigencia)      │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│ 3. NextAuth almacena en JWT/Cookie HTTP-only   │
│    - Tokens en memoria del navegador            │
│    - Cookie segura (no accesible por JS)        │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│ 4. useAxios intercepta requests:                │
│    - Inyecta Bearer token en headers            │
│    - Si 401 → Refresca token automáticamente    │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│ 5. Request se ejecuta en backend                │
└─────────────────────────────────────────────────┘
```

### Tokens: Definición y Propósitos

**AccessToken**

```
Características:
- Corta vigencia: ~15 minutos
- Propósito: Autenticación en cada request
- Ubicación: JWT (cookie HTTP-only)
- Renovación: Automática mediante refresh

Contenido típico:
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "MENTOR",
  "iat": 1705500000,
  "exp": 1705500900
}
```

**RefreshToken**

```
Características:
- Larga vigencia: ~7-30 días
- Propósito: Obtener nuevo accessToken
- Ubicación: JWT (cookie HTTP-only)
- Endpoint: POST /auth/refresh-token

Contenido típico:
{
  "sub": "user_id",
  "type": "refresh",
  "iat": 1705500000,
  "exp": 1708092000
}
```

---

## 🚨 Problemas Identificados

### Problema 1: Tokens NO Persistentes Offline

**Severidad:** 🔴 CRÍTICA

```
Escenario:
┌─────────────────────────────────────────────────┐
│ Usuario está online, capturando datos           │
│ - NextAuth tiene tokens válidos en memoria      │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│ Pierde conexión a internet                      │
│ - Continúa usando datos cacheados ✅            │
│ - Pero NO tiene tokens guardados                │
└──────────────────┬──────────────────────────────┘
                   ▼
┌─────────────────────────────────────────────────┐
│ Intenta enviar registro de asistencia           │
│ - useAttendanceForm.ts llama a POST /attendance │
│ - useAxios intenta inyectar token               │
│ - ❌ NO hay token en NextAuth                   │
│ - ❌ NO hay token en storage                    │
│ - Request FALLA                                 │
└─────────────────────────────────────────────────┘
```

**Impacto:** Usuario no puede registrar asistencia offline

### Problema 2: Recarga de Página = Pérdida de Sesión

**Severidad:** 🟨 ALTA

```
Escenario:
Usuario offline, cambia de página → Recarga del navegador
     ▼
NextAuth session se limpia de memoria
     ▼
Si no hay cookie válida → Session vacía
     ▼
❌ Usuario debe volver a hacer login (¡SIN conexión!)
```

**Impacto:** Experiencia de usuario degradada

### Problema 3: Token Expirado Sin Poder Refrescar

**Severidad:** 🟡 MEDIA

```
Escenario:
User está offline por >15 minutos
     ▼
AccessToken expira (~15 min de vida)
     ▼
RefreshToken está en cookie HTTP-only (bien)
     ▼
Pero NO puede contactar /auth/refresh-token (sin conexión)
     ▼
Vuelve online, intenta usar token expirado
     ▼
useAxios detecta 401 y refresca automáticamente
     ▼
✅ Se recupera automáticamente
```

**Impacto:** Primer request online puede fallar, pero se reintenta

---

## ✅ Soluciones Propuestas

### Solución 1: Store de Tokens Offline (RECOMENDADA)

Crear un almacén adicional en IndexedDB para guardar tokens cuando el usuario está online.

**Ventajas:**

- ✅ Tokens disponibles en modo offline
- ✅ Acceso fallback si NextAuth vacío
- ✅ Permite recarga de página sin perder sesión
- ✅ Mantiene seguridad (IndexedDB, no localStorage)

**Desventajas:**

- ⚠️ Token expirado puede persistir offline
- ⚠️ Requiere lógica de sincronización adicional

### Solución 2: Cookies HTTP-Only Mejoradas

Extender la configuración de cookies de NextAuth.

**Ventajas:**

- ✅ Más seguro (no accesible por JavaScript)
- ✅ Persiste entre recargas
- ✅ NextAuth lo maneja automáticamente

**Desventajas:**

- ❌ No funciona si offline y sin cookie válida
- ❌ Less control sobre el token

### Solución 3: Híbrida (RECOMENDADA)

Combinar ambas soluciones para máxima robustez.

```
┌─────────────────────────────────────┐
│     TOKENS NEXTAUTH                 │
│  (Cookie HTTP-Only + JWT en sesión) │
│         ▲                ▲           │
│         │                │           │
│    Primaria          Backup          │
│         │                │           │
│         └────┬───────────┘           │
│              │                       │
│    ┌─────────▼───────────┐          │
│    │ OFFLINE TOKEN STORE │          │
│    │   (IndexedDB)       │          │
│    │                     │          │
│    │ - accessToken       │          │
│    │ - expiresAt         │          │
│    │ - user metadata     │          │
│    └─────────────────────┘          │
│         Fallback offline            │
└─────────────────────────────────────┘
```

---

## 🏗️ Arquitectura de Tokens

### Ciclo de Vida de un Token

```
┌──────────────┐
│   LOGIN      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────┐
│  Backend retorna tokens      │
│  - accessToken: exp +15 min  │
│  - refreshToken: exp +7-30d  │
└──────┬───────────────────────┘
       │
       ├─► NextAuth JWT (Cookie) ✅
       │
       └─► IndexedDB (accesToken + metadata)
           ├─ accessToken
           ├─ expiresAt
           ├─ user role
           └─ user email

       ▼ (Usuario online)
┌──────────────────────────────┐
│  Usar accessToken             │
│  Cada request: Bearer token   │
│  Interceptor: useAxios.ts     │
└──────┬───────────────────────┘
       │
       ├─ Si 401 (expirado)
       │  ├─ useAxios detecta
       │  ├─ Llama /auth/refresh-token
       │  ├─ Obtiene nuevo accessToken
       │  ├─ Actualiza NextAuth
       │  ├─ Actualiza IndexedDB
       │  └─ Reintenta request
       │
       └─ Si offline
          └─ Usa token de IndexedDB

       ▼ (Token expira)
┌──────────────────────────────┐
│  AccessToken expirado        │
│  (>15 minutos sin refrescar) │
└──────┬───────────────────────┘
       │
       ├─ Si online
       │  └─ Refresca automático ✅
       │
       └─ Si offline
          ├─ Guarda en cola sincronización
          ├─ Intenta offline con token viejo
          └─ Será actualizado al conectar

       ▼ (Vuelve online)
┌──────────────────────────────┐
│  Detecta conexión            │
│  Valida token:               │
│  - ¿Aún válido? → Úsalo      │
│  - ¿Expirado? → Refresca     │
│  - ¿Error? → Login           │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Sincroniza cola offline     │
│  Envía registros pendientes  │
│  con token válido            │
└──────────────────────────────┘
```

### Almacenamiento de Tokens

```
┌─────────────────────────────────────┐
│      NAVEGADOR (nextAuth)           │
├─────────────────────────────────────┤
│                                     │
│  Cookie HTTP-Only (Servidor)        │
│  ├─ NextAuth JWT                    │
│  ├─ AccessToken + RefreshToken      │
│  ├─ Seguro (no JS access)           │
│  ├─ Persiste entre recargas         │
│  └─ ✅ PRIMARIA                     │
│                                     │
├─────────────────────────────────────┤
│      NextAuth Session (JS)          │
│  ├─ En memoria durante sesión       │
│  ├─ Accesible a componentes         │
│  ├─ Se pierde en recarga            │
│  └─ ⚠️ VOLÁTIL                      │
│                                     │
├─────────────────────────────────────┤
│       IndexedDB (Offline)           │
│  ├─ AccessToken solamente           │
│  ├─ ExpiresAt timestamp             │
│  ├─ User metadata (rol, email)      │
│  ├─ Persiste entre sesiones         │
│  └─ 🔄 FALLBACK OFFLINE             │
│                                     │
├─────────────────────────────────────┤
│    ❌ NUNCA localStorage             │
│    ├─ NO usar para tokens           │
│    ├─ Vulnerable a XSS              │
│    ├─ Accesible por JavaScript      │
│    └─ INSEGURO                      │
│                                     │
└─────────────────────────────────────┘
```

---

## 🔄 Flujos de Operación

### Flujo 1: Login Normal (Online)

```
Usuario ingresa email + password
     ▼
POST /auth/login
     ▼
Backend valida credenciales
     ▼
Retorna {
  accessToken: "eyJhbGc...",
  refreshToken: "eyJhbGc...",
  user: { email, role, ... }
}
     ▼
nextAuth.ts → jwt callback
├─ Extrae tokens
├─ Actualiza JWT
└─ Guarda en cookie HTTP-only
     ▼
nextAuth.ts → session callback
├─ Llena session con datos
└─ Disponible en useSession()
     ▼
Nuevo store offline:
├─ Detecta session válida
├─ Extrae accessToken
├─ Guarda en IndexedDB:
│  {
│    accessToken: "...",
│    expiresAt: 1705500900,
│    user: { email, role }
│  }
└─ ✅ Listo para offline
```

### Flujo 2: Request Online con Token Válido

```
Componente llama a API
     ▼
useAttendanceForm.ts → handleSubmit
     ▼
useAxios.post("/attendance", data)
     ▼
Interceptor de request:
├─ ¿Hay session.accessToken? → SÍ
├─ Inyecta header:
│  Authorization: "Bearer {token}"
└─ Continúa request
     ▼
POST /attendance HTTP/1.1
Authorization: Bearer eyJhbGc...
Content-Type: application/json
{ ... datos de asistencia ... }
     ▼
Backend valida token
✅ Token válido
     ▼
Procesa asistencia
     ▼
HTTP 201 Created
```

### Flujo 3: Token Expirado (Online)

```
User sigue online, pero accessToken expiró
(sin actividad >15 minutos)
     ▼
Intenta enviar asistencia
     ▼
Interceptor request: Inyecta token expirado
     ▼
POST /attendance (con token viejo)
     ▼
Backend rechaza
HTTP 401 Unauthorized
     ▼
Interceptor de response detecta 401
├─ Verifica: ¿es endpoint auth? → NO
├─ Verifica: ¿ya reintentó? → NO
└─ Acciona refresh
     ▼
POST /auth/refresh-token
Authorization: Bearer {refreshToken}
     ▼
Backend valida refreshToken ✅
     ▼
Retorna {
  accessToken: "nuevo token",
  refreshToken: "nuevo refresh",
  user: { ... }
}
     ▼
nextAuth jwt callback
├─ Actualiza accessToken
├─ Actualiza cookie
└─ Guarda en session
     ▼
IndexedDB offline store
└─ Actualiza token guardado
     ▼
Reintenta request original
POST /attendance (con token nuevo)
     ▼
✅ HTTP 201 Created
```

### Flujo 4: Usuario Pasa a Offline

```
Usuario está online, navegando
     ▼
Pierde conexión a internet
(navigator.onLine = false)
     ▼
Continúa usando datos cacheados ✅
     ▼
Intenta registrar asistencia
     ▼
Interceptor request:
├─ ¿NextAuth tiene token? → SÍ (aún en memoria)
├─ Inyecta token
└─ Request sale
     ▼
Error de red (sin conexión)
     ▼
Detector offline captura error
     ▼
Guarda en cola sincronización:
{
  endpoint: "/attendance",
  method: "POST",
  data: { ... },
  timestamp: 1705500123,
  status: "pending"
}
     ▼
Notifica usuario:
"Registro guardado localmente,
 será sincronizado cuando haya conexión"
     ▼
Usuario puede seguir capturando datos ✅
```

### Flujo 5: Usuario Offline por Recarga de Página

```
Usuario offline, navegando
     ▼
Recarga página (F5 o navega)
     ▼
NextAuth session se limpia
(memoria del navegador)
     ▼
Pero cookie HTTP-only persiste ✅
     ▼
useSession() reconecta con cookie
     ▼
¿Cookie válida?
├─ SÍ → Session restaurada ✅
└─ NO → Intenta refrescar con refreshToken
         └─ Sin conexión → Falla ❌
     ▼
Plan B: Offline token store
     ▼
useOfflineTokenStore
├─ ¿Hay token en IndexedDB? → SÍ
├─ ¿Está expirado?
│  ├─ NO → Úsalo para requests
│  └─ SÍ → Guarda en cola, offline mode
└─ Restaura user info también
     ▼
✅ Usuario continúa con acceso offline
```

### Flujo 6: Vuelve Online (Sincronización)

```
Usuario offline, sin conexión
     ▼
Recupera conectividad
(navigator.onLine = true)
     ▼
Detector de conexión notifica
     ▼
Validador de token:
├─ ¿Token en NextAuth?
│  ├─ SÍ, válido → Continúa
│  ├─ SÍ, expirado → Refresca
│  └─ NO → Usa IndexedDB
│
└─ ¿Token en IndexedDB?
   ├─ SÍ, válido → Úsalo
   └─ SÍ, expirado → Refresca
     ▼
POST /auth/refresh-token
(si fue necesario)
     ▼
✅ Obtiene token válido
     ▼
Sincronizador de cola:
     ▼
Lee cola de asistencias pendientes
Para cada registro pendiente:
├─ POST /attendance
├─ Si 201 → Elimina de cola
└─ Si error → Reintenta
     ▼
Notifica usuario:
"Se sincronizaron X registros"
     ▼
Limpia cola ✅
     ▼
App vuelve a estado normal
```

---

## 🛠️ Implementación Técnica

### 1. Store para Tokens Offline

**Archivo:** `src/shared/store/useOfflineTokenStore.ts`

```typescript
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser {
  role: string;
  isVerified: boolean;
  picture: string;
  email: string | undefined | null;
  name: string | undefined | null;
}

interface OfflineTokenState {
  // Estado
  accessToken: string | null;
  expiresAt: number | null;
  user: IUser | null;

  // Acciones
  saveToken: (token: string, user: IUser, expiresInSeconds?: number) => void;
  getToken: () => string | null;
  isTokenExpired: () => boolean;
  isTokenExpiredSoon: (secondsBuffer?: number) => boolean;
  clearToken: () => void;
  getUser: () => IUser | null;
}

export const useOfflineTokenStore = create<OfflineTokenState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      expiresAt: null,
      user: null,

      saveToken: (token: string, user: IUser, expiresInSeconds: number = 900) => {
        const now = Math.floor(Date.now() / 1000);
        const expiresAt = now + expiresInSeconds;

        set({ accessToken: token, expiresAt, user });
      },

      getToken: () => get().accessToken,

      isTokenExpired: () => {
        const { expiresAt } = get();
        if (!expiresAt) return true;

        const now = Math.floor(Date.now() / 1000);
        return now > expiresAt;
      },

      isTokenExpiredSoon: (secondsBuffer: number = 60) => {
        const { expiresAt } = get();
        if (!expiresAt) return true;

        const now = Math.floor(Date.now() / 1000);
        return now > expiresAt - secondsBuffer;
      },

      clearToken: () => {
        set({ accessToken: null, expiresAt: null, user: null });
      },

      getUser: () => get().user
    }),
    {
      name: "offline-token-store",
      storage: createJSONStorage(() => ({
        // Usar IndexedDB en lugar de localStorage
        getItem: async (key: string) => {
          // Implementación con idb library
        },
        setItem: async (key: string, value: string) => {
          // Implementación con idb library
        },
        removeItem: async (key: string) => {
          // Implementación con idb library
        }
      }))
    }
  )
);
```

### 2. Hook para Sincronizar con NextAuth

**Archivo:** `src/shared/hooks/auth/useOfflineTokenSync.ts`

```typescript
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useOfflineTokenStore } from "@/shared/store/useOfflineTokenStore";

export const useOfflineTokenSync = () => {
  const { data: session } = useSession();
  const saveToken = useOfflineTokenStore((state) => state.saveToken);
  const getToken = useOfflineTokenStore((state) => state.getToken);

  // Guardar token en IndexedDB cuando NextAuth lo proporciona
  useEffect(() => {
    if (session?.accessToken && session?.user) {
      saveToken(session.accessToken, session.user);
    }
  }, [session?.accessToken, session?.user, saveToken]);

  // Hook para verificar token
  const hasValidToken = (): boolean => {
    // Primero verificar NextAuth
    if (session?.accessToken) {
      return true;
    }

    // Si no, verificar IndexedDB
    const storedToken = getToken();
    return storedToken !== null && !useOfflineTokenStore.getState().isTokenExpired();
  };

  return { hasValidToken };
};
```

### 3. Modificación a useAxios

**Archivo:** `src/shared/hooks/http/useAxios.ts` (MODIFICADO)

Añadir fallback a token offline:

```typescript
// En el interceptor de request, cambiar:
const requestIntercept = axiosConfig.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (isPrivateRef.current) {
      // 1. Intentar usar token de NextAuth (primario)
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
        return config;
      }

      // 2. Si no hay session pero estamos offline o sin conexión
      if (!navigator.onLine) {
        const getStoredToken = useOfflineTokenStore((state) => state.getToken);
        const storedToken = getStoredToken();

        if (storedToken && !useOfflineTokenStore.getState().isTokenExpired()) {
          config.headers.Authorization = `Bearer ${storedToken}`;
          return config;
        }
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
```

### 4. Detector de Conectividad

**Archivo:** `src/shared/hooks/network/useOfflineStatus.ts`

```typescript
import { useEffect, useState, useCallback } from "react";

interface OfflineStatusState {
  isOnline: boolean;
  wasJustOffline: boolean;
  isSyncing: boolean;
  lastSyncTime: number | null;
  syncError: string | null;
}

export const useOfflineStatus = () => {
  const [status, setStatus] = useState<OfflineStatusState>({
    isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
    wasJustOffline: false,
    isSyncing: false,
    lastSyncTime: null,
    syncError: null
  });

  useEffect(() => {
    const handleOnline = () => {
      setStatus((prev) => ({
        ...prev,
        isOnline: true,
        wasJustOffline: true
      }));

      // Dispara evento personalizado
      window.dispatchEvent(new Event("connection-restored"));
    };

    const handleOffline = () => {
      setStatus((prev) => ({
        ...prev,
        isOnline: false
      }));
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return status;
};
```

### 5. Hook para Sincronizar Cola

**Archivo:** `src/shared/hooks/offline/useSyncOfflineQueue.ts`

```typescript
import { useEffect, useState } from "react";
import { useOfflineStatus } from "@/shared/hooks/network/useOfflineStatus";
import { useOfflineQueueStore } from "@/shared/store/useOfflineQueueStore";
import { useOfflineTokenStore } from "@/shared/store/useOfflineTokenStore";
import useAxios from "@/shared/hooks/http/useAxios";

export const useSyncOfflineQueue = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const { isOnline } = useOfflineStatus();
  const axiosClient = useAxios(true);

  const getPendingItems = useOfflineQueueStore((state) => state.getPending);
  const removePending = useOfflineQueueStore((state) => state.removePending);
  const updateItemStatus = useOfflineQueueStore((state) => state.updateItemStatus);

  const syncQueue = useCallback(async () => {
    if (!isOnline || isSyncing) return;

    setIsSyncing(true);
    const pendingItems = getPendingItems();

    for (const item of pendingItems) {
      try {
        // Validar token antes de sincronizar
        const isTokenValid = !useOfflineTokenStore.getState().isTokenExpired();

        if (!isTokenValid) {
          console.warn("Token expirado, saltando sincronización");
          break;
        }

        // Enviar item
        const response = await axiosClient.post(item.endpoint, item.data);

        if (response.status === 201) {
          removePending(item.id);
        } else {
          updateItemStatus(item.id, "failed");
        }
      } catch (error) {
        console.error("Error sincronizando:", error);
        updateItemStatus(item.id, "failed");
      }
    }

    setIsSyncing(false);
  }, [isOnline, isSyncing, getPendingItems, removePending, updateItemStatus]);

  // Sincronizar cuando se recupere la conexión
  useEffect(() => {
    if (isOnline) {
      syncQueue();
    }
  }, [isOnline, syncQueue]);

  return { isSyncing, syncQueue };
};
```

---

## 🔒 Consideraciones de Seguridad

### ✅ SEGURO

```typescript
// 1. AccessToken en IndexedDB (corta vigencia ~15 min)
useOfflineTokenStore.saveToken(accessToken, user, 900);
// ✅ OK: Expira rápidamente, riesgo limitado

// 2. Usar cookies HTTP-only para tokens (NextAuth)
// ✅ OK: No accesible por JavaScript, CORS-safe

// 3. Validar token antes de usar offline
if (!isTokenExpired()) {
  // Usar token
}
// ✅ OK: Revisa vigencia antes de usar

// 4. Borrar tokens en logout
clearToken();
// ✅ OK: Limpia datos sensibles
```

### ❌ NO SEGURO

```typescript
// 1. Guardar refreshToken en localStorage
localStorage.setItem("refreshToken", token);
// ❌ RIESGO: Vulnerable a XSS, larga vigencia

// 2. AccessToken en localStorage sin expiración
localStorage.setItem("accessToken", token);
// ❌ RIESGO: Accesible por JS, sin validación

// 3. Confiar solo en IndexedDB
if (storedToken) {
  // Sin validar expiración
  useToken();
}
// ❌ RIESGO: Token expirado podría falsificarse

// 4. Enviar refreshToken en body de request
axios.post("/api", { refreshToken: token });
// ❌ RIESGO: Expone token en logs
```

### Matriz de Decisión: ¿Dónde guardar qué?

```
┌─────────────┬──────────────┬─────────────┬──────────────┬────────────────────┐
│ Token       │ Cookies HTTP │ NextAuth    │ IndexedDB    │ localStorage       │
│             │ Only         │ Memory      │ (Offline)    │                    │
├─────────────┼──────────────┼─────────────┼──────────────┼────────────────────┤
│AccessToken  │ ✅ PRIMARIA  │ ✅ Backing  │ ✅ Fallback  │ ❌ NUNCA           │
│             │              │             │  Offline     │                    │
├─────────────┼──────────────┼─────────────┼──────────────┼────────────────────┤
│RefreshToken │ ✅ PRIMARIA  │ ❌ NO       │ ❌ NO        │ ❌ NUNCA           │
│             │ (Secure)     │             │              │                    │
├─────────────┼──────────────┼─────────────┼──────────────┼────────────────────┤
│User Data    │ ❌ NO        │ ✅ SÍ       │ ✅ Metadata  │ ❌ NUNCA           │
│(email, role)│              │ (públicos)  │  (públicos)  │                    │
├─────────────┼──────────────┼─────────────┼──────────────┼────────────────────┤
│Session ID   │ ✅ PRIMARIA  │ ✅ Backing  │ ❌ NO        │ ❌ NUNCA           │
│             │ (Secure)     │             │              │                    │
└─────────────┴──────────────┴─────────────┴──────────────┴────────────────────┘
```

### Cifrado (Opcional pero Recomendado para RefreshToken)

Si necesitas almacenar refreshToken offline (muy sensible):

```typescript
import CryptoJS from "crypto-js";

// Encriptar
const encrypted = CryptoJS.AES.encrypt(refreshToken, process.env.REACT_APP_ENCRYPTION_KEY).toString();

localStorage.setItem("encryptedRefreshToken", encrypted);

// Desencriptar
const decrypted = CryptoJS.AES.decrypt(
  localStorage.getItem("encryptedRefreshToken") || "",
  process.env.REACT_APP_ENCRYPTION_KEY
).toString(CryptoJS.enc.Utf8);

// ⚠️ NOTA: Ya tienes crypto-js en package.json
```

---

## 📊 Matriz de Riesgos

### Análisis de Escenarios

```
┌──────────────────────┬──────────┬─────────────────────────┬─────────────┐
│ Escenario            │ Riesgo   │ Impacto                 │ Mitigación  │
├──────────────────────┼──────────┼─────────────────────────┼─────────────┤
│ Online               │ ⬜ BAJO  │ Funcionamiento normal   │ NextAuth    │
│ Usuario válido       │          │ Token válido en cookie  │ maneja      │
│                      │          │                         │ automático  │
├──────────────────────┼──────────┼─────────────────────────┼─────────────┤
│ Offline              │ 🟨 MEDIO │ Token IndexedDB expirado│ Intentar    │
│ Token aún válido     │          │ pero funciona           │ refrescar   │
│                      │          │                         │ al conectar │
├──────────────────────┼──────────┼─────────────────────────┼─────────────┤
│ Offline              │ 🟠 ALTO  │ No puede sincronizar    │ Guardar en  │
│ Token expirado >30m  │          │ sin token válido        │ cola,       │
│                      │          │                         │ esperar     │
├──────────────────────┼──────────┼─────────────────────────┼─────────────┤
│ Offline              │ 🔴 CRÍTICO│ Usuario sin acceso      │ Requiere    │
│ Session perdida      │          │ (¿recarga de página?)   │ implementar │
│ Token IndexedDB -    │          │ LOGIN OFFLINE necesario │ login       │
│                      │          │ (muy complejo)          │ offline     │
├──────────────────────┼──────────┼─────────────────────────┼─────────────┤
│ Malware/XSS          │ 🔴 CRÍTICO│ Token robado            │ Never       │
│ AccesaIndexedDB      │          │ Registros falsificados  │ localStorage│
│                      │          │                         │ Validation  │
│                      │          │                         │ en backend  │
├──────────────────────┼──────────┼─────────────────────────┼─────────────┤
│ Token falsificado    │ 🟠 ALTO  │ Request rechazada       │ Backend     │
│ Usuario intenta usar │          │ (401 Unauthorized)      │ valida JWT  │
│ token manipulado     │          │                         │             │
└──────────────────────┴──────────┴─────────────────────────┴─────────────┘
```

### Recomendaciones de Seguridad

1. **NUNCA guardar en localStorage**

   - Vulnerable a XSS
   - Accesible por cualquier JavaScript

2. **Usar IndexedDB con cuidado**

   - Solo accessToken (corta vigencia)
   - Validar expiración siempre
   - Cifrar si es posible

3. **Confiar en NextAuth para RefreshToken**

   - Cookie HTTP-only (segura)
   - No accesible por JavaScript
   - Automáticamente renovado

4. **Validar en Backend**

   - Cada token debe validarse
   - Verificar firma JWT
   - Rechazar tokens manipulados

5. **HTTPS Obligatorio**

   - Siempre usar conexión segura
   - Prevenir man-in-the-middle

6. **Implementar Rate Limiting**
   - Limitar intentos de refresh
   - Prevenir ataques de fuerza bruta

---

## ✅ Checklist de Implementación

### Fase 1: Preparación (Horas: 1-2)

- [ ] Instalar dependencias necesarias:

  ```bash
  npm install idb workbox-cli
  ```

- [ ] Revisar tipos existentes:

  - [ ] `next-auth.d.ts`
  - [ ] `globals.ts` (tipos globales)

- [ ] Crear carpeta para nuevos hooks:
  ```
  src/shared/hooks/
  ├── auth/          (nuevo)
  ├── network/       (nuevo)
  ├── offline/       (nuevo)
  └── ...
  ```

### Fase 2: Store Offline (Horas: 2-3)

- [ ] Crear `useOfflineTokenStore.ts`

  - [ ] Interfaz `OfflineTokenState`
  - [ ] Actions: `saveToken()`, `getToken()`, `clearToken()`
  - [ ] Lógica: `isTokenExpired()`, `isTokenExpiredSoon()`
  - [ ] Persist: Usar IndexedDB (no localStorage)

- [ ] Crear `useOfflineQueueStore.ts`

  - [ ] Interfaz para items pendientes
  - [ ] Actions: `addPending()`, `getPending()`, `removePending()`
  - [ ] Persist: IndexedDB

- [ ] Tests unitarios:
  - [ ] Token expiration logic
  - [ ] Queue CRUD operations

### Fase 3: Hooks de Sincronización (Horas: 2-3)

- [ ] Crear `useOfflineTokenSync.ts`

  - [ ] Sincronizar NextAuth → IndexedDB
  - [ ] Restaurar token en recarga
  - [ ] Hook: `hasValidToken()`

- [ ] Crear `useOfflineStatus.ts`

  - [ ] Detectar cambios de conectividad
  - [ ] Event listeners: online/offline
  - [ ] Notificar cambios

- [ ] Crear `useSyncOfflineQueue.ts`
  - [ ] Lógica de sincronización
  - [ ] Reintento automático
  - [ ] Manejo de errores

### Fase 4: Modificación de useAxios (Horas: 1-2)

- [ ] Actualizar `useAxios.ts`

  - [ ] Fallback a token offline
  - [ ] Manejo de 401 offline
  - [ ] Guardar en cola si falla

- [ ] Tests:
  - [ ] Request con token NextAuth
  - [ ] Request con token offline
  - [ ] Request sin token

### Fase 5: Modificación de useAttendanceForm (Horas: 1-2)

- [ ] Actualizar `useAttendanceForm.ts`

  - [ ] Capturar errores de red
  - [ ] Guardar en cola offline
  - [ ] Mostrar estado al usuario

- [ ] Tests:
  - [ ] Submit online
  - [ ] Submit offline
  - [ ] Sincronización post-conexión

### Fase 6: UI/UX (Horas: 2-3)

- [ ] Crear indicador de conectividad

  - [ ] Badge en top bar
  - [ ] Animación offline
  - [ ] Color rojo = offline

- [ ] Crear toast de sincronización

  - [ ] "Guardado localmente"
  - [ ] "Sincronizando..."
  - [ ] "Sincronizado ✓"

- [ ] Modificar form de asistencia
  - [ ] Deshabilitar submit si sin token
  - [ ] Mostrar estado offline
  - [ ] Indicador de cola

### Fase 7: Service Worker (Horas: 1-2)

- [ ] Configurar Workbox:

  - [ ] Cache strategy para archivos estáticos
  - [ ] Network fallback
  - [ ] Background sync (optional)

- [ ] Registrar service worker:
  - [ ] En `src/app/layout.tsx`
  - [ ] Manejo de errores

### Fase 8: Testing (Horas: 3-4)

- [ ] Tests unitarios:

  - [ ] Stores (Zustand)
  - [ ] Hooks personalizados
  - [ ] Validación de tokens

- [ ] Tests de integración:

  - [ ] Login → Offline → Sincronización
  - [ ] Token expiration handling
  - [ ] Cola de asistencias

- [ ] Tests E2E:
  - [ ] Escenario completo offline
  - [ ] Múltiples registros pendientes
  - [ ] Conflictos de sincronización

### Fase 9: Documentación (Horas: 1-2)

- [ ] Actualizar README
- [ ] Crear guía de desarrollo offline
- [ ] Documentar API de stores
- [ ] Ejemplos de uso

### Fase 10: Deployment (Horas: 1-2)

- [ ] Testing en producción:

  - [ ] Emular offline con DevTools
  - [ ] Probar en dispositivos móviles
  - [ ] Validar en diferentes navegadores

- [ ] Monitoreo:
  - [ ] Logs de sincronización
  - [ ] Alertas de errores
  - [ ] Métricas de uso offline

---

## 📚 Referencias

### Documentación Relacionada

- [NextAuth.js JWT Strategy](https://next-auth.js.org/configuration/pages#signin)
- [Zustand Persist](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [idb Library](https://github.com/jakearchibald/idb)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Workbox](https://developers.google.com/web/tools/workbox)

### Archivos del Proyecto Relacionados

- [nextAuth.ts](src/app/auth/infrastructure/nextAuth.ts)
- [useAxios.ts](src/shared/hooks/http/useAxios.ts)
- [useAttendanceForm.ts](src/components/attendance/hook/useAttendanceForm.ts)
- [next-auth.d.ts](src/shared/types/next-auth.d.ts)

---

## 🤔 Preguntas Frecuentes

### P: ¿Qué pasa si el usuario offline nunca vuelve online?

**R:** Los registros se guardan indefinidamente en IndexedDB. Cuando vuelva online, se sincronizarán. Puedes implementar una política de expiración (ej: 7 días) en la cola.

### P: ¿Y si el servidor rechaza un registro offline por algún motivo?

**R:** Se marca como "failed" en la cola. El usuario puede:

1. Reintentarlo manualmente
2. Esperar a que el sistema lo reintente automáticamente
3. Editarlo y reenviar

### P: ¿Se puede falsificar un token almacenado?

**R:** Difícil, porque:

1. JWT tiene firma digital
2. Backend valida la firma
3. Expiración rápida (~15 min)

Pero sí, se puede intentar. Por eso requiere validación en backend.

### P: ¿Cómo manejo conflictos si dos usuarios registran lo mismo?

**R:** Usa timestamps:

1. Cliente envía: `{ ..., timestamp: 1705500000, clientId: "xyz" }`
2. Backend detecta duplicados por timestamp + clientId
3. Rechaza si es duplicado

### P: ¿Es seguro usar accessToken en IndexedDB por 15 minutos?

**R:** Sí, porque:

- Corta vigencia (15 minutos)
- Se valida en cada request
- Se refresca automáticamente
- Riesgo limitado si se compromete

### P: ¿Necesito obligatoriamente Service Worker?

**R:** No para funcionalidad básica, pero SÍ para:

- Mejor caching
- Background sync
- Push notifications
- Mejor UX offline

---

## 📝 Notas Finales

1. **Esta es una guía de implementación**, no un código listo para usar.

2. **La seguridad es lo primero**: Valida siempre en backend.

3. **Prueba exhaustivamente**: Offline es un escenario complicado.

4. **Comunica con el usuario**: Informa qué está sincronizando.

5. **Considera el backend**: Necesita lógica de deduplicación y versionado.

6. **Monitorea en producción**: Logs de errores offline son críticos.

---

**Documento creado:** 17 de enero de 2026
**Versión:** 1.0
**Estado:** Listo para implementación
