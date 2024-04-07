import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuY1Xb35wJCOMrsqfjdnEn6M-E8Qgh7Yc",
  authDomain: "empowerit-top.firebaseapp.com",
  projectId: "empowerit-top",
  storageBucket: "empowerit-top.appspot.com",
  messagingSenderId: "120897574110",
  appId: "1:120897574110:web:9bb4c7b46d3578af11de4f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storageBucket = getStorage(app);
