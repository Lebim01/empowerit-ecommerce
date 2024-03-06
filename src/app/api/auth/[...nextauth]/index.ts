import { getUserByEmail, login, signUp } from "@/postgresql/users";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import generatePassword from "generate-password";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/es/auth/login",
    error: "/es/auth/login",
    newUser: "/es/account",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        return login(credentials.username, credentials.password);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log(account, profile);
      try {
        if (account.provider == "google") {
          let googleProfile = profile as GoogleProfile;
          if (googleProfile.email_verified) {
            try {
              const user = await getUserByEmail(profile.email);
            } catch (err) {
              // Create if not exists
              const password = generatePassword.generate({
                length: 12,
                numbers: true,
                symbols: true,
              });
              const user = await signUp({
                email: profile.email,
                first_name: googleProfile.given_name || googleProfile.name,
                last_name: googleProfile.family_name || "",
                password,
                password_confirmation: password,
                picture: googleProfile.picture,
              });
            }
          }
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    async session({ session, token }) {
      let user = null;
      try {
        user = await getUserByEmail(session.user?.email);
      } catch (err) {
        console.error(err);
      }
      return {
        ...session,
        token,
        user: user
          ? {
              id: user.id,
              shopify_id: user.shopify_id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              profile_image: {
                original_url: user.picture,
              },
              name: user.firstName + " " + user.lastName,
            }
          : null,
      };
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
