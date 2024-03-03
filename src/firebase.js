// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAIGYg-lX79vTjIUDL8TyilvE0SR9_UmnM',
  authDomain: 'food-match-6eb53.firebaseapp.com',
  projectId: 'food-match-6eb53',
  storageBucket: 'food-match-6eb53.appspot.com',
  messagingSenderId: '802260338792',
  appId: '1:802260338792:web:774055df32c4595c31d3dd'
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();

// used for the firestore refs
export const db = getFirestore(firebaseApp);
export const matchesRef = collection(db, 'matches');
