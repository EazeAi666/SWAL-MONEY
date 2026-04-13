import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleRedirectResult } from '../lib/firebase';

interface UserData {
  uid: string;
  balance: number;
  displayName: string | null;
  email: string | null;
  phone?: string;
  kycLevel: number;
  kycStatus?: string;
  deviceId?: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isAuthReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Handle redirect result on mount (for mobile/iframe compatibility)
    handleRedirectResult().catch(err => console.error("Redirect handler error:", err));

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthReady(true);
      
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        
        // Listen for real-time updates to user data (balance, etc.)
        const unsubUser = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData);
          } else {
            // Initialize new user document
            const newUserData = {
              uid: firebaseUser.uid,
              balance: 0,
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              kycLevel: 1,
              createdAt: serverTimestamp(),
            };
            await setDoc(userDocRef, newUserData);
            setUserData(newUserData as any);
          }
          setLoading(false);
        }, (error) => {
          console.error("User data snapshot error:", error);
          setLoading(false);
        });

        return () => unsubUser();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
