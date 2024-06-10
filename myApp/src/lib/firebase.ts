import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

 const firebaseConfig = {
    apiKey: "AIzaSyCjv4qfUb1BzqZ6foikrRMb3eP96tNRaN0",
    authDomain: "svelte-course-5ccbb.firebaseapp.com",
    projectId: "svelte-course-5ccbb",
    storageBucket: "svelte-course-5ccbb.appspot.com",
    messagingSenderId: "683597086774",
    appId: "1:683597086774:web:babf8f94b30a602117d897",
    measurementId: "G-SCXEMDDF2K"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
