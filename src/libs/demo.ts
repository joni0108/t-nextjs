// These are custom functions solving an specific task.
// If the task is complex enough to need a class, we recommend to store it on the services folder.
//? On this example is just a component that check if the server is up. I know it is redundant, but it is just an example.

export async function isServerUp() {
	try {
		const response = await fetch("/api");

		if (response.ok) {
			return true;
		} else {
			return false;
		}
	} catch {
		return false;
	}
}
