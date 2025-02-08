import { useState, useEffect } from "react";
import { JobItem, JobItemResponse } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";

type JobItemsApiResponse = {
	public: boolean;
	sorted: boolean;
	jobItems: JobItem[];
};

const fetchJobItems = async (
	searchInput: string
): Promise<JobItemsApiResponse> => {
	const response = await fetch(`${BASE_API_URL}?search=${searchInput}`);
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.description);
	}
	const jobsData = await response.json();

	return jobsData;
};

export const useSearchQuery = (searchInput: string) => {
	const { data, isInitialLoading } = useQuery(
		["job-items", searchInput],
		() => fetchJobItems(searchInput),
		{
			staleTime: 1000 * 60 * 60,
			enabled: Boolean(searchInput),
			refetchOnWindowFocus: false,
			retry: false,
			onError: handleError,
		}
	);

	return { jobs: data?.jobItems, isLoading: isInitialLoading } as const;
};

export const useActiveId = () => {
	const [activeId, setActiveId] = useState<number | null>(null);

	useEffect(() => {
		const handleHashChange = () => {
			const id = +window.location.hash.slice(1);
			setActiveId(id);
		};

		handleHashChange();

		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);

	return activeId;
};

export const useDebouncedValue = <T>(value: T, delay = 500): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const timerId = setTimeout(() => setDebouncedValue(value), delay);
		return () => clearTimeout(timerId);
	}, [value, delay]);

	return debouncedValue;
};

type JobItemApiResponse = {
	public: boolean;
	jobItem: JobItemResponse;
};

const fetchJobItem = async (id: number | null): Promise<JobItemApiResponse> => {
	const response = await fetch(`${BASE_API_URL}/${id}`);
	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.description);
	}
	const jobData = response.json();

	return jobData;
};

export const useJobItem = (id: number | null) => {
	const { data, isInitialLoading } = useQuery(
		["job-item", id],
		() => fetchJobItem(id),
		{
			staleTime: 1000 * 60 * 60,
			enabled: Boolean(id),
			refetchOnWindowFocus: false,
			retry: false,
			onError: handleError,
		}
	);

	const job = data?.jobItem;
	return { job, isLoading: isInitialLoading } as const;
};

export const useJobItems = (ids: number[]) => {
	const results = useQueries({
		queries: ids.map((id) => ({
			queryKey: ["job-item", id],
			queryFn: () => fetchJobItem(id),
			staleTime: 1000 * 60 * 60,
			enabled: Boolean(id),
			refetchOnWindowFocus: false,
			retry: false,
			onError: handleError,
		})),
	});

	const jobs = results
		.map((result) => result.data?.jobItem)
		.filter((jobItem) => jobItem !== undefined);

	const isLoading = results.some((result) => result.isLoading);

	return { jobs, isLoading };
};

export const useLocalStorage = <T>(
	key: string,
	initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [value, setValue] = useState(() =>
		JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
	);

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue] as const;
};

export const useOnClickOutside = (
	refs: React.RefObject<HTMLElement>[],
	handler: () => void
) => {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (refs.every((ref) => !ref.current?.contains(e.target as Node))) {
				console.log("check");
				handler();
			}
		};
		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, [refs, handler]);
};
