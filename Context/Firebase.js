// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_x9Y7aPcVYOL2ZhxzPnu_Xby5TenPZA4",
  authDomain: "nakkai-a3af3.firebaseapp.com",
  projectId: "nakkai-a3af3",
  storageBucket: "nakkai-a3af3.appspot.com",
  messagingSenderId: "1047071052226",
  appId: "1:1047071052226:web:54dbc98fdfe13a04bd865b",
  measurementId: "G-XCWW0LPCG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
