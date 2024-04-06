import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  signInWithCustomToken,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { db } from "@/firebase/admin";
import { getUserByEmail } from "@/postgresql/users";

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
        accessToken: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        if (credentials.accessToken) {
          return signInWithCustomToken(auth, credentials.accessToken)
            .then(async (userCredential: any) => {
              const _user = await db
                .collection("users")
                .doc(userCredential.user.uid)
                .get();
              return {
                ..._user.data(),
                id: userCredential.user.uid,
                accessToken: userCredential.user.accessToken,
              };
            })
            .catch((err) => {
              return null;
            });
        } else {
          return signInWithEmailAndPassword(
            auth,
            credentials.username,
            credentials.password
          )
            .then(async (userCredential: any) => {
              const _user = await db
                .collection("users")
                .doc(userCredential.user.uid)
                .get();
              return {
                ..._user.data(),
                id: userCredential.user.uid,
                accessToken: userCredential.user.accessToken,
              };
            })
            .catch((err) => {
              return null;
            });
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      try {
        return true;
      } catch (err) {
        return false;
      }
    },
    async session({ session, token, user }) {
      if (token?.email) {
        const _user = await getUserByEmail(token.email);
        session.user = _user;
      } else if (user?.email) {
        const _user = await getUserByEmail(user.email);
        session.user = _user;
      }
      return {
        ...session,
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.picture = user.avatar;
      }
      return token;
    },
  },
};
