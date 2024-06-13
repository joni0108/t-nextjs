export const CONFIG = {
	PROJECT: {
		NAME: "My Project",
		VERSION: "1.0.0",
		DESCRIPTION: "My Project Description",
		AUTHOR: "My Name",
		HOMEPAGE: "https://myhomepage.com",
	},
	API: {
		ROOT: "http://localhost:3000",
		BASE: "/api",
		ENDPOINTS: {
			HEALTHCHECK: "/",
		},
	},
	getAPIURL(endpoint: string) {
		return this.API.ROOT + this.API.BASE + endpoint;
	},
};
