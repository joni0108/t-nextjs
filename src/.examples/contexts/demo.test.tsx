import { render, screen, waitFor, fireEvent, cleanup } from "@testing-library/react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { MessageProvider, useMessage } from "./demo";
import React from "react";

vi.mock("window.matchMedia", () => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
}))

describe("MessageContext", () => {
	afterEach(() => {
		cleanup();
		vi.resetAllMocks()
	})

	// Test 1: Check initial state
    it("returns the initial message state correctly", () => {
        const TestComponent = () => {
            const { message } = useMessage();
            return <span data-testid="hook-message">{message}</span>;
        };

        render(
            <MessageProvider>
                <TestComponent />
            </MessageProvider>
        );

        const messageElement = screen.getByTestId("hook-message");
        expect(messageElement.textContent).toBe("no-message");
    });

	// Test 2: Check state update
    it("updates the message state correctly", async () => {
        const TestComponent = () => {
            const { message, setMessage } = useMessage();
            return (
                <div>
                    <span data-testid="hook-message">{message}</span>
                    <button data-testid="hook-button" onClick={() => setMessage("updated-message")}>Update Message</button>
                </div>
            );
        };

        render(
            <MessageProvider>
                <TestComponent />
            </MessageProvider>
        );

        const button = screen.getByTestId("hook-button");
        fireEvent.click(button);

        await waitFor(() => {
            const messageElement = screen.getByTestId("hook-message");
            expect(messageElement.textContent).toBe("updated-message");
        });
    });

	// Test 3: Check default value
	it("uses default context value when not wrapped in a MessageProvider", () => {
	
    // Mock console.error to suppress expected React warning about missing provider
    const originalError = console.error;
    console.error = vi.fn();

    const TestComponent = () => {
        const { message, setMessage } = useMessage();
        // Attempt to use setMessage to ensure it's the default function
        expect(() => setMessage("test")).not.toThrow();
        return <span data-testid="hook-message">{message}</span>;
    };

    render(<TestComponent />);

    const messageElement = screen.getByTestId("hook-message");
    expect(messageElement.textContent).toBe("no-message");

    // Restore original console.error
    console.error = originalError;
});
});
