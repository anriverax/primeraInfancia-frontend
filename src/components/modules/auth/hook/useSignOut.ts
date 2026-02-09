import { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import useAxios from "@/shared/hooks/http/useAxios";
import { AUTH_MESSAGES } from "@/shared/constants";

/**
 * Hook for signing out users and terminating their session.
 * @returns Object with sign-out function, loading state, and error state.
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

  /**
   * Destroys backend session and NextAuth session, then redirects to login.
   * @returns Promise with sign-out result and optional error message.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
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
      setError(err instanceof Error ? err.message : AUTH_MESSAGES.LOGOUT_ERROR);
      return {
        ok: false,
        error: err instanceof Error ? err.message : AUTH_MESSAGES.LOGOUT_ERROR
      };
    } finally {
      setIsLoading(false);
    }
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return {
    signOutWithCredentials,
    isLoading,
    error
  };
};

export default useSignOut;
