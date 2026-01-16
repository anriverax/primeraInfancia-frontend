import { authOptions } from "@/app/auth/infrastructure/nextAuth";
import NextAuth from "next-auth";

/** NextAuth handler for GET and POST requests to /api/auth/[...nextauth] route. */
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
