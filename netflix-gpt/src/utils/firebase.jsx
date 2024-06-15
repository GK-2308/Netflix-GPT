// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrIYzyBeqgV0tQV0dahvkmjJo1UgsMeYQ",
  authDomain: "netflixgpt-a6b5a.firebaseapp.com",
  projectId: "netflixgpt-a6b5a",
  storageBucket: "netflixgpt-a6b5a.appspot.com",
  messagingSenderId: "312074252202",
  appId: "1:312074252202:web:b9539cd23fead4b2d945d3",
  measurementId: "G-ZVWTKG3B5V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
