import {
	type FirebaseStorage,
	getStorage,
	ref,
	uploadBytesResumable,
	UploadTaskSnapshot,
	getDownloadURL,
	deleteObject,
} from "firebase/storage";
import { app } from "root/firebaseConfig";
import { EventEmitter } from "events";

class StorageService extends EventEmitter {
	storage: FirebaseStorage;
	fileToUpload: File | null;
	bytesTransferred: number;
	totalBytes: number;
	progress: number;
	status: string;
	downloadURL: string;
	// biome-ignore lint/suspicious/noExplicitAny: any is used to avoid TypeScript errors
	uploadTask: any;
	fileMetadata: object;

	constructor() {
		super();
		this.storage = getStorage(app);
		this.fileToUpload = null;
		this.bytesTransferred = 0;
		this.totalBytes = 0;
		this.progress = 0;
		this.status = "";
		this.downloadURL = "none";
		this.uploadTask = null;
		this.fileMetadata = {
			contentType: "image/jpeg",
			owner: "",
			name: "",
			extension: "",
			id: "",
			size: 0,
			downloadURL: "",
			unmaskedURL: "",
		};
	}

	async UploadFile(file: File, userID: string, customFileID: string = "") {
		if (!file)
			return Promise.reject(
				new Error("No file to upload. Please select a file."),
			);

		return new Promise((resolve) => {
			const randomID = customFileID === "" ? crypto.randomUUID() : customFileID;
			const filename = file.name.split(".");
			const extension = filename[filename.length - 1];

			const storageRef = ref(
				this.storage,
				`${userID}/${randomID}.${extension}`,
			);
			this.uploadTask = uploadBytesResumable(storageRef, file);

			this.uploadTask.on(
				"state_changed",
				(snapshot: UploadTaskSnapshot) => {
					this.bytesTransferred = snapshot.bytesTransferred;
					this.totalBytes = snapshot.totalBytes;
					this.progress = parseFloat(
						((this.bytesTransferred / this.totalBytes) * 100).toFixed(1),
					);
					this.status = "uploading";
					this.emit("uploading", {
						bytesTransferred: this.bytesTransferred,
						totalBytes: this.totalBytes,
						progress: this.progress,
					}); // Emit the uploading event with the current progress
				},
				(error: unknown) => {
					console.error(error);
					this.status = "error";
					this.emit("error", error); // Emit an error event
					resolve({ error: error });
				},
				async () => {
					this.status = "complete";
					await getDownloadURL(this.uploadTask.snapshot.ref).then(
						(downloadURL) => {
							this.downloadURL =
								"/api/get-masked-image?user-id=" +
								userID +
								"&file-id=" +
								randomID +
								"&extension=" +
								extension;

							this.fileMetadata = {
								contentType: file.type,
								owner: userID,
								name: file.name,
								extension: extension,
								id: randomID,
								size: file.size,
								downloadURL: this.downloadURL,
								orignalURL: downloadURL,
							};
						},
					);
					this.emit("finished"); // Emit the finished event
					resolve({ data: this.UploadState() });
				},
			);
		});
	}

	UploadState() {
		const obj = {
			state: this.status,
			bytesTransferred: this.bytesTransferred,
			totalBytes: this.totalBytes,
			progress: this.progress,
			downloadURL: this.downloadURL,
		};

		return obj;
	}

	GetFileMetadata() {
		return this.fileMetadata;
	}

	static async DeleteFile(originalRoute: string) {
		const storage = getStorage(app);
		const storageRef = ref(storage, originalRoute);
		return await deleteObject(storageRef);
	}
}

export default StorageService;
