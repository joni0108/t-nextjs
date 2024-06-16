import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/nextjs";

export default function Home() {
	return (
		<main>
			<SignedOut>
				<h1>You are currently signed out, please sign in:</h1>
				<br />
				<SignInButton />
				<br />
				<SignUpButton />
			</SignedOut>
			<SignedIn>
				<h1>You are currently signed in.</h1>
				<br />
				Profile: <UserButton /> <br />
				<a href="/auth/protected-client">Go to Protected Page (Client)</a>{" "}
				<br />
				<a href="/auth/protected-server">Go to Protected Page (Server)</a>{" "}
				<br />
			</SignedIn>
		</main>
	);
}
