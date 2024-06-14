"use client";

import { useTheme } from "@/contexts/themeContext";

export function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();

	return (
		<div>
			<button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
				Switch Theme
			</button>
		</div>
	);
}
