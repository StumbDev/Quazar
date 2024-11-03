import { create } from 'zustand';
import { auth, db } from '../config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const useAuthStore = create((set) => ({
  user: null,
  isPro: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      const userData = userDoc.data();
      
      set({ 
        user: userCredential.user,
        isPro: userData?.isPro || false,
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        isPro: false,
        createdAt: new Date().toISOString()
      });
      
      set({ 
        user: userCredential.user,
        isPro: false,
        loading: false 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null, isPro: false });
  }
}));

export default useAuthStore; 