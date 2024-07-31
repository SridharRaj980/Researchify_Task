import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyDClvV3UyGveToQOxw1WQW-L7VHJG3OBcE",
  authDomain: "event-manager-f9cab.firebaseapp.com",
  projectId: "event-manager-f9cab",
  storageBucket: "event-manager-f9cab.appspot.com",
  messagingSenderId: "671691864080",
  appId: "1:671691864080:web:b21159d3aae9eedbfe7295",
  measurementId: "G-2C9XLCWL3B",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db };