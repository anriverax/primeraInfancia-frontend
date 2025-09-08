// components/WithProtectedRoute.tsx
"use client";

import { FC, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

/**
 * Higher-Order Component (HOC) to protect paths in Client Components.
 * Redirects the user to the login page if not authenticated.
 *
 * @param WrappedComponent The component to protect.
 * @returns A new component with path protection logic.
 */
const WithProtectedRoute = <P extends object>(WrappedComponent: React.ComponentType<P>): FC<P> => {
  const ProtectedRoute: React.FC<P> = (props) => {
    const {
      data: session,
      status,
      update
    } = useSession({
      // required: true is a concise way to handle the redirection
      // if the session is not authenticated.
      required: true,
      onUnauthenticated() {
        // Redirect the user to the login page
        // The redirect URL must be absolute or relative to the base of your domain.
        redirect("/auth/iniciar-sesion"); // Cambiado a iniciar-sesion según tu pages.signIn
      }
    });

    // Optional: Refresh the session when the tab becomes visible.
    // This ensures that the session is up to date if the user switches tabs and returns.
    /*
    useEffect(() => {
      const visibilityHandler = (): void => {
        if (document.visibilityState === "visible") {
          // Only updates if we are not in "loading" status to avoid redundant calls.
          if (status !== "loading") {
            update();
          }
        }
      };
      window.addEventListener("visibilitychange", visibilityHandler, false);
      return (): void => window.removeEventListener("visibilitychange", visibilityHandler, false);
    }, [update, status]);*/ // Añadir status como dependencia para evitar llamadas innecesarias

    // --- Handling of loading and unauthenticated state ---
    // If the session is loading, we can display a fallback UI.
    if (status === "loading") {
      // If a loadingFallback is provided, we render it.
      // Otherwise, we render nothing (or a default spinner).
      return null;
    }

    // If the status is “unauthenticated”, `onUnauthenticated` has already been triggered.
    // y redirigirá al usuario. Por lo tanto, `session` nunca será null aquí si `required: true` funciona.
    // En caso de que haya un mínimo delay, `null` es un fallback seguro.
    if (!session) {
      return null;
    }

    // If we get here, the status is “authenticated” and we are logged in.
    // We pass the session and the update function as props if the wrapped component needs them.
    return (
      <div className="fade-in">
        <WrappedComponent {...props} session={session} update={update} />
      </div>
    );
  };

  // Assigning a displayName is a good practice for debugging in React DevTools.
  ProtectedRoute.displayName = `WithProtectedRoute(${getDisplayName(WrappedComponent)})`;

  return ProtectedRoute;
};

// Auxiliary function to obtain the displayName of the component
/* eslint-disable @typescript-eslint/no-explicit-any */
function getDisplayName(WrappedComponent: React.ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default WithProtectedRoute;
