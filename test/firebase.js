//https://zenn.dev/mikakane/books/nuxtjs-chatapp/viewer/3

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import { getAuth, onAuthStateChanged, connectAuthEmulator } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG7gYghWh5FSN31hfREESZjnSPGRkIQ44",
  authDomain: "authentication-94c1a.firebaseapp.com",
  projectId: "authentication-94c1a",
  storageBucket: "authentication-94c1a.appspot.com",
  messagingSenderId: "793023831068",
  appId: "1:793023831068:web:8191289bffcec91bb053d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export auth
const auth = getAuth(app);
// use Emulator
//https://firebase.google.com/docs/emulator-suite/connect_auth#web-version-9 参考
connectAuthEmulator(auth, "http://localhost:9099");


export default auth;