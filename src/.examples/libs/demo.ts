// These are custom functions solving an specific task.
// If the task is complex enough to need a class, we recommend to store it on the services folder.
//? On this example is just a component that check if the server is up. I know it is redundant, but it is just an example.

import { CONFIG } from "@/config";

export async function isServerUp() {
	try {
		const response = await fetch(CONFIG.getAPIURL(""), { cache: "no-cache" });

		if (response.ok) {
			return true;
		} else {
			return false;
		}
	} catch {
		return false;
	}
}
