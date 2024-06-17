import { describe, expect, it, vi, afterEach } from "vitest";
import { DemoService } from "./demo";

describe("Demo Service", () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it("Should create a class and throw an error if getData is called before checkServer", () => {
		const service = new DemoService();

		expect(() => service.getData()).toThrowError(
			"You need to check the server first. Use checkServer()",
		);
	});

	it("Should check for an up server case", async () => {
		vi.spyOn(global, "fetch").mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve({ message: "Server is up" }),
		} as unknown as Response);

		const service = new DemoService();
		await service.checkServer();

		const data = service.getData();

		expect(data).toEqual({
			isUp: true,
			message: "Server is up",
			timeOfLastCheck: expect.any(Date),
		});
	});

	it("Should check for a down server case", async () => {
		vi.spyOn(global, "fetch").mockResolvedValueOnce({
			ok: false,
		} as Response);

		const service = new DemoService();
		await service.checkServer();

		const data = service.getData();

		expect(data).toEqual({
			isUp: false,
			message: "Server is down",
			timeOfLastCheck: expect.any(Date),
		});
	});

	it("Should return false if there's an error on the request", async () => {
		vi.spyOn(global, "fetch").mockRejectedValueOnce(
			new Error("Server is down"),
		);

		const service = new DemoService();
		await service.checkServer();

		const result = service.getData();

		expect(result.isUp).toBe(false);
	});
});
