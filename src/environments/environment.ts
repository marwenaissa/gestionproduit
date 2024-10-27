// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCNmPqvF-ccxiedClEnTotnInLaS5fgGg",
  authDomain: "gestionproduit-630d7.firebaseapp.com",
  projectId: "gestionproduit-630d7",
  storageBucket: "gestionproduit-630d7.appspot.com",
  messagingSenderId: "25967414199",
  appId: "1:25967414199:web:1bc0ad52f07ccdd050b632",
  measurementId: "G-EXHBFYVGDH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);