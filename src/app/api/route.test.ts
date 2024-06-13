// src/pages/api/healthcheck.test.ts

import { describe, it, expect } from "vitest";
import { GET } from "./route"; // Adjust the import path as necessary

describe("GET /api/healthcheck", () => {
  it("should return a healthcheck object with a message", async () => {
    const response = GET();
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(json).toEqual({
      healthcheck: true,
      message: "Hello from the other side...!",
    });
  });
});
