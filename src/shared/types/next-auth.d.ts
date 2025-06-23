/* eslint-disable  @typescript-eslint/no-unused-vars, no-unused-vars, unused-imports/no-unused-imports*/
import { JWT } from "next-auth/jwt";

// Extend the global scope

declare module "next-auth" {
  interface User {
    accessToken: string;
    refreshToken: string;
    user: {
      role: string;
      isVerified: boolean;
      picture: string;
      email: string | undefined | mull;
      name: string | undefined | mull;
    };
  }
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      role: string;
      isVerified: boolean;
      picture: string;
      email: string | undefined | mull;
      name: string | undefined | mull;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends JWT {
    role: string;
    isVerified: boolean;
    picture: string;
    /** OpenID ID Token */
  }
}
