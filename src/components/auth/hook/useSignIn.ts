import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

/**
 * Hook for authenticating users with email and password credentials.
 * @returns Object with sign-in function, loading state, and error state.
 */
export const useSignIn = (): {
  signInWithCredentials: (
    email: string,
    password: string
  ) => Promise<{
    ok: boolean;
    error?: string | undefined;
  }>;
  isLoading: boolean;
  error: string | null;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Authenticates user with encrypted credentials.
   * @param email - Encrypted user email.
   * @param password - Encrypted user password.
   * @returns Promise with authentication result and optional error message.
   */
  const signInWithCredentials = useCallback(
    async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false // Don't auto-redirect; let caller handle it
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

        // Successful authentication - NextAuth now has session cookie
        return { ok: true };
      } catch (err) {
        const errorMsg = "Error durante la autenticación. Por favor intenta de nuevo.";
        if (process.env.NEXT_PUBLIC_NODE_ENV_ENV === "development") {
          console.error("[useSignIn] Error:", err);
        }
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
