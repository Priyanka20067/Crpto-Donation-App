// Import Firebase core and modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYT451jea6Gb6FbgI2JUWjqsxic5RnDyY",
  authDomain: "crypto-e1cc8.firebaseapp.com",
  projectId: "crypto-e1cc8",
  storageBucket: "crypto-e1cc8.firebasestorage.app",
  messagingSenderId: "333676933828",
  appId: "1:333676933828:web:9cffbf4adcacd0e5b5cf91",
  measurementId: "G-PF341HK3FR"
};

// ✅ Initialize Firebase once
const app = initializeApp(firebaseConfig);

// Optional: Initialize Analytics
const analytics = getAnalytics(app);

// ✅ Initialize Firestore once
export const db = getFirestore(app);

// Function to log donation to Firestore
export async function logDonation({ donor, amount, token, txHash }) {
  try {
    await addDoc(collection(db, "donations"), {
      donor,
      amount: amount.toString(),
      token,
      txHash,
      timestamp: serverTimestamp()
    });
  } catch (e) {
    console.error("Firestore error:", e);
  }
}
