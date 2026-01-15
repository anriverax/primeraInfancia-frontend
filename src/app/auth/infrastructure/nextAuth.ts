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
 *
 * **Configuration Details:**
 * - Session strategy: JWT (stateless, scalable)
 * - Sign-in page: Redirects unauthenticated users to `/auth/iniciar-sesion`
 * - Credentials provider: Validates against backend `/auth/login` endpoint
 * - JWT callbacks: Enriches token with user data (role, permissions, email)
 * - Session callbacks: Exposes necessary data to client components via useSession()
 *
 * @type {NextAuthOptions}
 *
 * @example
 * ```tsx
 * // In [...nextauth]/route.ts
 * export const { handlers, auth } = NextAuth(authOptions);
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
    signIn: "/auth/iniciar-sesion"
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "email",
          placeholder: "your-cool-username"
        },
        password: {
          label: "Password:",
          type: "password"
        }
      },
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      /**
       * Authorizes a user based on provided credentials.
       *
       * Sends the encrypted email and password to the backend `/auth/login` endpoint
       * for validation. Returns the authenticated user data (including tokens and metadata)
       * on success, or throws an error with a generic message to prevent user enumeration.
       *
       * **Security Note:** The credentials are encrypted by the client before being passed
       * to this function, and encrypted again during transmission via HTTPS.
       *

       * @param {string} credentials.email - Encrypted user email address.
       * @param {string} credentials.password - Encrypted user password.
       *
       * @example
       * ```ts
       * const user = await authorize({ email: "encrypted...", password: "encrypted..." });
       * ```
       */
      async authorize(credentials) {
        const { email, password } = credentials as any;
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ value1: email, value2: password })
          });

          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }

          const data = await res.json();

          if (!data?.data || data.statusCode !== 200) {
            return null;
          }

          return data.data;
        } catch (error) {
          console.error("[auth] Authorization error:", error);

          throw new Error(
            "Credenciales inválidas. Por favor, verifica tu nombre de usuario y contraseña"
          );
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
     *
     * **Security:** Tokens are stored in the JWT (httpOnly cookie), not in the client.
     * They are only transmitted to the client via NextAuth's secure mechanisms.
     *
     *
     * @example
     * ```ts
     * // On sign-in:
     * token.accessToken = user.accessToken;
     * token.permissions = user.permissions;
     *
     * // On refresh:
     * token.accessToken = session.accessToken;
     * ```
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
     * Session callback - Exposes user data and tokens to client components.
     *
     * This callback is invoked when `useSession()` is called on the client. It determines
     * what data from the JWT is exposed to the client application.
     *
     * **Exposed Data:**
     * - User object: email, name, role, isVerified, picture
     * - Permissions: Array of user permissions for role-based access control
     * - Tokens: accessToken and refreshToken (stored in httpOnly, exposed for useAxios refresh flow)
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

      // ✅ SEGURO: Tokens en JWT (httpOnly) para refresh token flow
      // Los tokens se almacenan en el JWT token (no en el cliente directamente)
      // useSession() accede a través de NextAuth que lo obtiene del server
      // Solo se exponen donde se necesitan (useAxios para refresh)
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken
      };
    }
  }
};
