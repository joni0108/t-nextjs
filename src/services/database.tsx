import { db } from "root/firebaseConfig";
import {
	doc,
	getDoc,
	setDoc,
	deleteDoc,
	updateDoc,
	query,
	where,
	getDocs,
	collection as Collection,
} from "firebase/firestore";

type Operations =
	| "=="
	| "<"
	| "<="
	| ">"
	| ">="
	| "array-contains"
	| "array-contains-any"
	| "in"
	| "not-in";

class DatabaseService {
	userId: string;

	constructor(userId: string) {
		this.userId = userId;
	}

	async setDocument(collection: string, data: unknown) {
		if (!this.userId)
			throw new Error("User ID is required to create a document");

		const docRef = doc(db, collection, this.userId);

		const res = await setDoc(docRef, data);

		return res;
	}

	async getDocument(collection: string) {
		if (!this.userId) throw new Error("User ID is required to get a document");

		const docRef = doc(db, collection, this.userId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			return null;
		}
	}

	async updateDocument(
		collection: string,
		data: {
			// biome-ignore lint/suspicious/noExplicitAny: To match firebase types required
			[key: string]: any;
		},
	) {
		if (!this.userId)
			throw new Error("User ID is required to update a document");

		const docRef = doc(db, collection, this.userId);
		const res = await updateDoc(docRef, data);

		return res;
	}

	async deleteDocument(collection: string) {
		if (!this.userId)
			throw new Error("User ID is required to delete a document");

		const docRef = doc(db, collection, this.userId);
		const res = await deleteDoc(docRef);

		return res;
	}

	static async query(
		collection: string,
		field: string,
		value: unknown,
		operator: Operations,
	) {
		const collectionRef = Collection(db, collection);
		const q = query(collectionRef, where(field, operator, value));
		const querySnapshot = await getDocs(q);
		const documents = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		return documents;
	}
}

export { DatabaseService };
