import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

/** NextAuth configuration with JWT strategy, credentials provider, and token management. */
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
       * Validates user credentials against backend authentication endpoint.
       * @param credentials - User email and password from form.
       * @returns User object with tokens if valid, throws error if invalid.
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
     * Updates JWT token with user data and session information.
     * @param token - JWT token to update.
     * @param user - User object from authorization.
     * @param session - Session object (for re-validation).
     * @returns Updated JWT token with auth data.
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
     * Updates session object with token data for client-side access.
     * @param session - Session object to update.
     * @param token - JWT token containing user and auth data.
     * @returns Updated session with user and permission data.
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
