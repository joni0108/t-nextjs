import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ROOT_SEO } from "@/components/SEO";
import { ThemeProvider } from "@/contexts/themeContext";

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
			<ThemeProvider>
				<body
					className={`${inter.className} bg-light-bg-screen text-light-font-primary dark:bg-dark-bg-screen dark:text-dark-font-primary`}
				>
					{children}
				</body>
			</ThemeProvider>
		</html>
	);
}
