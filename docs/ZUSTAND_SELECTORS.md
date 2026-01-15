# Zustand Selectors - Guía de Uso

## Descripción General

Se han agregado selectors específicos a todos los stores de Zustand para **prevenir re-renders innecesarios**. Los selectors permiten que los componentes suscriban solo a la parte del estado que necesitan, en lugar de a todo el store.

### ¿Por qué usar Selectors?

- **Optimización de rendimiento**: Componentes re-renderean solo cuando su selector específico cambia
- **Claridad de dependencias**: Explícito qué estado consume cada componente
- **Mantenibilidad**: Menos acoplamiento al estado global

---

## Stores Disponibles

### 1. `useAppStateStore`

Gestiona el estado general de la aplicación durante el logout.

#### Estado

```typescript
{
  isSigningOut: boolean; // Indica si está en progreso el logout
}
```

#### Selector Disponible

```typescript
import { useIsSigningOut } from "@/shared/store/useAppStateStore";

// ANTES (suscrije a TODO el store)
const { isSigningOut } = useAppStateStore();

// AHORA (suscrije SOLO a isSigningOut)
const isSigningOut = useIsSigningOut();
```

#### Ejemplo de Uso

```typescript
export function LogoutButton() {
  const isSigningOut = useIsSigningOut();

  return (
    <button disabled={isSigningOut}>
      {isSigningOut ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  );
}
```

---

### 2. `useMenuItemsStore`

Gestiona los items del menú de navegación basados en permisos.

#### Estado

```typescript
{
  menuItems: IMenuPermission[]
  setMenuItems: (items: IMenuPermission[]) => void
}
```

#### Selectors Disponibles

```typescript
import {
  useMenuItems, // Array completo de items
  useMenuItemsCount // Cantidad de items (número)
} from "@/shared/store/useMenuItemsStore";

// ANTES
const { menuItems } = useMenuItemsStore();
const count = menuItems.length;

// AHORA - Solo items
const menuItems = useMenuItems();

// AHORA - Solo contador
const count = useMenuItemsCount();
```

#### Ejemplo de Uso

```typescript
// Componente que solo necesita contar items
export function MenuBadge() {
  const count = useMenuItemsCount();

  return <Badge>{count}</Badge>;
}

// Componente que necesita renderear items
export function SidebarMenu() {
  const menuItems = useMenuItems();

  return (
    <ul>
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
```

---

### 3. `useModalFormVisibleStore`

Controla qué modal/formulario está visible usando un ID numérico.

#### Estado

```typescript
{
  isFormVisible: number  // ID del formulario visible (0 = ninguno)
  setFormVisible: (n: number) => void
  reset: () => void
}
```

#### Selectors Disponibles

```typescript
import {
  useFormVisibleId, // ID del formulario visible
  useIsFormVisible // Verificar si un formulario específico está visible
} from "@/shared/store/useModalFormVisibleStore";

// ANTES
const { isFormVisible } = useModalFormVisibleStore();
const isOpen = isFormVisible === FORM_ID_CREATE_SCHOOL;

// AHORA - Obtener ID
const formVisibleId = useFormVisibleId();

// AHORA - Verificar estado específico
const isOpen = useIsFormVisible(FORM_ID_CREATE_SCHOOL);
```

#### Ejemplo de Uso

```typescript
const FORM_ID_CREATE_SCHOOL = 1;
const FORM_ID_EDIT_SCHOOL = 2;

export function CreateSchoolModal() {
  const isOpen = useIsFormVisible(FORM_ID_CREATE_SCHOOL);
  const { setFormVisible, reset } = useModalFormVisibleStore();

  return (
    <Modal isOpen={isOpen}>
      {/* Contenido del modal */}
    </Modal>
  );
}

// Componente que solo necesita saber cuál está abierto
export function DebugPanel() {
  const visibleFormId = useFormVisibleId();

  return <div>Form visible: {visibleFormId || 'None'}</div>;
}
```

---

### 4. `useTechnicianModeStore`

Store persistido que guarda el modo de trabajo para usuarios técnicos.

#### Estado

```typescript
{
  mode: 'mentor' | 'formador' | null | false
  setMode: (mode: Exclude<TechnicianMode, null>) => void
  reset: () => void
}
```

#### Selectors Disponibles

```typescript
import {
  useTechnicianMode, // Modo actual
  useIsTechnicianModeMentor, // ¿Es mentor?
  useIsTechnicianModeFormador // ¿Es formador?
} from "@/shared/store/useTechnicianModeStore";

// ANTES
const { mode } = useTechnicianModeStore();
const isMentor = mode === "mentor";

// AHORA - Obtener modo
const mode = useTechnicianMode();

// AHORA - Verificar modo específico
const isMentor = useIsTechnicianModeMentor();
const isFormador = useIsTechnicianModeFormador();
```

#### Ejemplo de Uso

```typescript
export function TechnicianModeIndicator() {
  const isMentor = useIsTechnicianModeMentor();

  return (
    <Badge color={isMentor ? "blue" : "purple"}>
      {isMentor ? "🎓 Mentor" : "👨‍🏫 Formador"}
    </Badge>
  );
}

export function TechnicianModeSelector() {
  const { setMode } = useTechnicianModeStore();

  return (
    <Select onChange={(e) => setMode(e.target.value as any)}>
      <option value="mentor">Mentor</option>
      <option value="formador">Formador</option>
    </Select>
  );
}
```

---

### 5. `useUpdatedProfileStore`

Store persistido en sessionStorage para el estado del formulario de perfil.

#### Estado

```typescript
{
  formStatus: {
    isOk: boolean
    msg: string
  }
  setFormStatus: (data: Partial<UpdatedProfileState>) => void
}
```

#### Selectors Disponibles

```typescript
import {
  useProfileFormStatus, // Estado completo { isOk, msg }
  useProfileFormIsOk, // Solo si fue exitoso
  useProfileFormMessage // Solo el mensaje
} from "@/shared/store/useUpdatedProfileStore";

// ANTES
const { formStatus, setFormStatus } = useUpdatedProfileStore();
const { isOk, msg } = formStatus;

// AHORA - Estado completo
const formStatus = useProfileFormStatus();

// AHORA - Solo si fue exitoso
const isOk = useProfileFormIsOk();

// AHORA - Solo el mensaje
const message = useProfileFormMessage();
```

#### Ejemplo de Uso

```typescript
// Componente que solo muestra si fue exitoso
export function SuccessIndicator() {
  const isOk = useProfileFormIsOk();

  return isOk && <CheckIcon />;
}

// Componente que muestra mensaje
export function StatusMessage() {
  const message = useProfileFormMessage();

  return message && <p>{message}</p>;
}

// Componente completo que gestiona estado
export function ProfileUpdateForm() {
  const formStatus = useProfileFormStatus();
  const { setFormStatus } = useUpdatedProfileStore();

  const handleSubmit = async () => {
    try {
      // ... lógica de actualización
      setFormStatus({
        isOk: true,
        msg: "Perfil actualizado correctamente"
      });
    } catch (error) {
      setFormStatus({
        isOk: false,
        msg: "Error al actualizar perfil"
      });
    }
  };

  return (
    <>
      <button onClick={handleSubmit}>Guardar</button>
      {formStatus.msg && (
        <Alert type={formStatus.isOk ? "success" : "error"}>
          {formStatus.msg}
        </Alert>
      )}
    </>
  );
}
```

---

## Patrón de Migración

Si encuentras código usando los stores antiguamente:

### Antes (suscribir a todo el store)

```typescript
const { isFormVisible, setFormVisible } = useModalFormVisibleStore();

// Re-renderea cuando cambien isFormVisible OR setFormVisible (aunque setFormVisible nunca cambia)
```

### Después (suscribir a partes específicas)

```typescript
// Opción 1: Solo leer el estado
const isFormVisible = useFormVisibleId();

// Opción 2: Leer y escribir
const isFormVisible = useFormVisibleId();
const { setFormVisible } = useModalFormVisibleStore.getState();
// O si necesitas setter reactivo
const { setFormVisible } = useModalFormVisibleStore((state) => ({
  setFormVisible: state.setFormVisible
}));

// Opción 3: Verificar si un formulario específico está visible
const isOpen = useIsFormVisible(FORM_ID);
```

---

## Performance Tips

### ✅ Bien

```typescript
// Componente que renderea solo cuando isOpen cambia
function Modal() {
  const isOpen = useIsFormVisible(FORM_ID);
  return isOpen ? <Content /> : null;
}
```

### ❌ Evitar

```typescript
// Componente que renderea cuando CUALQUIER cosa en el store cambia
function Modal() {
  const { isFormVisible, setFormVisible } = useModalFormVisibleStore();
  const isOpen = isFormVisible === FORM_ID;
  return isOpen ? <Content /> : null;
}
```

---

## Testing

Los selectors se pueden testear igual que los hooks normales:

```typescript
import { renderHook, act } from "@testing-library/react";
import { useIsFormVisible, useModalFormVisibleStore } from "@/shared/store/useModalFormVisibleStore";

test("useIsFormVisible retorna true cuando el formulario está visible", () => {
  const { result } = renderHook(() => useIsFormVisible(FORM_ID));

  act(() => {
    useModalFormVisibleStore.getState().setFormVisible(FORM_ID);
  });

  expect(result.current).toBe(true);
});
```

---

## Resumen de Selectors por Store

| Store                      | Selectors                                                                             | Propósito                        |
| -------------------------- | ------------------------------------------------------------------------------------- | -------------------------------- |
| `useAppStateStore`         | `useIsSigningOut()`                                                                   | Saber si está logout en progreso |
| `useMenuItemsStore`        | `useMenuItems()`, `useMenuItemsCount()`                                               | Items del menú y su cantidad     |
| `useModalFormVisibleStore` | `useFormVisibleId()`, `useIsFormVisible(id)`                                          | Qué modal está visible           |
| `useTechnicianModeStore`   | `useTechnicianMode()`, `useIsTechnicianModeMentor()`, `useIsTechnicianModeFormador()` | Modo de usuario técnico          |
| `useUpdatedProfileStore`   | `useProfileFormStatus()`, `useProfileFormIsOk()`, `useProfileFormMessage()`           | Estado del formulario de perfil  |
