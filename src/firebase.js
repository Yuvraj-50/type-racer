// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCi80z61AqhDRUT27LUZeJ59snaGg_IjUs",
  authDomain: "typing-racer-8d2c9.firebaseapp.com",
  projectId: "typing-racer-8d2c9",
  storageBucket: "typing-racer-8d2c9.appspot.com",
  messagingSenderId: "751601193593",
  appId: "1:751601193593:web:321ed1d44fa469a2923aa8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
