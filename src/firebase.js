// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuWryEyyv71syQnRVBj8lJgm-vLEN1ZwM",
  authDomain: "aivideodiary.firebaseapp.com",
  projectId: "aivideodiary",
  storageBucket: "aivideodiary.appspot.com",
  messagingSenderId: "354684357770",
  appId: "1:354684357770:web:ffa09fe321144e17b5f173",
  measurementId: "G-BHZ6F3V79X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);