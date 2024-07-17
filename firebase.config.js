// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAzHAZf0d52BjqIJkyhBrP3TjIEVTRj6Y4",
  authDomain: "nurture-mental-health.firebaseapp.com",
  projectId: "nurture-mental-health",
  storageBucket: "nurture-mental-health.appspot.com",
  messagingSenderId: "132521845320",
  appId: "1:132521845320:web:98582bebcf781e85662e7d",
  measurementId: "G-B7VS5XP62B"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export {firebaseApp, analytics}