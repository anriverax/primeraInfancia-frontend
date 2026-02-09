# Guía de Desarrollo - Primera Infancia Frontend

## Tabla de Contenidos

1. [Configuración del Entorno](#configuración-del-entorno)
2. [Estándares de Código](#estándares-de-código)
3. [Patrones Comunes](#patrones-comunes)
4. [Integración con Backend](#integración-con-backend)
5. [Testing](#testing)
6. [Despliegue](#despliegue)

---

## Configuración del Entorno

### Requisitos

- Node.js 18+
- npm o yarn
- Git

### Setup Inicial

```bash
# Clonar repositorio
git clone <repository-url>
cd primeraInfancia-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Editar .env.local con valores locales
# NEXTAUTH_SECRET - Generar con: openssl rand -hex 32
# NEXT_PUBLIC_BACKEND_URL - URL del backend
# NEXTAUTH_URL - URL de la aplicación
```

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev

# Acceder a http://localhost:3000
```

---

## Estándares de Código

### TypeScript

✅ **Obligatorio**: Todos los archivos deben usar TypeScript
✅ **Tipos explícitos**: Tipar parámetros de función y retornos
✅ **Inferencia**: Usar inferencia cuando es obvio el tipo

```typescript
// ✅ Bien
function getUserById(id: string): Promise<User> {
  return fetch(`/api/users/${id}`).then((r) => r.json());
}

// ❌ Mal
function getUserById(id) {
  return fetch(`/api/users/${id}`).then((r) => r.json());
}
```

### Componentes React

**Estructura Recomendada**:

```typescript
'use client'; // Si usa hooks del cliente

import React, { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { MyHook } from '@/hooks';

interface MyComponentProps {
  title: string;
  children: ReactNode;
  onAction?: () => void;
}

/**
 * Descripción breve del componente
 * @param props - Props del componente
 * @returns Elemento React renderizado
 */
export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  children,
  onAction
}) => {
  const router = useRouter();
  const [state, setState] = React.useState('');

  const handleClick = React.useCallback(() => {
    onAction?.();
  }, [onAction]);

  return (
    <div className="space-y-4">
      <h1>{title}</h1>
      {children}
      <button onClick={handleClick}>Action</button>
    </div>
  );
};

MyComponent.displayName = 'MyComponent';
```

### Hooks Personalizados

**Estructura**:

```typescript
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

/**
 * Obtiene datos del usuario
 * @param userId - ID del usuario
 * @returns Objeto con datos y estado
 */
export function useUser(userId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetch(`/api/users/${userId}`).then((r) => r.json())
  });

  return { user: data, isLoading, error };
}
```

### Nombrado y Convenciones

**Variables y Funciones**:

```typescript
// ✅ Bien
const userEmail = "user@example.com";
const isAuthenticated = true;
const getUserById = (id: string) => {};

// ❌ Mal
const ue = "user@example.com";
const auth = true;
const getUser = (id: string) => {};
```

**Booleanos**:

```typescript
// ✅ Utilizar prefijos is, has, can, should
const isLoading: boolean;
const hasErrors: boolean;
const canDelete: boolean;
const shouldRefresh: boolean;
```

---

## Patrones Comunes

### 1. Fetch de Datos

**Con React Query**:

```typescript
import { useQuery } from '@tanstack/react-query';

function UserComponent({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    enabled: !!userId // Solo ejecutar si userId existe
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return <div>{data.name}</div>;
}
```

### 2. Formularios con Formik

```typescript
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string().min(8).required('Requerido')
});

function LoginForm() {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      // Enviar al backend
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(values)
      });
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="email"
        {...formik.getFieldProps('email')}
      />
      {formik.touched.email && formik.errors.email && (
        <span>{formik.errors.email}</span>
      )}
    </form>
  );
}
```

### 3. Estado Global con Zustand

**Crear un Store**:

```typescript
import { create } from "zustand";

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false })
}));
```

**Usar el Store**:

```typescript
function UserProfile() {
  const { user, logout } = useAppStore();

  return (
    <div>
      <p>{user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 4. Rutas Protegidas

```typescript
// src/app/admin/layout.tsx
import { withProtectedRoute } from '@/app/withProtectedRoute';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default withProtectedRoute(AdminLayout, {
  requiredRoles: ['admin']
});
```

### 5. Middleware de Autenticación

```typescript
// src/middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Redirigir a login si no autenticado y accede a ruta protegida
  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/iniciar-sesion", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/protected/:path*"]
};
```

---

## Integración con Backend

### URLs y Endpoints

**Variables de Entorno**:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXTAUTH_SECRET=generated-secret
NEXTAUTH_URL=http://localhost:3000
```

### Llamadas HTTP

**Clase Helper**:

```typescript
// src/shared/utils/apiClient.ts
import { getSession } from "next-auth/react";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_BACKEND_URL!) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const session = await getSession();

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(session && {
          Authorization: `Bearer ${session.accessToken}`
        }),
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" });
  }

  post<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body)
    });
  }

  put<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body)
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
```

**Uso**:

```typescript
const user = await apiClient.get<User>("/users/123");
const newUser = await apiClient.post<User>("/users", { name: "John" });
```

---

## Testing

### Unit Tests (Jest + React Testing Library)

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/Button';

describe('Button Component', () => {
  it('renders with correct label', () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button label="Click" onClick={handleClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Tests

```typescript
// src/__tests__/auth.integration.test.tsx
import { signIn } from "next-auth/react";

describe("Authentication Flow", () => {
  it("should login with valid credentials", async () => {
    const result = await signIn("credentials", {
      email: "test@example.com",
      password: "password123",
      redirect: false
    });

    expect(result?.ok).toBe(true);
  });

  it("should show error with invalid credentials", async () => {
    const result = await signIn("credentials", {
      email: "test@example.com",
      password: "wrongpassword",
      redirect: false
    });

    expect(result?.ok).toBe(false);
    expect(result?.error).toBeDefined();
  });
});
```

### E2E Tests (Playwright)

```typescript
// e2e/auth.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should login successfully", async ({ page }) => {
    await page.goto("http://localhost:3000/auth/iniciar-sesion");

    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("http://localhost:3000/admin/dashboard");
  });
});
```

---

## Despliegue

### Build de Producción

```bash
# Compilar proyecto
npm run build

# Servir localmente (simula producción)
npm run start
```

### Variables de Entorno en Producción

```env
NEXTAUTH_SECRET=your-production-secret
NEXT_PUBLIC_BACKEND_URL=https://api.production.com
NEXTAUTH_URL=https://app.production.com
NODE_ENV=production
```

### Vercel Deployment

**1. Conectar repositorio a Vercel**

**2. Configurar variables de entorno**:

- Ir a Project Settings → Environment Variables
- Agregar todas las variables necesarias

**3. Desplegar**:

```bash
git push origin main  # Trigger automático en Vercel
```

### Dockerfile (Opcional)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

---

## Checklist de Desarrollo

- [ ] TypeScript sin errores (`npm run type-check`)
- [ ] ESLint pasando (`npm run lint`)
- [ ] Prettier formateado (`npm run format`)
- [ ] Tests pasando (`npm test`)
- [ ] No hay console.log en código de producción
- [ ] Manejo de errores implementado
- [ ] Validación de entrada en formularios
- [ ] Responsive design testado
- [ ] Accessibilidad cumplida (WCAG 2.1)
- [ ] Performance metrics aceptables
- [ ] Documentación actualizada

---

## Recursos Útiles

### Documentación Oficial

- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Herramientas

- [VS Code Extensions](https://marketplace.visualstudio.com)
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint
  - Thunder Client (API testing)

### Comunidad

- [Discord Comunidad](https://discord.gg)
- [Stackoverflow](https://stackoverflow.com/questions/tagged/nextjs)
