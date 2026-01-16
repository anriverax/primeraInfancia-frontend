# 🚀 Quick Start Guide - Primera Infancia Frontend

**Time to read**: 5 minutos
**Skill level**: Principiante

---

## 1️⃣ Instalar y Ejecutar (5 min)

```bash
# 1. Clonar repositorio
git clone <tu-repo>
cd primeraInfancia-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Editar .env.local con tus valores:
# NEXTAUTH_SECRET=generated-secret (usa: openssl rand -hex 32)
# NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
# NEXTAUTH_URL=http://localhost:3000

# 5. Iniciar servidor
npm run dev

# 6. Abrir en navegador
# http://localhost:3000
```

---

## 2️⃣ Primera Vez: Flujo de Autenticación

```
1. Usuario va a http://localhost:3000
   ↓
2. Ve formulario de login en /auth/iniciar-sesion
   ↓
3. Ingresa email y contraseña
   ↓
4. Sistema valida contra backend
   ↓
5. Si OK → Crea sesión con JWT y redirige a /admin/dashboard
   Si ERROR → Muestra mensaje de error
```

---

## 3️⃣ Puntos Clave a Recordar

### Estructura

```
src/
├── app/           → Rutas y páginas
├── components/    → Componentes reutilizables
├── features/      → Módulos de negocio
└── shared/        → Código compartido
```

### Stack Tech

- **Framework**: Next.js 15+
- **Language**: TypeScript
- **Auth**: NextAuth.js + JWT
- **Forms**: Formik + Yup
- **State**: Zustand
- **UI**: HeroUI + Tailwind CSS
- **API**: React Query

### Rutas Principales

```
/ → Página principal
/auth/iniciar-sesion → Login (no protegido)
/admin/* → Panel administrativo (protegido)
/api/auth/* → Endpoints de NextAuth
```

---

## 4️⃣ Comandos Útiles

```bash
# Desarrollo
npm run dev          # Iniciar servidor local
npm run build        # Compilar para producción
npm run start        # Ejecutar build de producción

# Calidad de código
npm run lint         # Ejecutar ESLint
npm run format       # Formatear con Prettier
npm run type-check   # Verificar tipos TypeScript

# Testing
npm test             # Ejecutar tests
npm test -- --watch  # Tests en modo watch

# Otros
npm run type-check   # Solo verificar tipos
npm audit            # Auditar vulnerabilidades
npm update           # Actualizar dependencias menores
```

---

## 5️⃣ Crear un Nuevo Componente

```typescript
// src/components/MyComponent.tsx
'use client'; // Si usa hooks

import React from 'react';
import { Button } from '@heroui/react';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

/**
 * Descripción del componente
 */
export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  onClick
}) => {
  return (
    <div className="p-4">
      <h1>{title}</h1>
      <Button onClick={onClick}>Click me</Button>
    </div>
  );
};

MyComponent.displayName = 'MyComponent';
```

---

## 6️⃣ Crear un Custom Hook

```typescript
// src/shared/hooks/useMyData.ts
import { useQuery } from '@tanstack/react-query';

/**
 * Obtiene datos del API
 */
export function useMyData(id: string) {
  return useQuery({
    queryKey: ['myData', id],
    queryFn: () => fetch(`/api/data/${id}`).then(r => r.json()),
    enabled: !!id // Solo ejecutar si id existe
  });
}

// Uso en componente
function MyComponent({ id }: { id: string }) {
  const { data, isLoading, error } = useMyData(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

  return <div>{data.name}</div>;
}
```

---

## 7️⃣ Llamar al Backend

```typescript
// Opción 1: Fetch directo
const response = await fetch(`/api/users/123`);
const user = await response.json();

// Opción 2: Con hook (recomendado)
function UserComponent({ userId }: { userId: string }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(r => r.json())
  });

  if (isLoading) return <Spinner />;
  return <div>{user.name}</div>;
}
```

---

## 8️⃣ Variables de Entorno

```env
# .env.local

# Autenticación
NEXTAUTH_SECRET=<generar-con-openssl-rand-hex-32>
NEXTAUTH_URL=http://localhost:3000

# Backend
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Opcional
DATABASE_URL=postgresql://...
```

---

## 9️⃣ Problemas Comunes

### ❌ Error: "NEXTAUTH_SECRET not configured"

```bash
# Generar secret
openssl rand -hex 32

# Copiar a .env.local
NEXTAUTH_SECRET=<resultado>
```

### ❌ Error: "Cannot reach backend"

```bash
# Verificar que:
1. Backend está corriendo: http://localhost:3001
2. NEXT_PUBLIC_BACKEND_URL es correcto en .env.local
3. CORS está habilitado en backend
```

### ❌ Error: "Type 'unknown' is not assignable..."

```typescript
// Agregar tipado correcto
const data = (await response.json()) as MyType;

// O usando interfaz
interface MyData {
  name: string;
  email: string;
}
const data = (await response.json()) as MyData;
```

### ❌ Componente no se actualiza

```typescript
// Problema: No estás usando hooks correctamente
// Solución: Agregar 'use client' si usas hooks
"use client";

import { useState } from "react";
```

---

## 🔟 Recursos Rápidos

| Necesito...         | Consulta...                                                        |
| ------------------- | ------------------------------------------------------------------ |
| Entender estructura | [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)                     |
| Hacer login         | [NEXTJS_AUTHENTICATION.md](./NEXTJS_AUTHENTICATION.md)             |
| Crear componente    | [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md#componentes-react)   |
| Solucionar error    | [MAINTENANCE_TROUBLESHOOTING.md](./MAINTENANCE_TROUBLESHOOTING.md) |
| Subir a producción  | [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md#despliegue)          |

---

## 📝 Checklist: Tu Primer Día

- [ ] Clonar repo e instalar dependencias
- [ ] Configurar .env.local
- [ ] Ejecutar `npm run dev`
- [ ] Acceder a http://localhost:3000
- [ ] Intentar login (credenciales de test)
- [ ] Explorar estructura de carpetas
- [ ] Leer [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- [ ] Crear un componente simple
- [ ] Ejecutar `npm run lint`
- [ ] Ejecutar `npm run type-check`

---

## 🆘 ¿Atrapado?

1. **Busca en la documentación**

   - `Ctrl+F` en [MAINTENANCE_TROUBLESHOOTING.md](./MAINTENANCE_TROUBLESHOOTING.md)

2. **Revisa los logs**

   ```bash
   npm run dev  # Terminal output
   Browser DevTools → Console
   ```

3. **Consulta recursos**
   - [Next.js Docs](https://nextjs.org/docs)
   - [NextAuth.js Docs](https://next-auth.js.org)
   - [React Docs](https://react.dev)

---

## 🎯 Próximos Pasos

Después de completar Quick Start:

1. **Lee documentación completa**

   - [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
   - [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)

2. **Entiende el flujo de auth**

   - [NEXTJS_AUTHENTICATION.md](./NEXTJS_AUTHENTICATION.md)

3. **Aprende patrones del proyecto**

   - Fetch de datos con React Query
   - Formularios con Formik
   - Estado global con Zustand

4. **Crea tu primer feature**
   - Nuevo componente
   - Hook personalizado
   - Integración con API

---

**¡Listo para empezar!** 🎉

Si tienes dudas, consulta la documentación o abre un issue.
