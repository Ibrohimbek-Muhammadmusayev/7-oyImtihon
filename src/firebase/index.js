import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuZ18Od04-RkjvudPzZLsfl798AsJfnp0",
  authDomain: "imtihon-91a2a.firebaseapp.com",
  projectId: "imtihon-91a2a",
  storageBucket: "imtihon-91a2a.appspot.com",
  messagingSenderId: "739753727070",
  appId: "1:739753727070:web:733db95605944c41acd0cf"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)