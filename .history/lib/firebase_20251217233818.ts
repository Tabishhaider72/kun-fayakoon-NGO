import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaDSvxB90QMQ2pV3OIe9PgdGecwagIlj4",
  authDomain: "kun-fayakoon.firebaseapp.com",
  projectId: "kun-fayakoon",
  storageBucket: "kun-fayakoon.appspot.com",
  messagingSenderId: "426187702840",
  appId: "1:426187702840:web:f7280a2033fdc14628dccd",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
