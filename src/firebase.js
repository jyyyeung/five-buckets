// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBICbnTSA3_RnLbi85GK9FcaiVJDd2TOgE",
  authDomain: "five-buckets.firebaseapp.com",
  databaseURL:
    "https://five-buckets-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "five-buckets",
  storageBucket: "five-buckets.appspot.com",
  messagingSenderId: "149079391574",
  appId: "1:149079391574:web:117b0162d57c9c108f2af7",
  measurementId: "G-47CTP7KNVC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
