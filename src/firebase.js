import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0QG_CRO-bH0s2OpnOJ76vla0JmsYvCDA",
  authDomain: "sistema-clarisa.firebaseapp.com",
  projectId: "sistema-clarisa",
  storageBucket: "sistema-clarisa.firebasestorage.app",
  messagingSenderId: "334666056320",
  appId: "1:334666056320:web:4c5d3922bd2deb649b5c65",
  measurementId: "G-N864FS8865"
};

const app = initializeApp(firebaseConfig);

// Exportar Auth y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;