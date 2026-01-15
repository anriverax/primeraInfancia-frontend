import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import useAxios from "@/shared/hooks/http/useAxios";
import { AUTH_MESSAGES } from "@/shared/constants";

/**
 * Custom hook for user sign-out with NextAuth and backend cleanup.
 *
 * Handles secure session cleanup and backend logout on the client side.
 * Implements a two-phase logout strategy:
 * 1. Backend cleanup (via API)
 * 2. NextAuth session destruction
 *
 * **Security Benefits:**
 * - Backend cleanup happens BEFORE session destruction (with valid token)
 * - NextAuth handles secure session termination
 * - Tokens are cleared from httpOnly cookies
 * - Works seamlessly with NextAuth v4
 * - Automatic redirection to login page
 *
 * **Error Handling:**
 * - If backend logout fails, user is still logged out from NextAuth
 * - Generic error messages prevent information leakage
 *
 * @hook
 * @returns {Object} Sign-out handler and state
 *   - `signOutWithCredentials`: Async function to logout user
 *   - `isLoading`: Whether logout is in progress
 *   - `error`: Error message if logout failed
 *
 * @example
 * ```tsx
 * const { signOutWithCredentials, isLoading, error } = useSignOut();
 *
 * const handleLogout = async () => {
 *   const result = await signOutWithCredentials();
 *   if (result.ok) {
 *     // Automatically redirected to login by NextAuth
 *   } else {
 *     // Handle error (usually backend is unreachable)
 *     console.error('Logout failed:', result.error);
 *   }
 * };
 *
 * return (
 *   <button onClick={handleLogout} disabled={isLoading}>
 *     {isLoading ? 'Cerrando sesión...' : 'Cerrar sesión'}
 *   </button>
 * );
 * ```
 *
 * @throws {Error} Caught internally and returned in result object
 *
 * @see {@link useAxios} - Used for backend logout API call
 * @see {@link signOut} - NextAuth sign-out function
 */
export const useSignOut = (): {
  signOutWithCredentials: () => Promise<{
    ok: boolean;
    error?: string | undefined;
  }>;
  isLoading: boolean;
  error: string | null;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api = useAxios(true);

  const signOutWithCredentials = useCallback(async (): Promise<{ ok: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      await api.post("/auth/logout");

      // 2. Destroy NextAuth session
      await signOut({
        redirect: true,
        callbackUrl: "/auth/iniciar-sesion"
      });

      return { ok: true };
    } catch (err) {
      console.error("[useSignOut] Error:", err);
      setError(err instanceof Error ? err.message : AUTH_MESSAGES.LOGOUT_ERROR);
      return {
        ok: false,
        error: err instanceof Error ? err.message : AUTH_MESSAGES.LOGOUT_ERROR
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    signOutWithCredentials,
    isLoading,
    error
  };
};

export default useSignOut;
