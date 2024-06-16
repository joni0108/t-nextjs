// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAy8ciU6Umjc6emi33BH-4GDEIz0Cn1DXw",
	authDomain: "testing-41c1c.firebaseapp.com",
	projectId: "testing-41c1c",
	storageBucket: "testing-41c1c.appspot.com",
	messagingSenderId: "895027099005",
	appId: "1:895027099005:web:ff77350a2ffd061d4e0814",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
