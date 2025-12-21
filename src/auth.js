import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

// SIGNUP → always creates USER role
export const signup = async (email, password) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    role: "user",        // 🔒 STRICT
    createdAt: new Date(),
  });

  return cred;
};

// LOGIN
export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

// LOGOUT
export const logout = () => signOut(auth);
