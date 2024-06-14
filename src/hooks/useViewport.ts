"use client";

import { useState, useEffect } from "react";

export function useViewport() {
	const [width, setWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 0,
	);
	const [height, setHeight] = useState(
		typeof window !== "undefined" ? window.innerHeight : 0,
	);

	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleResize = () => {
			setWidth(window.innerWidth);
			setHeight(window.innerHeight);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return { width, height };
}
