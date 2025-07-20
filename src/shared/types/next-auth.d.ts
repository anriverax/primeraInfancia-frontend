/* eslint-disable  @typescript-eslint/no-unused-vars, no-unused-vars, unused-imports/no-unused-imports*/
import { JWT } from "next-auth/jwt";

// Extend the global scope
export interface IToken {
  accessToken: string;
  refreshToken: string;
}
export interface IMenuPermission {
  id: number;
  title: string;
  path: string;
  icon: string;
  parentId: number | null;
  action: {
    id: number;
    name: string;
  };
}

interface IUser {
  role: string;
  isVerified: boolean;
  picture: string;
  email: string | undefined | null;
  name: string | undefined | null;
}
declare module "next-auth" {
  interface User extends IToken {
    user: IUser;
    permissions: IMenuPermission[];
  }
  interface Session extends IToken {
    user: IUser;
    permissions: IMenuPermission[];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends JWT {
    role: string;
    isVerified: boolean;
    picture: string;
    permissions: IMenuPermission[];
    /** OpenID ID Token */
  }
}
