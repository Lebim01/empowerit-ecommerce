import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    user: {
      profile_image?: string;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken: string;
    avatar?: string;
    rank: string;
    is_admin?: boolean;
    membership: null | string;
    uid: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    iat: number;
    exp: number;
  }
}
