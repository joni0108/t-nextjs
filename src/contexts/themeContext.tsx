"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";

type ThemeType = "light" | "dark";

type ThemeProviderPropsType = {
	children: ReactNode;
	defaultTheme?: ThemeType;
};

type ThemeProviderStateType = {
	theme: ThemeType;
	setTheme: (theme: ThemeType) => void;
};

const initialState: ThemeProviderStateType = {
	theme: "light",
	setTheme: () => null,
};

const ThemeProviderContext =
	createContext<ThemeProviderStateType>(initialState);

function ThemeProvider({
	children,
	defaultTheme = "light",
	...props
}: ThemeProviderPropsType) {
	const [theme, setTheme] = useState<ThemeType>(defaultTheme);

	useEffect(() => {
		const storedTheme = window.localStorage.getItem("theme") as ThemeType;

		if (storedTheme) {
			setTheme(storedTheme);
		}

		const root = window.document.documentElement;

		root.classList.remove("light", "dark");

		root.classList.add(theme);
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: ThemeType) => {
			window.localStorage.setItem("theme", theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider value={value} {...props}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

function useTheme() {
	return useContext(ThemeProviderContext);
}

export { ThemeProvider, useTheme };
