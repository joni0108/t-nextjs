export const CONFIG = {
	PROJECT: {
		NAME: "My Project",
		VERSION: "1.0.0",
		DESCRIPTION: "My Project Description",
		AUTHORS: [
			{
				url: "https://myhomepage.com",
				name: "My Name",
			},
		],
		DEVELOPERS: ["Codixfy", "Jonathan Fernandez"],
		PUBLISHER: "Codixfy",
		HOMEPAGE: "http://localhost:3000",
		KEYWORDS: ["My", "Project", "Keywords"],
		ALTERNATES: {
			canonical: "http://localhost:3000",
		},
		VERIFICATIONS: {
			google: "",
			yandex: "",
			me: "",
			yahoo: "",
		},
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
