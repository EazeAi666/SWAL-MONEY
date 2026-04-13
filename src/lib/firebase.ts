import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  browserPopupRedirectResolver,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { getFirestore, doc, getDocFromCache, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Sometimes .firebaseapp.com has QUIC protocol issues in certain environments.
// Switching to .web.app can sometimes bypass this.
const config = {
  ...firebaseConfig,
  authDomain: firebaseConfig.authDomain.replace('firebaseapp.com', 'web.app')
};

const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const googleProvider = new GoogleAuthProvider();

// Ensure persistence is set to local
setPersistence(auth, browserLocalPersistence);

export const loginWithGoogle = async () => {
  const isInIframe = window.self !== window.top;
  
  if (isInIframe) {
    console.warn("Authentication popups may be blocked in an iframe. If login fails, please open the app in a new tab using the 'Open in new tab' icon.");
  }

  try {
    // Use the browser popup redirect resolver for better compatibility in iframes
    const result = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
    return result.user;
  } catch (error: any) {
    console.error("Login error details:", {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    
    if (error.code === 'auth/popup-blocked') {
      alert("The login popup was blocked. Please allow popups for this site or open the app in a new tab.");
    } else if (error.message?.includes('ERR_QUIC_PROTOCOL_ERROR')) {
      console.error("QUIC Protocol error detected. This is a network/browser issue. Try: 1. Open in a new tab. 2. Use a different browser. 3. Disable QUIC in chrome://flags.");
    }
    throw error;
  }
};

export const logout = () => signOut(auth);

// Connection test as per guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Firebase is offline. Please check your network or Firebase configuration.");
    }
  }
}
testConnection();
