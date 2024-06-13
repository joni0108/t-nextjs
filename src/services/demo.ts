// These are kind of libraries, but they are used only on the server side, and
// are designed to solve complex tasks, like the connection to a database, auth,
// or any other server side task.
//? On this example is just a function that check if the server is up, and return a boolean, and some data returned by the api.

export class DemoService {
	isUp: boolean;
	timeOfLastCheck: Date;
	message: string;
	hasChecked: boolean;

	constructor() {
		this.isUp = false;
		this.timeOfLastCheck = new Date();
		this.message = "";
		this.hasChecked = false;
	}

	async checkServer() {
		try {
			const response = await fetch("/api");

			if (!response.ok) {
				this.isUp = false;
				this.message = "Server is down";
				this.timeOfLastCheck = new Date();
				this.hasChecked = true;
			} else {
				this.isUp = true;

				const data = await response.json();

				this.message = data.message;
				this.timeOfLastCheck = new Date();
				this.hasChecked = true;
			}
			// biome-ignore lint/suspicious/noExplicitAny: Catch-Any
		} catch (error: any) {
			this.isUp = false;
			this.message = error.message;
			this.timeOfLastCheck = new Date();
			this.hasChecked = true;
		}
	}

	getData() {
		if (!this.hasChecked) {
			throw new Error("You need to check the server first. Use checkServer()");
		}
		return {
			isUp: this.isUp,
			message: this.message,
			timeOfLastCheck: this.timeOfLastCheck,
		};
	}
}
