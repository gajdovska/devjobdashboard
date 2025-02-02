import { useState, useEffect } from "react";
import { JobItem } from "./types";
import { BASE_API_URL } from "./constants";

export const useJobItems = (searchInput: string) => {
	const [jobs, setJobs] = useState<JobItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const jobSliced = jobs.slice(0, 7);

	useEffect(() => {
		if (!searchInput) return;
		setIsLoading(true);
		const fetchJobs = async () => {
			const data = await fetch(`${BASE_API_URL}?search=${searchInput}`);
			const jobsData = await data.json();
			console.log(jobsData);
			setIsLoading(false);
			setJobs(jobsData.jobItems);
		};

		fetchJobs();
	}, [searchInput]);

	return [jobSliced, isLoading] as const;
};

export const useJobItem = (id: number | null) => {
	const [jobItem, setJobItem] = useState(null);

	useEffect(() => {
		if (!id) return;
		const getJobItem = async () => {
			const data = await fetch(`${BASE_API_URL}/${id}`);
			const job = await data.json();
			setJobItem(job.jobItem);
		};

		getJobItem();
	}, [id]);

	return { jobItem };
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
