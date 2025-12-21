import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

const productsRef = collection(db, "products");

export const addProduct = async (product) => {
  await addDoc(productsRef, {
    ...product,
    createdAt: serverTimestamp(),
  });
};

export const getProducts = async () => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateProduct = async (id, data) => {
  await updateDoc(doc(db, "products", id), data);
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", id));
};
