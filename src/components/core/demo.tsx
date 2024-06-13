"use client";

// Core components are the most low-level components in the application.
// Example, buttons, inputs, typography, etc.
//? On this example is just a button that received a label and a onClick function.

interface DemoCoreComponentProps {
	label: string;
	onClick: () => void;
}

export function DemoCoreComponent({ label, onClick }: DemoCoreComponentProps) {
	return <button onClick={onClick}>{label}</button>;
}
