import admin from "firebase-admin";
import { initializeApp, cert } from "firebase-admin/app";

const app =
  admin.apps.length == 0
    ? initializeApp({
        credential: cert({
          clientEmail: process.env.NEXT_FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY.replace(
            /\\n/gm,
            "\n"
          ),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
        }),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      })
    : admin.apps[0];

const db = admin.firestore();

export { app, db };
