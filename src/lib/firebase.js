import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2EdUTYrI6uwpCMTweIYTtuZdmAlV6rXE",
  authDomain: "vtn-portfolio-b9c75.firebaseapp.com",
  projectId: "vtn-portfolio-b9c75",
  storageBucket: "vtn-portfolio-b9c75.firebasestorage.app",
  messagingSenderId: "1010732012640",
  appId: "1:1010732012640:web:c93f029338f7d203a39f05",
  measurementId: "G-617GVK3B7W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
