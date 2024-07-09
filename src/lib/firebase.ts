// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth  } from "firebase/auth";
// import { getAuth } from '@react-native-firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzeDn84DG54wAKWDhYjfPYyW6OqiCVNes",
  authDomain: "reactnative-bd5ee.firebaseapp.com",
  projectId: "reactnative-bd5ee",
  storageBucket: "reactnative-bd5ee.appspot.com",
  messagingSenderId: "482467798352",
  appId: "1:482467798352:web:31c98059ead4815cf26055",
  measurementId: "G-9WH01L5T3S"
};

// Initialize Firebase
export const FIREBASE_APP= initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)