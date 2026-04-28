import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDLtfwLm8ZX8zVMx4eyCp4Vwt-AmTlL6Fs",
    authDomain: "unique-engineering-fire-bond.firebaseapp.com",
    projectId: "unique-engineering-fire-bond",
    storageBucket: "unique-engineering-fire-bond.appspot.com",
    messagingSenderId: "948503748472",
    appId: "1:948503748472:web:b32c1d65b4be3a90f9728d",
    measurementId: "G-JMCQGMFC8C"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);