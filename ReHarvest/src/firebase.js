import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDntK8_FXv0QkIwqxp1poEIlrf7PwR4k28",
  authDomain: "reharvest-userbase.firebaseapp.com",
  projectId: "reharvest-userbase",
  storageBucket: "reharvest-userbase.firebasestorage.app",
  messagingSenderId: "417242878021",
  appId: "1:417242878021:web:ddd31c51e3c7b84f1d132c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);