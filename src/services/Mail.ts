import { Resend } from "resend";

const resendAPI = process.env.NEXT_PUBLIC_RESEND_API;

type SendArgs = {
	from: {
		name: string;
		email: string;
	};
	to: string[];
	subject: string;
	// biome-ignore lint/suspicious/noExplicitAny: any
	react: any;
};

type SendRawArgs = {
	from: {
		name: string;
		email: string;
	};
	to: string[];
	subject: string;
	html: string;
};

class EmailService {
	static async Send({ from, to, subject, react }: SendArgs) {
		const resend = new Resend(resendAPI);

		const { data, error } = await resend.emails.send({
			from: `${from.name} <${from.email}>`,
			to: to,
			subject: subject,
			react: react,
		});

		if (error) {
			return { error: error };
		} else {
			return { data: data };
		}
	}

	static async SendRaw({ from, to, subject, html }: SendRawArgs) {
		const resend = new Resend(resendAPI);

		const { data, error } = await resend.emails.send({
			from: `${from.name} <${from.email}>`,
			to: to,
			subject: subject,
			html: html,
		});

		if (error) {
			return { error: error };
		} else {
			return { data: data };
		}
	}
}

export { EmailService };
