// components/WithProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

interface WithProtectedRouteProps {
  // Puedes añadir cualquier prop específica que tu HOC necesite
  // Por ejemplo, un fallback UI mientras carga la sesión
  loadingFallback?: React.ReactNode;
}

/**
 * Higher-Order Component (HOC) para proteger rutas en Client Components.
 * Redirige al usuario a la página de inicio de sesión si no está autenticado.
 *
 * @param WrappedComponent El componente a proteger.
 * @returns Un nuevo componente con lógica de protección de ruta.
 */
const WithProtectedRoute = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const ProtectedRoute: React.FC<P & WithProtectedRouteProps> = (props) => {
    const {
      data: session,
      status,
      update
    } = useSession({
      // required: true es una forma concisa de manejar la redirección
      // si la sesión no está autenticada.
      required: true,
      onUnauthenticated() {
        // Redirige al usuario a la página de inicio de sesión
        // La URL de redirección debe ser absoluta o relativa a la base de tu dominio.
        redirect("/auth/iniciar-sesion"); // Cambiado a iniciar-sesion según tu pages.signIn
      }
    });

    // Opcional: Refrescar la sesión cuando la pestaña se vuelve visible.
    // Esto asegura que la sesión esté actualizada si el usuario cambia de pestaña y regresa.
    useEffect(() => {
      const visibilityHandler = () => {
        if (document.visibilityState === "visible") {
          // Solo actualiza si no estamos en estado "loading" para evitar llamadas redundantes
          if (status !== "loading") {
            update();
          }
        }
      };
      window.addEventListener("visibilitychange", visibilityHandler, false);
      return () => window.removeEventListener("visibilitychange", visibilityHandler, false);
    }, [update, status]); // Añadir status como dependencia para evitar llamadas innecesarias

    // --- Manejo del estado de carga y no autenticado ---
    // Si la sesión está cargando, podemos mostrar un fallback UI.
    if (status === "loading") {
      // Si se proporciona un loadingFallback, lo renderizamos.
      // De lo contrario, no renderizamos nada (o un spinner por defecto).
      return props.loadingFallback || <div>Cargando contenido protegido...</div>;
    }

    // Si el status es "unauthenticated", `onUnauthenticated` ya se habrá disparado
    // y redirigirá al usuario. Por lo tanto, `session` nunca será null aquí si `required: true` funciona.
    // En caso de que haya un mínimo delay, `null` es un fallback seguro.
    if (!session) {
      return null;
    }

    // Si llegamos aquí, el status es "authenticated" y tenemos la sesión.
    // Pasamos la sesión y la función update como props si el componente envuelto las necesita.
    return <WrappedComponent {...props} session={session} update={update} />;
  };

  // Asignar un displayName es una buena práctica para la depuración en React DevTools
  ProtectedRoute.displayName = `WithProtectedRoute(${getDisplayName(WrappedComponent)})`;

  return ProtectedRoute;
};

// Función auxiliar para obtener el displayName del componente
function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default WithProtectedRoute;
