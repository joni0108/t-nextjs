import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { ThemeProvider, useTheme } from "@/contexts/themeContext";
import { ThemeSwitcher } from "./ThemeSwitch";

describe("Contexts.Theme", () => {
    afterEach(() => {
        cleanup();
        vi.resetAllMocks();
        window.localStorage.clear();
        document.documentElement.classList.remove("light", "dark");
    });

    // Test 1. Check the initial state with no default theme provided
    it("Returns the initial theme correctly", () => {
        const TestComponent = () => {
            const { theme } = useTheme();

            return <span data-testid="hook-theme">{theme}</span>;
        };

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const themeElement = screen.getByTestId("hook-theme");
        expect(themeElement.textContent).toBe("light");
    });

    // Test 2. Check the initial state with a default theme provided
    it("Returns the default theme correctly", () => {
        const TestComponent = () => {
            const { theme } = useTheme();

            return <span data-testid="hook-theme">{theme}</span>;
        };

        render(
            <ThemeProvider defaultTheme="dark">
                <TestComponent />
            </ThemeProvider>
        );

        const themeElement = screen.getByTestId("hook-theme");
        expect(themeElement.textContent).toBe("dark");
    });

    // Test 3. Check theme change functionality
    it("Changes the theme correctly", () => {
        const TestComponent = () => {
            const { theme, setTheme } = useTheme();

            return (
                <div>
                    <span data-testid="hook-theme">{theme}</span>
                    <button onClick={() => setTheme("light")}>Set Light Theme</button>
                    <button onClick={() => setTheme("dark")}>Set Dark Theme</button>
                </div>
            );
        };

        render(
            <ThemeProvider defaultTheme="dark">
                <TestComponent />
            </ThemeProvider>
        );

        const themeElement = screen.getByTestId("hook-theme");
        expect(themeElement.textContent).toBe("dark");

        const lightButton = screen.getByText("Set Light Theme");
        fireEvent.click(lightButton);
        expect(themeElement.textContent).toBe("light");

        const darkButton = screen.getByText("Set Dark Theme");
        fireEvent.click(darkButton);
        expect(themeElement.textContent).toBe("dark");
    });

    // Test 4. Check theme from localStorage
    it("Uses the theme from localStorage if it exists", () => {
        window.localStorage.setItem("theme", "dark");

        const TestComponent = () => {
            const { theme } = useTheme();

            return <span data-testid="hook-theme">{theme}</span>;
        };

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const themeElement = screen.getByTestId("hook-theme");
        expect(themeElement.textContent).toBe("dark");
    });

    // Test 5. Check document root class updates
    it("Updates the document root class correctly", () => {
        const TestComponent = () => {
            const { setTheme } = useTheme();

            return (
                <div>
                    <button onClick={() => setTheme("dark")}>Set Dark Theme</button>
                    <button onClick={() => setTheme("light")}>Set Light Theme</button>
                </div>
            );
        };

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        const darkButton = screen.getByText("Set Dark Theme");
        fireEvent.click(darkButton);
        expect(document.documentElement.classList.contains("dark")).toBe(true);
        expect(document.documentElement.classList.contains("light")).toBe(false);

        const lightButton = screen.getByText("Set Light Theme");
        fireEvent.click(lightButton);
        expect(document.documentElement.classList.contains("light")).toBe(true);
        expect(document.documentElement.classList.contains("dark")).toBe(false);
    });

    // Test 6. Check theme switch functionality using ThemeSwitcher
    it("Switches the theme correctly when using ThemeSwitcher", () => {
        render(
            <ThemeProvider defaultTheme="light">
                <ThemeSwitcher />
            </ThemeProvider>
        );

        expect(window.document.documentElement.classList.contains("light")).toBe(true);

        const switchButton = screen.getByText("Switch Theme");
        fireEvent.click(switchButton);
        
        expect(window.document.documentElement.classList.contains("dark")).toBe(true);

        fireEvent.click(switchButton);
        
        expect(window.document.documentElement.classList.contains("light")).toBe(true);
    });
});
