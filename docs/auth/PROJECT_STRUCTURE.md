# Estructura del Proyecto - Primera Infancia Frontend

## Arquitectura General

```
primeraInfancia-frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   ├── components/                   # Componentes reutilizables
│   ├── features/                     # Módulos funcionales
│   ├── shared/                       # Código compartido
│   └── middleware.ts                 # Middleware de Next.js
├── public/                           # Archivos estáticos
├── docs/                             # Documentación
└── [config files]
```

---

## Estructura Detallada

### 📂 `src/app/` - Rutas y Layouts

```
app/
├── layout.tsx              # Layout raíz
├── page.tsx                # Página principal
├── globals.css             # Estilos globales
├── provider.tsx            # Providers globales
├── middleware.ts           # Middleware de autenticación
├── withProtectedRoute.tsx  # HOC para rutas protegidas
│
├── auth/                   # Módulo de autenticación
│   ├── layout.tsx          # Layout de auth
│   ├── infrastructure/
│   │   └── nextAuth.ts     # Configuración NextAuth
│   └── iniciar-sesion/
│       └── page.tsx        # Página de login
│
├── api/                    # API Routes
│   └── auth/
│       ├── [...nextauth]/
│       │   └── route.ts    # Handler NextAuth
│       └── refresh/
│           └── route.ts    # Refresh token endpoint
│
├── admin/                  # Módulo administrativo
│   ├── layout.tsx
│   ├── asistencia/         # Gestión de asistencia
│   ├── calificaciones/     # Gestión de calificaciones
│   ├── catalogo/           # Catálogos (zonas, módulos, etc.)
│   ├── centros-escolares/  # Centros educativos
│   ├── dashboard/          # Dashboard administrativo
│   └── grupos/             # Gestión de grupos
```

**Responsabilidad**: Manejo de rutas, layouts, páginas y API endpoints.

---

### 📂 `src/components/` - Componentes UI

```
components/
├── auth/                   # Componentes de autenticación
│   ├── AuthToastProvider.ts
│   ├── signInForm.tsx
│   ├── signInValidation.ts
│   ├── type.ts
│   └── hook/
│       ├── useSignIn.ts
│       ├── useSignInForm.ts
│       └── useSignOut.ts
│
└── attendance/             # Componentes de asistencia
    ├── attendance.type.ts
    ├── attendanceForm.tsx
    ├── attendanceValidation.ts
    └── hook/
```

**Responsabilidad**: Componentes UI reusables, validaciones y hooks locales.

---

### 📂 `src/features/` - Módulos Funcionales

La aplicación está organizada en features (módulos de negocio):

```
features/
├── admin/                  # Funcionalidades administrativas
│   ├── adminType.ts
│   ├── modalValidation.ts
│   ├── components/
│   └── hooks/
│
├── attendance/             # Gestión de asistencia
│   ├── components/
│   ├── hook/
│   ├── leader/
│   ├── mentor/
│   └── ...
│
├── catalogue/              # Catálogos (datos maestros)
│   ├── learningPath/
│   ├── school/
│   ├── trainingModule/
│   └── zone/
│
├── dashboard/              # Dashboard
│   ├── dashboardType.ts
│   ├── components/
│   └── hook/
│
├── group/                  # Gestión de grupos
│   ├── groupType.ts
│   ├── components/
│   └── hooks/
│
├── mentoring/              # Sistema de mentoría
│   ├── mentoringType.ts
│   ├── appendix1/
│   ├── appendix2/
│   ├── appendix3/
│   ├── component/
│   ├── global/
│   ├── hooks/
│   ├── trainer/
│   └── validations/
│
└── schools/                # Gestión de escuelas
    ├── district/
    ├── hooks/
    ├── principalSchool/
    └── school/
```

**Responsabilidad**: Lógica de negocio, validaciones específicas del dominio y componentes feature-specifics.

---

### 📂 `src/shared/` - Código Compartido

```
shared/
├── appendixData.ts         # Datos anexos/referencias
├── constants.ts            # Constantes de la aplicación
│
├── hooks/                  # Hooks reutilizables
│   ├── data/               # Hooks para data fetching
│   ├── form/               # Hooks para manejo de formularios
│   ├── http/               # Hooks HTTP y API calls
│   ├── responsive/         # Hooks responsive design
│   └── ui/                 # Hooks para UI interactivo
│
├── store/                  # Zustand stores (estado global)
│   ├── useAppStateStore.ts
│   ├── useMenuItemsStore.ts
│   ├── useModalFormVisibleStore.ts
│   ├── useTechnicianModeStore.ts
│   └── useUpdatedProfileStore.ts
│
├── types/                  # Tipos y interfaces globales
│   ├── customFormFields.ts
│   ├── globals.ts
│   ├── next-auth.d.ts
│   ├── pagination.ts
│   └── regex-validation.ts
│
├── ui/                     # Componentes UI base
│   ├── loadingSkeleton.tsx
│   ├── logo.tsx
│   ├── pageTitle.tsx
│   ├── underConstruction.tsx
│   ├── custom/
│   ├── modal/
│   ├── motionPrimitive/
│   ├── sidebar/
│   └── topbar/
│
└── utils/                  # Funciones utilitarias
    ├── accessControl.ts    # Control de acceso
    ├── functions.ts        # Funciones generales
    ├── reactQueryClient.ts # Configuración React Query
    ├── ssrAuth.ts          # Autenticación SSR
    └── tv.ts               # Tailwind Variants
```

**Responsabilidad**: Código reutilizable, estado global, tipos e interfases.

---

## Patrones Arquitectónicos

### 1. **State Management con Zustand**

- Stores separados por dominio (app, menu, modal, perfil, técnico)
- Acceso simplificado sin boilerplate Redux
- Persistencia opcional

### 2. **Component Organization**

```
feature/
├── components/    # UI components específicos
├── hooks/        # Custom hooks del feature
├── types.ts      # Tipos del dominio
└── validations/  # Validaciones del negocio
```

### 3. **Data Fetching**

- React Query para caching y sincronización
- Custom hooks en `shared/hooks/http`
- SSR-safe authentication utilities

### 4. **Form Management**

- Formik + Yup para validación
- Custom field components con HeroUI
- Tipos validados en TypeScript

### 5. **Styling**

- Tailwind CSS para utilidades
- Tailwind Variants (`tv.ts`) para componentes
- HeroUI para componentes base

### 6. **Protected Routes**

- HOC `withProtectedRoute` para rutas privadas
- Middleware NextAuth para protección
- Access control basado en roles

---

## Tecnologías Principales

| Capa              | Tecnología    | Propósito                |
| ----------------- | ------------- | ------------------------ |
| **Runtime**       | Next.js 15+   | Framework React + SSR    |
| **Lenguaje**      | TypeScript    | Type safety              |
| **Autenticación** | NextAuth.js   | JWT + credenciales       |
| **Formularios**   | Formik + Yup  | Validación y estado      |
| **Estado Global** | Zustand       | State management         |
| **Data Fetching** | React Query   | Caching y sincronización |
| **UI Components** | HeroUI        | Componentes accesibles   |
| **Estilos**       | Tailwind CSS  | Utilidades CSS           |
| **Animaciones**   | Framer Motion | Animaciones suave        |

---

## Flujo de Datos

```
┌─────────────────────────────────────────────┐
│ Página (app/admin/*/page.tsx)              │
└────────────┬────────────────────────────────┘
             │ Usa
             ▼
┌─────────────────────────────────────────────┐
│ Feature Components (features/*/components) │
└────────────┬────────────────────────────────┘
             │ Usa
             ▼
┌─────────────────────────────────────────────┐
│ Custom Hooks (features/*/hooks)            │
│ + Shared Hooks (shared/hooks)              │
└────────────┬────────────────────────────────┘
             │ Accede a
             ▼
┌─────────────────────────────────────────────┐
│ Zustand Stores (shared/store)              │
│ React Query Cache                          │
└────────────┬────────────────────────────────┘
             │ Llama a
             ▼
┌─────────────────────────────────────────────┐
│ API Backend                                │
│ (via shared/hooks/http)                    │
└─────────────────────────────────────────────┘
```

---

## Convenciones de Código

### Nomenclatura

- **Componentes**: PascalCase (`UserForm.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useSignIn.ts`)
- **Tipos**: PascalCase con prefijo `I` o `T` (`ISignIn`, `TUser`)
- **Funciones utilitarias**: camelCase (`getAccessControl.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`DEFAULT_PAGE_SIZE`)

### Organización de Archivos

- Un componente/hook por archivo (excepto tipos y constantes)
- Índices opcionales para re-export público
- Tipos colocados junto al código que los usa

### Importaciones

```typescript
// 1. Dependencias externas
import React, { useState } from "react";

// 2. Dependencias de Next.js
import { useRouter } from "next/navigation";

// 3. Imports absolutos (@)
import { useAppStateStore } from "@/shared/store";

// 4. Imports relativos
import { MyComponent } from "./MyComponent";
```

---

## Puntos de Entrada

| Ruta                   | Propósito            | Protegida |
| ---------------------- | -------------------- | --------- |
| `/`                    | Página principal     | No        |
| `/auth/iniciar-sesion` | Login                | No        |
| `/admin/*`             | Panel administrativo | Sí        |
| `/api/auth/*`          | Endpoints NextAuth   | No        |
| `/api/auth/refresh`    | Refresh tokens       | Sí        |

---

## Consideraciones Importantes

### Performance

- Componentes memoizados cuando es necesario
- Code splitting automático en rutas
- Optimización de imágenes
- Lazy loading de componentes pesados

### SEO

- Metadata dinámica en layouts
- Open Graph tags
- Schema markup

### Accesibilidad

- Componentes HeroUI con ARIA completo
- Navegación por teclado
- Contraste de colores adecuado

### Testing (sugerido)

- Unit tests: componentes y hooks
- Integration tests: flujos de usuario
- E2E tests: autenticación y módulos clave
