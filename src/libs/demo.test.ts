import { describe, expect, it, vi, afterEach } from "vitest";
import { isServerUp } from "./demo";

describe("isServerUp", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it("Should return true if the server is up", async () => {
		vi.spyOn(global, "fetch").mockResolvedValueOnce({ ok: true } as Response);

		const result = await isServerUp();

		expect(result).toBe(true);
	});

	it("Should return false if the server is down", async () => {
		vi.spyOn(global, "fetch").mockResolvedValueOnce({ ok: false } as Response);

		const result = await isServerUp();

		expect(result).toBe(false);
	});

	it("Should return false if there's an error on the request", async () => {
		vi.spyOn(global, "fetch").mockRejectedValueOnce(
			new Error("Server is down"),
		);

		const result = await isServerUp();

		expect(result).toBe(false);
	});
});
