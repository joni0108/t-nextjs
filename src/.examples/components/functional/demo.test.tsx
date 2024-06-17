//@ts-nocheck
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { Counter } from "./demo";
import { useCounter } from "@/.examples/hooks/demo";

// Mock the useCounter hook
vi.mock("../../hooks/demo.ts", () => ({
  useCounter: vi.fn()
}));

// Mock the DemoCoreComponent
vi.mock("../core/demo", () => ({
  DemoCoreComponent: ({ label, onClick }) => (
    <button onClick={onClick}>{label}</button>
  )
}));

describe("Counter", () => {
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it("should display initial count", () => {
    // Mock the useCounter hook to return a count of 0
    useCounter.mockReturnValue({
      count: 0,
      increment: vi.fn()
    });

    render(<Counter />);

    const countElement = screen.getByText("Count: 0");
    expect(countElement).toBeDefined();

    const buttonElement = screen.getByText("Increment");
    expect(buttonElement).toBeDefined();
  });

  it("should increment count when button is clicked", () => {
    const incrementMock = vi.fn();

    // Mock the useCounter hook to return a count of 0 and an increment function
    useCounter.mockReturnValue({
      count: 0,
      increment: incrementMock
    });

    render(<Counter />);

    const buttonElement = screen.getByText("Increment");
    fireEvent.click(buttonElement);

    expect(incrementMock).toHaveBeenCalledTimes(1);
  });

  it("should display updated count after increment", () => {
    // Initial render with count 0
    useCounter.mockReturnValueOnce({
      count: 0,
      increment: () => {}
    });

    // Updated render with count 1 after increment
    useCounter.mockReturnValueOnce({
      count: 1,
      increment: () => {}
    });

    const { rerender } = render(<Counter />);

    // Initial count should be 0
    expect(screen.getByText("Count: 0")).toBeDefined();

    // Simulate increment
    useCounter.mock.results[0].value.increment();

    // Rerender the component with the updated count
    rerender(<Counter />);

    // Updated count should be 1
    expect(screen.getByText("Count: 1")).toBeDefined();
  });
});
