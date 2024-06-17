"use server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ServerPage() {
	const { userId } = auth();

	if (!userId) {
		redirect("/auth/sign-in");
	}

	const user = await currentUser();

	// Do your queries and things here

	return (
		<main>
			<h1>Protected Client Page</h1>
			<p>You can only see this page if you are logged in.</p>
			<p>Hello {user?.firstName}</p>
		</main>
	);
}
