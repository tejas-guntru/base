import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const servicesRef = collection(db, "services");

export const addService = async (service) => {
  await addDoc(servicesRef, {
    ...service,
    isActive: true,
    createdAt: serverTimestamp(),
  });
};

export const getServices = async () => {
  const snapshot = await getDocs(servicesRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteService = async (id) => {
  await deleteDoc(doc(db, "services", id));
};
