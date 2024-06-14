import { CONFIG } from "@/config";

export const ROOT_SEO = {
	title: `${CONFIG.PROJECT.NAME} | Home`,
	description: CONFIG.PROJECT.DESCRIPTION,
	keywords: CONFIG.PROJECT.KEYWORDS.join(", "),
	applicationName: CONFIG.PROJECT.NAME,
	authors: CONFIG.PROJECT.AUTHORS,
	generator: "Next.js",
	creators: CONFIG.PROJECT.DEVELOPERS.join(", "),
	publisher: CONFIG.PROJECT.PUBLISHER,
	robots: CONFIG.PROJECT.HOMEPAGE + "/robots.txt",
	alternates: CONFIG.PROJECT.ALTERNATES,
	manifest: CONFIG.PROJECT.HOMEPAGE + "/manifest.json",
	openGraph: {
		type: "website",
		url: CONFIG.PROJECT.HOMEPAGE,
		title: `${CONFIG.PROJECT.NAME} | Home`,
		description: CONFIG.PROJECT.DESCRIPTION,
		siteName: CONFIG.PROJECT.NAME,
		images: [{ url: `${CONFIG.PROJECT.HOMEPAGE}/og.png` }],
	},
	twitter: {
		card: "summary_large_image",
		site: `@${CONFIG.PROJECT.NAME}`,
		creator: `@${CONFIG.PROJECT.PUBLISHER}`,
		image: `${CONFIG.PROJECT.HOMEPAGE}/og.png`,
	},
	verification: {
		google: CONFIG.PROJECT.VERIFICATIONS.google,
		yahoo: CONFIG.PROJECT.VERIFICATIONS.yahoo,
		yandex: CONFIG.PROJECT.VERIFICATIONS.yandex,
		me: CONFIG.PROJECT.VERIFICATIONS.me,
	},
};
