"use client";
// Context is the way to pass data through the component tree without having to pass props down manually at every level.
// or to pass data from a down level to an upper level. It is only used at client
//? This example has a context that is used to pass a custom message between components.

import { createContext, useContext, ReactNode, useState } from "react";

type MessageType = string;

type MessageProviderType = {
	message: MessageType;
	setMessage: (message: MessageType) => void;
};

const MessageContext = createContext<MessageProviderType>({
	message: "no-message",
	// biome-ignore lint/suspicious/noEmptyBlockStatements: intentionally empty
	setMessage: () => {},
});

export function MessageProvider({ children }: { children: ReactNode }) {
	const [message, setMessage] = useState<MessageType>("no-message");

	const value = { message, setMessage };

	return (
		<MessageContext.Provider value={value}>{children}</MessageContext.Provider>
	);
}

export function useMessage() {
	const context = useContext(MessageContext);

	return context;
}
