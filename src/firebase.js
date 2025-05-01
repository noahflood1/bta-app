import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
export const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmiZjvF49gCe0jtUXVeKz5SODPhrxsIkM",
  authDomain: "bta-app-55f80.firebaseapp.com",
  projectId: "bta-app-55f80",
  storageBucket: "bta-app-55f80.firebasestorage.app",
  messagingSenderId: "294284782225",
  appId: "1:294284782225:web:1ac777de2d3dafe5be2d30"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);