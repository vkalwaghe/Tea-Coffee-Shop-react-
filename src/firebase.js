// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQKFh7og0T9slo7cty5-TPVQfiTnWfx5k",
  authDomain: "tea-coffee-shop.firebaseapp.com",
  projectId: "tea-coffee-shop",
  storageBucket: "tea-coffee-shop.firebasestorage.app",
  messagingSenderId: "707650780291",
  appId: "1:707650780291:web:38035489f3d71f87d26fb6",
  measurementId: "G-J3VL1L5FY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };