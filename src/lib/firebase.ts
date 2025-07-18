import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4NIEzPyOalpuPpimZ3SNlIBduwlizC3c",
  authDomain: "circuitcode-282b2.firebaseapp.com",
  projectId: "circuitcode-282b2",
  storageBucket: "circuitcode-282b2.firebasestorage.app",
  messagingSenderId: "625858113287",
  appId: "1:625858113287:web:0ec25dc54d5837c0721fa2",
  measurementId: "G-H2FXVFQCDD"
};

const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
