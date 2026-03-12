import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth } from './firebase';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// Mock user for demo mode (when Firebase is not configured)
const DEMO_USER = { uid: 'demo-user', email: 'demo@example.com', displayName: 'Demo User' };

export const createAccount = async (email: string, password: string) => {
  try {
    if (!auth) {
      // Demo mode - fake success
      return { success: true, user: { ...DEMO_USER, email } };
    }
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    if (!auth) {
      // Demo mode - fake success
      return { success: true, user: { ...DEMO_USER, email } };
    }
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    if (!auth) {
      return { success: true };
    }
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  if (!auth) {
    // Demo mode - callback with demo user
    callback(DEMO_USER as any);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};
