# OEI-PrimeraInfancia

## 🌟 Frontend - Primera Infáncia

Aplicación web construida con NextJS/React.

---

## 📁 Estructura del Proyecto

```
mi-proyecto/
  ├── frontend/   # Aplicación cliente (NExtJS/React)
  └── backend/    # Servidor (NestJS API)
```

---

## 🚀 Cómo empezar

### 🌐 **Frontend**

1. **Instalar dependencias**:

```bash
cd frontend
npm install
# o
yarn install
```

2. **Ejecutar en desarrollo**:

```bash
npm run dev:lint
# o para React puro:
npm start
```

---

## 🛠️ **Tecnologías**

- **Frontend**: NextJS/React ⚛️, Axios 📦, TailwindCSS 💨

---

## 📄 Licencia

Este proyecto está bajo la licencia [Apache 2.0](LICENSE).

La función `getFieldProps` de Formik permite conectar fácilmente los campos de un formulario con el estado y la lógica de Formik.
Devuelve automáticamente las props necesarias (`value`, `onChange`, `onBlur`, etc.) para que el input funcione correctamente con Formik, evitando escribirlas manualmente.

**Ejemplo:**

```tsx
<input {...formik.getFieldProps("email")} />
```

Esto es equivalente a:

```tsx
<input
  name="email"
  value={formik.values.email}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
/>
```

Así, simplificas el código y aseguras que el input esté correctamente conectado al formulario.

---

## 📝 Helpers de campos de formulario personalizados

En este proyecto usamos el hook `useCustomFormFields` para centralizar la configuración visual y de tipo de los campos de formulario.
Esto permite mantener formularios consistentes y evitar repetir lógica o estilos en cada input.

### Ejemplo: `getInputProps`

La función `getInputProps` recibe el tipo y la etiqueta del campo, y devuelve las props necesarias para el input, incluyendo clases CSS y variantes de estilo.

**Uso:**

```tsx
const { getInputProps } = useCustomFormFields();

<Input {...formik.getFieldProps("email")} {...getInputProps("email", "Correo Electrónico")} />;
```

Esto es equivalente a escribir manualmente:

```tsx
<Input
  name="email"
  type="email"
  label="Correo Electrónico"
  variant="bordered"
  classNames={{
    inputWrapper: "border data-[hover=true]:border-blue-500 group-data-[focus=true]:border-blue-500",
    label: "group-data-[filled=true]:font-bold",
    input: "text-gray-600"
  }}
  value={formik.values.email}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
/>
```

### Otros helpers disponibles

- **getDateProps:** Para campos de fecha.
- **getTextAreaProps:** Para campos de texto multilínea.
- **getSelectProps:** Para selects personalizados.

Estos helpers ayudan a mantener la apariencia y comportamiento de los formularios de manera uniforme en toda la aplicación.
