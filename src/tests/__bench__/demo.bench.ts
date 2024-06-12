import { describe, bench } from "vitest";

describe("This will benchmark between 2 functions", () => {
	bench("Normal Sorting", () => {
		const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		arr.sort();
	});

	bench("Custom Sorting", () => {
		const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		arr.sort((a, b) => a - b);
	});

	// This will be skipped
	bench.skip("Skipped", () => {
		const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		arr.sort((a, b) => b - a);
	});
});
