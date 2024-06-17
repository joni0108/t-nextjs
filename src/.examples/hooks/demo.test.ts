import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { useCounter } from "./demo"; // Adjust the import path as necessary

describe("useCounter Hook", () => {
	it("should initialize with the initial value", () => {
		const initialValue = 0;
		const { result } = renderHook(() => useCounter(initialValue));
		expect(result.current.count).toBe(initialValue);
	});

	it("should increment the count", () => {
		const initialValue = 0;
		const { result } = renderHook(() => useCounter(initialValue));

		act(() => {
			result.current.increment();
		});

		expect(result.current.count).toBe(initialValue + 1);
	});
});
