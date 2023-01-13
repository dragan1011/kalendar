
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCXzhtS4g3f9CaaRAJpOQ5uezU2Nrq67a4",
  authDomain: "kalendar-54aa2.firebaseapp.com",
  projectId: "kalendar-54aa2",
  storageBucket: "kalendar-54aa2.appspot.com",
  messagingSenderId: "795804402549",
  appId: "1:795804402549:web:5c597cc0b68eb3ae2f893c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)