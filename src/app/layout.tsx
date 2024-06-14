import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ROOT_SEO } from "@/components/SEO";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	...ROOT_SEO,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
