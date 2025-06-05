import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth , setPersistence , browserLocalPersistence} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCN7nfO6ii52oVuz16B2VZTlxe-9aSCmVI",
  authDomain: "ai-assistant-b1fd6.firebaseapp.com",
  projectId: "ai-assistant-b1fd6",
  storageBucket: "ai-assistant-b1fd6.firebasestorage.app",
  messagingSenderId: "930316410605",
  appId: "1:930316410605:web:aba8d9fd2730d4c21276e4",
  measurementId: "G-7LDX8QT3WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Set persistence to local storage
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence:", error);
});
