import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

// Firebase-konfigurationen laddas från miljövariabler
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialisera Firebase-applikationen med konfigurationen
export const app = initializeApp(firebaseConfig);
// Hämta Firestore-databasen
export const db = getFirestore(app);
// Hämta Firebase-autentisering
export const auth = getAuth(app);
// Hämta Firebase-lagring
export const storage = getStorage(app);

/**
 * Skapar en Svelte store för att hantera aktuell inloggad Firebase-användare
 * @returns en store med den aktuella Firebase-användaren
 */
function userStore() {
  let unsubscribe: () => void;

  // Kontrollera om auth är initialiserad och om vi är i en browsermiljö
  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    };
  }

  // Skapa en writable store med den aktuella användaren (eller null om ingen är inloggad)
  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    // Sätt upp en lyssnare för autentiseringsändringar
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user); // Uppdatera store när användaren ändras
    });

    return () => unsubscribe(); // Rensa lyssnaren när storen inte används längre
  });

  return {
    subscribe,
  };
}

// Exportera user storen för att användas i andra delar av applikationen
export const user = userStore();

export function docStore<T>(
  path: string,
) {
  let unsubscribe: () => void;

  const docRef = doc(db, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}
