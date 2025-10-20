// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFcFXs14kXk2L58DD-Te3BDNtDeQBx8qg",
  authDomain: "qudraat-shabab.firebaseapp.com",
  projectId: "qudraat-shabab",
  storageBucket: "qudraat-shabab.firebasestorage.app",
  messagingSenderId: "431722577401",
  appId: "1:431722577401:web:a26409bf72270e9ea9d128",
  measurementId: "G-Y2FFR0VJ43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
