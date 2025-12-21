import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getUserRole = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    console.error("User document does not exist for UID:", uid);
    return "user"; // SAFE DEFAULT
  }

  const data = snap.data();

  return data.role || "user"; // fallback safety
};
