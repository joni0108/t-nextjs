//@ts-nocheck
import { render, screen, cleanup } from "@testing-library/react";
import { describe, expect, it, afterEach, vi } from "vitest";
import { ServerDemoComponent } from "./demo";
import { isServerUp } from "@/.examples/libs/demo";

vi.mock("../../libs/demo.ts", () => ({
    isServerUp: vi.fn()
}))

describe("ServerDemoComponent", () => {
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it("should display 'Server is down' when isServerUp returns false", async () => {
    isServerUp.mockReturnValue(Promise.resolve(false))

    render(await ServerDemoComponent());

    const statusElement = await screen.findByText("Server is down");
    expect(statusElement).toBeDefined()
  });

  it("should display 'Server is up' when isServerUp returns true", async () => {
    isServerUp.mockReturnValue(Promise.resolve(true))

    render(await ServerDemoComponent());

    const statusElement = await screen.findByText("Server is up");
    expect(statusElement).toBeDefined()
  });
});