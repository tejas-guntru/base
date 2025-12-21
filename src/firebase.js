// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoiHP1J4STyJ9szNxUS5vhz4zTl4kgCMY",
  authDomain: "ecommerce-65a04.firebaseapp.com",
  projectId: "ecommerce-65a04",
  storageBucket: "ecommerce-65a04.firebasestorage.app",
  messagingSenderId: "604129545952",
  appId: "1:604129545952:web:34ebfe7a76edd3b91eca85",
  measurementId: "G-9ZDFRH3P13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Analytics (safe)
export let analytics;
isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});
