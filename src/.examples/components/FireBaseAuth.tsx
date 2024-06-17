"use client";
import { useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db, auth } from "root/firebaseConfig";

const getFirestoreData = async (userId: string) => {
	const docRef = doc(db, "example", userId);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		console.log("Document data:", docSnap.data());
	} else {
		console.log("No such document!");
	}
};

export default function FirebaseUI() {
	const { getToken, userId } = useAuth(); // We'll use the userID for the document ID, and the getToken method to sign in with Firebase.

	if (!userId) return null;

	async function signInWithClerk() {
		const token = await getToken({ template: "integration_firebase" });
		const userCredentials = await signInWithCustomToken(auth, token || "");

		console.log("User:", userCredentials.user);

		if (!userId) return null;

		// Set a document in Firestore
		const docRef = doc(db, "example", userId);
		await setDoc(docRef, {
			first: "Ada",
			last: "Lovelace",
			born: 1815,
		});
	}

	return (
		<main style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
			<button onClick={signInWithClerk}>Sign in</button>
			<button
				onClick={() => {
					getFirestoreData(userId || "");
				}}
			>
				Get document
			</button>
		</main>
	);
}
