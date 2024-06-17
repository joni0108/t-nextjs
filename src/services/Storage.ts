import {
	type FirebaseStorage,
	ref,
	uploadBytesResumable,
	UploadTaskSnapshot,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
import { storage } from "root/firebaseConfig";
import { EventEmitter } from "events";

class StorageService extends EventEmitter {
	private storage: FirebaseStorage;
	private fileToUpload: File | null;
	private bytesTransferred: number;
	private totalBytes: number;
	private progress: number;
	private fileID: string;
	private fileExtension: string;
	private status: string;
	private downloadURL: string;
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid TypeScript errors
	private uploadTask: any;
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid TypeScript errors
	private fileMetadata?: any;
	private userID: string;

	constructor(userId: string) {
		super();
		this.storage = storage;
		this.fileToUpload = null;
		this.bytesTransferred = 0;
		this.totalBytes = 0;
		this.progress = 0;
		this.fileID = "";
		this.fileExtension = "";
		this.status = "";
		this.downloadURL = "none";
		this.uploadTask = null;
		this.fileMetadata = undefined;
		this.userID = userId;
	}

	async UploadFile(file: File) {
		if (!file)
			return Promise.reject(
				new Error("No file to upload. Please select a file."),
			);

		return new Promise((resolve) => {
			this.fileToUpload = file;
			this.fileID = crypto.randomUUID();
			const filename = file.name.split(".");
			this.fileExtension = filename[filename.length - 1];

			const storageRef = ref(
				this.storage,
				`${this.userID}/${this.fileID}.${this.fileExtension}`,
			);

			this.uploadTask = uploadBytesResumable(storageRef, file);

			this.emit("started");

			this.uploadTask.on(
				"state_changed",
				(snapshot: UploadTaskSnapshot) => {
					this.bytesTransferred = snapshot.bytesTransferred;
					this.totalBytes = snapshot.totalBytes;
					this.progress = (this.bytesTransferred / this.totalBytes) * 100;
					this.status = "uploading";

					this.emit("uploading", {
						bytesTransferred: this.bytesTransferred,
						totalBytes: this.totalBytes,
						progress: this.progress,
					});
				},
				(error: Error) => {
					this.emit("error", error);
				},
				async () => {
					this.status = "completed";

					await getDownloadURL(this.uploadTask.snapshot.ref).then((url) => {
						this.downloadURL = url;
						this.fileMetadata = {
							contentType: file.type,
							owner: this.userID,
							name: file.name,
							extension: this.fileExtension,
							id: this.fileID,
							size: file.size,
							downloadURL: this.downloadURL,
						};
					});
					this.emit("completed", this.fileMetadata);
					resolve(this.fileMetadata);
				},
			);
		});
	}

	getMetadata() {
		return this.fileMetadata;
	}

	static async DeleteFile(downloadURL: string) {
		const storageRef = ref(storage, downloadURL);
		return await deleteObject(storageRef);
	}
}

export { StorageService };
