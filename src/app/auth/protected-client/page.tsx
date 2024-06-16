"use client";
import { useAuth, useUser } from "@clerk/nextjs"; //? Current auth session

export default function ClientPage() {
	const { isLoaded, userId, sessionId, getToken } = useAuth();
	const { user } = useUser(); //? It also have isLoaded, and isSignedIn

	// In case the user signs out while in the page
	if (!isLoaded || !userId) {
		window.location.href = "/auth/sign-in";
		return null;
	}

	return (
		<main>
			<h1>Protected Client Page</h1>
			<p>You can only see this page if you are logged in.</p>
			<p>Hello {user?.firstName}</p>
		</main>
	);
}
