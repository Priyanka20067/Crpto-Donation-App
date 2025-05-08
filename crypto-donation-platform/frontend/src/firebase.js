import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // ...
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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
