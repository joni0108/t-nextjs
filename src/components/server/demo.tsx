"use server";

// These are like the functional components, but used only on the server side.
// Example, a component that shows the number of users online, fetching data from
// an api/database and server-side rendering it.

import { isServerUp } from "@/libs/demo";

export async function ServerDemoComponent() {
	const isUp = await isServerUp();

	return (
		<div>
			<p>Server is {isUp ? "up" : "down"}</p>
		</div>
	);
}
