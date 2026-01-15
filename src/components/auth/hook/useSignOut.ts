import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import useAxios from "@/shared/hooks/http/useAxios";

/**
 * Custom hook for user sign-out with NextAuth.
 * Handles session cleanup and backend logout on the client side.
 *
 * **Security Benefits:**
 * - Backend cleanup happens before session destruction (with token)
 * - NextAuth handles secure session termination
 * - Works seamlessly with NextAuth v4
 * - Automatic redirection to login page
 *
 * @returns {Object} Sign-out handler and state
 * - `signOutWithCredentials`: Async function to logout user
 *
 * @example
 * ```tsx
 * const { signOutWithCredentials  } = useSignOut();
 *
 * const handleLogout = async () => {
 *   const result = await signOutWithCredentials();
 *   if (result.ok) {
 *     // Redirection handled automatically
 *   }
 * };
 * ```
 */
export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api = useAxios(true);

  const signOutWithCredentials = useCallback(async (): Promise<{ ok: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Backend cleanup (with token via useAxios)
      try {
        await api.post("/auth/logout");
      } catch (signOutErr) {
        const errorMsg = "Error al cerrar sesión. Por favor intenta de nuevo.";
        console.error("[useSignOut] Error:", signOutErr);
        setError(errorMsg);
      } finally {
        setIsLoading(false);
      }

      // 2. Destroy NextAuth session
      await signOut({
        redirect: true,
        callbackUrl: "/auth/iniciar-sesion"
      });

      return { ok: true };
    } catch (err) {
      const errorMsg = "Error al cerrar sesión. Por favor intenta de nuevo.";
      console.error("[useSignOut] Error:", err);

      return {
        ok: false,
        error: errorMsg
      };
    }
  }, []);

  return {
    signOutWithCredentials,
    isLoading,
    error
  };
};

export default useSignOut;
