"use client";

// Functional components are the most high-level single responsibility components in the application.
// Example, a counter component, that have a button inside, a text, and a state.
// These components are commonly dynamic, using react hooks, but still front-end.
//? On this example is just a counter component that have a button to increment the count.

import { useCounter } from "@/.examples/hooks/demo";
import { DemoCoreComponent } from "../core/demo";

export function Counter() {
	const { count, increment } = useCounter(0);

	return (
		<div>
			<p>Count: {count}</p>
			<DemoCoreComponent
				label="Increment"
				onClick={increment}
			></DemoCoreComponent>
		</div>
	);
}
