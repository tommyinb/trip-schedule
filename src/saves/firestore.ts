import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBUWbKZJ5OI-iBWUI7XDMYHOP38ULeO8U",
  authDomain: "trip-schedule-1ff3d.firebaseapp.com",
  projectId: "trip-schedule-1ff3d",
  storageBucket: "trip-schedule-1ff3d.appspot.com",
  messagingSenderId: "518621139923",
  appId: "1:518621139923:web:8b1a9dcb28ca1f1a139526",
  measurementId: "G-WZ4DMM6HNN",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
