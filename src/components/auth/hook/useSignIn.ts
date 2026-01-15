import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";

/**
 * Custom hook for user sign-in with NextAuth.
 *
 * Handles credential validation and authentication on the client side
 * using NextAuth's built-in security mechanisms.
 *
 * **Security Benefits:**
 * - Credentials sent directly to NextAuth Credentials provider (server-side)
 * - NextAuth handles CSRF protection automatically
 * - Generic error messages prevent user enumeration attacks
 * - Works seamlessly with NextAuth v4.24+
 * - No sensitive data exposure in client code
 *
 * **What This Hook Does:**
 * - Manages loading and error states during authentication
 * - Calls NextAuth's `signIn("credentials", ...)` function
 * - Returns authentication result without automatic redirect
 * - Allows custom error handling and UI updates
 *
 * **What This Hook Does NOT Do:**
 * - Does NOT encrypt credentials (encryption handled by useSignInForm)
 * - Does NOT redirect on success (parent component handles redirect)
 * - Does NOT manage session (NextAuth handles via cookies)
 *
 * @hook
 *   - `signInWithCredentials`: Async function to authenticate user
 *   - `isLoading`: Boolean indicating if authentication is in progress
 *   - `error`: Error message string or null
 *
 * @example
 * ```tsx
 * const { signInWithCredentials, isLoading, error } = useSignIn();
 *
 * const handleSubmit = async (email, password) => {
 *   const result = await signInWithCredentials(email, password);
 *
 *   if (result.ok) {
 *     // Credentials are valid
 *     // NextAuth automatically sets session cookie
 *     // NextAuth redirects to dashboard (if configured)
 *     console.log('Login successful');
 *   } else {
 *     // Show error message to user
 *     console.error('Login failed:', result.error);
 *   }
 * };
 *
 * return (
 *   <div>
 *     {error && <p className="error">{error}</p>}
 *     <button onClick={() => handleSubmit('user@example.com', 'password')} disabled={isLoading}>
 *       {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
 *     </button>
 *   </div>
 * );
 * ```
 *
 * @throws {Error} Caught internally and returned in result.error
 *
 * @see {@link https://next-auth.js.org/getting-started/example NextAuth.js Docs}
 * @see {@link useSignInForm} - Higher-level hook with Formik integration
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
   * Authenticates a user with email and password using NextAuth.
   *
   * **Process:**
   * 1. Set loading state and clear previous errors
   * 2. Call NextAuth's signIn("credentials", ...) function
   * 3. Credentials provider sends them to backend `/auth/login`
   * 4. Backend validates and returns tokens if valid
   * 5. NextAuth stores tokens in httpOnly cookies
   * 6. Return result to caller
   *
   * **Error Handling:**
   * - Network errors: Caught and displayed to user
   * - Invalid credentials: Backend returns error message
   * - NextAuth errors: Caught and displayed to user
   * - All errors are generic to prevent user enumeration
   *
   * @async
   * @param {string} email - User's email address
   * @param {string} password - User's plain-text password (will be encrypted by Credentials provider)
   * @returns {Promise<{ ok: boolean; error?: string }>} Authentication result:
   *   - `ok: true` - Credentials are valid, session created
   *   - `ok: false, error: string` - Invalid credentials or error occurred
   * @throws {Error} Never throws; errors are caught and returned
   *
   * @example
   * ```typescript
   * const result = await signInWithCredentials('user@example.com', 'password123');
   * if (result.ok) {
   *   console.log('Authentication successful');
   * } else {
   *   console.log('Authentication failed:', result.error);
   * }
   * ```
   */
  const signInWithCredentials = useCallback(
    async (email: string, password: string): Promise<{ ok: boolean; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        // Call NextAuth signIn with credentials provider
        // This sends credentials to the Credentials provider
        // which validates them against the backend
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
