import * as React from "react";

interface EmailTemplateProps {
	name: string;
}

const DemoEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	name,
}) => {
	return (
		<div>
			<h1>Hello {name}!</h1>
			<p>This is a demo email template.</p>
		</div>
	);
};

export { DemoEmailTemplate };
