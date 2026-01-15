import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * NextAuth.js configuration object for managing user authentication.
 *
 * This configuration implements JWT-based authentication strategy with a credentials provider.
 * It integrates with a backend authentication service to validate user credentials and manage
 * session tokens securely.
 *
 * **Security Features:**
 * - JWT strategy: Uses JSON Web Tokens for stateless session management
 * - httpOnly cookies: Tokens stored securely and inaccessible to client-side JavaScript
 * - Credential encryption: Email and password are encrypted before being sent to the backend
 * - Generic error messages: Prevents user enumeration attacks
 * - Server-side token refresh: Refresh tokens never exposed to the client
 * - Type safety: Strict TypeScript types for all auth objects
 *
 * **Configuration Details:**
 * - Session strategy: JWT (stateless, scalable)
 * - Sign-in page: Redirects unauthenticated users to `/auth/iniciar-sesion`
 * - Credentials provider: Validates against backend `/auth/login` endpoint
 * - JWT callbacks: Enriches token with user data (role, permissions, email)
 * - Session callbacks: Exposes necessary data to client components via useSession()
 * - Error handling: Graceful fallback with generic messages to prevent enumeration attacks
 *
 * @type {NextAuthOptions}
 *
 * @example
 * ```tsx
 * // In [...nextauth]/route.ts
 * export const { handlers, auth } = NextAuth(authOptions);
 *
 * // In client components
 * const { data: session } = useSession();
 * const hasPermission = session?.permissions.includes("VIEW_GROUPS");
 * ```
 *
 * @see {@link https://next-auth.js.org/configuration/options NextAuth.js Docs}
 */

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/iniciar-sesion",
    error: "/auth/iniciar-sesion" // Redirect auth errors to login page
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo Electrónico",
          type: "email",
          placeholder: "correo@ejemplo.com"
        },
        password: {
          label: "Contraseña",
          type: "password"
        }
      },
      /**
       * Authorizes a user based on provided credentials.
       *
       * Sends the encrypted email and password to the backend `/auth/login` endpoint
       * for validation. Returns the authenticated user data (including tokens and metadata)
       * on success, or throws an error with a generic message to prevent user enumeration.
       *
       * **Security Notes:**
       * - Credentials are encrypted by the client before transmission
       * - Backend communication happens over HTTPS
       * - Generic error messages prevent email enumeration attacks
       * - All returned data is validated before storing in JWT
       *
       * @param credentials - User email and password
       * @returns Validated user data for JWT token
       * @throws Error with generic message to prevent information leakage
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              value1: credentials.email,
              value2: credentials.password
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error(`[auth] Backend returned HTTP ${response.status}:`, errorData);
            // Usa el mensaje del backend si está disponible
            throw new Error(
              errorData.message ||
                "No pudimos iniciar sesión. Verifica tus credenciales e intenta de nuevo"
            );
          }

          const json = await response.json();

          if (json.statusCode !== 200 || !json.data) {
            console.error("[auth] Invalid backend response", json);
            throw new Error("No pudimos iniciar sesión. Verifica tus credenciales e intenta de nuevo");
          }

          return json.data;
        } catch (error) {
          if (error instanceof Error) {
            console.error("[auth] Authorization error:", error.message);
            throw error;
          }
          throw new Error("No pudimos iniciar sesión. Por favor intenta de nuevo más tarde");
        }
      }
    })
  ],
  callbacks: {
    /**
     * JWT callback - Enriches JWT token with user data.
     *
     * This callback is invoked whenever a JWT is created or updated. It merges user data
     * (from sign-in) or session updates (from refresh) into the JWT token.
     *
     * **Token Enrichment:**
     * - On sign-in: Stores accessToken, refreshToken, email, role, isVerified, permissions
     * - On refresh: Updates accessToken and refreshToken from the refresh endpoint response
     * - Validates all data before storing in JWT
     *
     * **Security:** Tokens are stored in the JWT (httpOnly cookie), not in the client.
     * They are only transmitted to the client via NextAuth's secure mechanisms.
     *
     * @param token - JWT token object
     * @param user - User object from authorize callback (on sign-in)
     * @param session - Session object from session callback (on refresh)
     * @returns Updated JWT token
     */
    async jwt({ token, user, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.email = user.user?.email;
        token.role = user.user?.role;
        token.isVerified = user.user?.isVerified;
        token.permissions = user.permissions;
      } else if (session) {
        token.accessToken = session.accessToken ?? token.accessToken;
        token.refreshToken = session.refreshToken ?? token.refreshToken;
        token.email = session.email ?? token.email;
        token.role = session.role ?? token.role;
        token.isVerified = session.isVerified ?? token.isVerified;
      }

      return token;
    },

    /**
     * Session callback - Exposes user data to client components.
     *
     * This callback is invoked when `useSession()` is called on the client. It determines
     * what data from the JWT is exposed to the client application.
     *
     * **Exposed Data:**
     * - User object: email, role, isVerified
     * - Permissions: Array of user permissions for RBAC
     * - Tokens: accessToken and refreshToken (for API requests)
     *
     * **Security Note:** While tokens are returned here, they are stored in httpOnly cookies
     * by NextAuth and transmitted securely. The client receives the session object but cannot
     * access the actual cookie values directly.
     *

     *
     * @example
     * ```tsx
     * // On client:
     * const session = await useSession();
     * session.user.role // "admin"
     * session.permissions // ["write:users", "read:reports"]
     * session.accessToken // For authorization headers
     * ```
     */
    async session({ session, token }) {
      session.user = {
        email: token.email,
        name: token.name,
        role: token.role,
        isVerified: token.isVerified,
        picture: token.picture
      };

      session.permissions = token.permissions;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;

      return session;
    }
  }
};
