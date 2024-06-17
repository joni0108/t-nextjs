"use client";
import { useState } from "react";
import { StorageService } from "@/services/storage";
import { auth } from "root/firebaseConfig";
import { useAuth } from "@clerk/nextjs";
import { signInWithCustomToken } from "firebase/auth";
import React from "react";
import Image from "next/image";

export function UploadComponent() {
	const [filesLib, setFilesLib] = useState<FileList | null>(null);
	const [data, setData] = useState({
		bytesTransferred: 0,
		totalBytes: 0,
		progress: 0,
		status: "",
		downloadURL: "none",
	});
	const [url, setURL] = useState<string | null>(null);
	const { getToken, userId } = useAuth();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;

		if (files) {
			setFilesLib(files);
		}
	};

	const handleClick = async () => {
		if (filesLib && userId) {
			const upload = new StorageService(userId);

			const token = await getToken({ template: "integration_firebase" });
			const userCredentials = await signInWithCustomToken(auth, token || "");

			if (!userCredentials) return null;

			upload.on("uploading", (data) => {
				setData({
					bytesTransferred: data.bytesTransferred,
					totalBytes: data.totalBytes,
					progress: data.progress,
					status: "Uploading",
					downloadURL: "",
				});
			});

			upload.on("completed", () => {
				const metadata = upload.getMetadata();

				if (metadata) {
					setData({
						...data,
						status: "completed",
						downloadURL: metadata.downloadURL,
					});

					setURL(metadata.downloadURL);
				}
			});

			await upload.UploadFile(filesLib[0]);
		}
	};

	const deleteClick = async () => {
		if (url) {
			await StorageService.DeleteFile(url);
		}
	};

	return (
		<div>
			<h1>
				Upload Component: {data.bytesTransferred} bytes from {data.totalBytes}{" "}
				total. Progress: {data.progress}
			</h1>
			<p>Status: {data.status}</p>
			<p>Download URL: {data.downloadURL}</p>
			<input type="file" onChange={handleFileChange} />
			<button onClick={handleClick}>Upload</button> <br />
			<button onClick={deleteClick}>Delete File</button>
			<Image src={url || ""} alt="Uploaded Image" width={200} height={200} />
		</div>
	);
}
