import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAOnPhvT-Hdsj8UPqsgyvDoz72IfrziXB0",
  authDomain: "hcode-red-burguer.firebaseapp.com",
  projectId: "hcode-red-burguer",
  storageBucket: "hcode-red-burguer.appspot.com",
  messagingSenderId: "279721252418",
  appId: "1:279721252418:web:c6b6386e92856eef653fdb",
  measurementId: "G-Z4S1KNDXQS",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
