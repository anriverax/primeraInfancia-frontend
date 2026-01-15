import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

/**
 * Custom hook for user sign-in with NextAuth.
 * Handles credential validation and authentication on the client side.
 *
 * **Security Benefits:**
 * - Credentials are sent directly to NextAuth server
 * - NextAuth handles encryption and CSRF protection
 * - Generic error messages prevent user enumeration
 * - Works seamlessly with NextAuth v4
 *
 * @returns {Object} Sign-in handler and state
 * - `signInWithCredentials`: Async function to authenticate user
 *
 * @example
 * ```tsx
 * const { signInWithCredentials } = useSignIn();
 *
 * const handleSubmit = async (email, password) => {
 *   const result = await signInWithCredentials(email, password);
 *   if (result.ok) {
 *     // Redirect handled by NextAuth
 *   }
 * };
 * ```
 */
export const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithCredentials = useCallback(
    async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        // Call NextAuth signIn with credentials provider
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false
        });

        // Handle authentication result
        if (!result || result.error) {
          const errorMsg = result?.error || "Credenciales inválidas";
          setError(errorMsg);
          return {
            ok: false,
            error: errorMsg
          };
        }

        // Successful authentication

        return { ok: true };
      } catch (err) {
        const errorMsg = "Error durante la autenticación. Por favor intenta de nuevo.";
        console.error("[useSignIn] Error:", err);
        setError(errorMsg);
        return {
          ok: false,
          error: errorMsg
        };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    signInWithCredentials,
    isLoading,
    error
  };
};

export default useSignIn;
