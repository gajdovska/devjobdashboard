import React, { createContext, useContext } from "react";
import { useJobItems, useLocalStorage } from "../lib/hooks";
import { JobItemResponse } from "../lib/types";

type BookmarksContextType = {
	bookmarkedIds: number[];
	handleToggleBookmark: (id: number) => void;
	bookmarkedJobItems: JobItemResponse[];
	isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContextType | null>(
	null
);

export default function BookmarksContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
		"bookmarkedIds",
		[]
	);

	const { jobs: bookmarkedJobItems, isLoading } = useJobItems(bookmarkedIds);

	const handleToggleBookmark = (id: number) => {
		if (bookmarkedIds.includes(id)) {
			setBookmarkedIds((prev) =>
				prev.filter((bookmarkedId) => bookmarkedId !== id)
			);
		} else {
			setBookmarkedIds((prev) => [...prev, id]);
		}
	};

	return (
		<BookmarksContext.Provider
			value={{
				bookmarkedIds,
				handleToggleBookmark,
				bookmarkedJobItems,
				isLoading,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	);
}

export function useBookmarksContext() {
	const context = useContext(BookmarksContext);
	if (!context) {
		throw new Error("useContext must be used inside withing context provider");
	}

	return context;
}
