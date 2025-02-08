import React, { createContext, useContext, useState } from "react";
import { useSearchQuery } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortBy, DirectionType, JobItem } from "../lib/types";
import { useSearchTextContext } from "./SearchTextContextProvider";

type JobItemsContextType = {
	jobs: JobItem[] | undefined;
	jobItemsSortedAndSliced: JobItem[] | undefined;
	isLoading: boolean;
	totalNumberOfResults: number;
	totalNumberOfPages: number;
	currentPage: number;
	sortBy: SortBy;
	handlePageChange: (direction: DirectionType) => void;
	handleSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

export default function JobItemsContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { debouncedValue } = useSearchTextContext();
	const { jobs, isLoading } = useSearchQuery(debouncedValue);
	const [sortBy, setSortBy] = useState<SortBy>("relevant");
	const [currentPage, setCurrentPage] = useState(1);

	const totalNumberOfResults = jobs?.length || 0;
	const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

	const jobItemsSorted =
		[...(jobs || [])]?.sort((a, b) => {
			if (sortBy === "relevant") {
				return b.relevanceScore - a.relevanceScore;
				// if it is a positive number, b will be set higher
				// negative means that a will be set higher
			} else {
				return a.daysAgo - b.daysAgo;
				// because if it is a higher number it should be lower
			}
		}) || [];

	const jobItemsSortedAndSliced =
		jobItemsSorted?.slice(
			currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
			currentPage * RESULTS_PER_PAGE
		) || [];

	const handlePageChange = (direction: DirectionType) => {
		if (direction === "previous") {
			setCurrentPage((prev) => prev - 1);
		} else if (direction === "next") {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const handleSortBy = (sortBy: SortBy) => {
		setSortBy(sortBy);
		setCurrentPage(1);
	};

	return (
		<JobItemsContext.Provider
			value={{
				jobs,
				jobItemsSortedAndSliced,
				isLoading,
				totalNumberOfResults,
				totalNumberOfPages,
				currentPage,
				sortBy,
				handlePageChange,
				handleSortBy,
			}}
		>
			{children}
		</JobItemsContext.Provider>
	);
}

export function useJobItemsContext() {
	const context = useContext(JobItemsContext);
	if (!context) {
		throw new Error("useContext must be used inside withing context provider");
	}

	return context;
}
