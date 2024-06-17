//@ts-nocheck
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe.skip("Home Page", () => {
  it("Should render the home page", async () => {
     render(await Home());

    const statusElement = await screen.findByText("Home Page");
    expect(statusElement).toBeDefined()
  })
});