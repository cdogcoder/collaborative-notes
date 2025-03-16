// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUSJaO1KSKLIvAzh2HC8qndgH9qbqFnOY",
  authDomain: "collaborative-notes-d25ae.firebaseapp.com",
  projectId: "collaborative-notes-d25ae",
  storageBucket: "collaborative-notes-d25ae.firebasestorage.app",
  messagingSenderId: "1003988248229",
  appId: "1:1003988248229:web:6f6d519c41481518314f4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
export default app;