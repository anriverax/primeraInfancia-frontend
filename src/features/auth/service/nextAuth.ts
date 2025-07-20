import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { cookies } from "next/headers";

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
      async authorize(credentials) {
        const { email, password } = credentials as any;

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ value1: email, value2: password })
        });

        const data = await res.json();

        if (data.statusCode != 200) throw new Error(data.message);
        console.log(data.data);
        return data.data;
      }
    })
  ],
  callbacks: {
    async signIn() {
      const cookieStore = await cookies();

      cookieStore.set({
        name: "isAuth",
        value: "true", // Mejor usar un token seguro
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Solo por HTTPS en producción
        sameSite: "strict", // O "lax"
        path: "/",
        maxAge: 60 * 60 * 24 // 1 día, por ejemplo
      });
      return true;
    },
    async jwt({ token, user, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.email = user.user?.email;
        token.name = user.user?.name;
        token.role = user.user?.role;
        token.isVerified = user.user?.isVerified;
        token.picture = user.user?.picture;
        token.permissions = user.permissions;
      } else if (session) {
        token.accessToken = session.accessToken ?? token.accessToken;
        token.refreshToken = session.refreshToken ?? token.refreshToken;
        token.email = session.email ?? token.email;
        token.name = session.name ?? token.name;
        token.role = session.role ?? token.role;
        token.isVerified = session.isVerified ?? token.isVerified;
        token.picture = session.picture ?? token.picture;
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        email: token.email,
        name: token.name,
        role: token.role,
        isVerified: token.isVerified,
        picture: token.picture
      };

      session.permissions = token.permissions;

      return { ...session, accessToken: token.accessToken, refreshToken: token.refreshToken };
    },
    async redirect({ url, baseUrl }): Promise<string> {
      const cookieStore = await cookies();

      const isAuth = cookieStore.get("isAuth");

      if (isAuth) return url;

      return `${baseUrl}/auth/iniciar-sesion`;
    }
  }
};
