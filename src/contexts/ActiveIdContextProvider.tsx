import React, { createContext, useContext } from "react";
import { useActiveId } from "../lib/hooks";

type ActiveIdContextType = {
	activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextType | null>(null);

export default function ActiveIdContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const activeId = useActiveId();

	return (
		<ActiveIdContext.Provider
			value={{
				activeId,
			}}
		>
			{children}
		</ActiveIdContext.Provider>
	);
}

export function useActiveIdContext() {
	const context = useContext(ActiveIdContext);
	if (!context) {
		throw new Error("useContext must be used inside withing context provider");
	}

	return context;
}
