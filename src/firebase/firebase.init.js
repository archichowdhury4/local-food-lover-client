// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKIehdsk-cZb6_SDqXfFoGDnQkNOUhp7s",
  authDomain: "local-food-lover-bb58c.firebaseapp.com",
  projectId: "local-food-lover-bb58c",
  storageBucket: "local-food-lover-bb58c.firebasestorage.app",
  messagingSenderId: "1023426138099",
  appId: "1:1023426138099:web:07076ba81a98346b0f0c86"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);