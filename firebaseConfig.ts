import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBc6z4Xl9Rk_p_tj4wU97g-21f_l6-yTZ8",
	authDomain: "testingproject-90f2d.firebaseapp.com",
	projectId: "testingproject-90f2d",
	storageBucket: "testingproject-90f2d.appspot.com",
	messagingSenderId: "884384724640",
	appId: "1:884384724640:web:d5defada69d63757d4bbc5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
