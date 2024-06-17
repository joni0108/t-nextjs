"use client";

// Custom react hooks are like custom functions but use react hook to store state, and handle information.
// These are used onlt on the front-end, instead of the libs function that can be used on both sides (restrictions apply).
//? On this example is just a counter hook that have a count state and a increment function.

import { useState } from "react";

export function useCounter(initialValue: number) {
	const [count, setCount] = useState(initialValue);

	function increment() {
		setCount(count + 1);
	}

	return { count, increment };
}
