import React, { createContext, useContext, useState } from "react";
import { useDebouncedValue } from "../lib/hooks";

type SearchTextContextType = {
	searchInput: string;
	debouncedValue: string;
	handleChangeSearchText: (newSearchText: string) => void;
};

export const SearchTextContext = createContext<SearchTextContextType | null>(
	null
);

export default function SearchTextContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [searchInput, setSearchInput] = useState("");
	const debouncedValue = useDebouncedValue(searchInput, 1000);

	const handleChangeSearchText = (searchText: string) => {
		setSearchInput(searchText);
	};

	return (
		<SearchTextContext.Provider
			value={{
				searchInput,
				debouncedValue,
				handleChangeSearchText,
			}}
		>
			{children}
		</SearchTextContext.Provider>
	);
}

export function useSearchTextContext() {
	const context = useContext(SearchTextContext);
	if (!context) {
		throw new Error(
			"useSearchContext must be used inside withing context Search Text Context provider"
		);
	}

	return context;
}
