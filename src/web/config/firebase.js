import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyB8dMfGMEHt2-Hhqc5xf0_Ej6Ibr1bab8g",
  authDomain: "quazar-2dca2.firebaseapp.com",
  projectId: "quazar-2dca2",
  storageBucket: "quazar-2dca2.firebasestorage.app",
  messagingSenderId: "343536304048",
  appId: "1:343536304048:web:a6c6a060e8bd4fdf632075"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Create default admin user if it doesn't exist
export const createDefaultUser = async () => {
  const defaultEmail = "admin@quazar.dev";
  const defaultPassword = "quazar123";

  try {
    const userCredential = await signInWithEmailAndPassword(auth, defaultEmail, defaultPassword);
    return userCredential.user;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      // If user doesn't exist, you'll need to create it through Firebase Console
      console.log('Please create the default user through Firebase Console:');
      console.log('Email: admin@quazar.dev');
      console.log('Password: quazar123');
    }
    throw error;
  }
}; 