import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { DemoCoreComponent } from "./demo";

describe("DemoCoreComponent", () => {
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it("should render with the given label", () => {
    const label = "Click Me";
    const mockOnClick = vi.fn();

    render(<DemoCoreComponent label={label} onClick={mockOnClick} />);

    const buttonElement = screen.getByText(label);
    expect(buttonElement).toBeDefined();
  });

  it("should handle the onClick event", () => {
    const label = "Click Me";
    const mockOnClick = vi.fn();

    render(<DemoCoreComponent label={label} onClick={mockOnClick} />);

    const buttonElement = screen.getByText(label);
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
