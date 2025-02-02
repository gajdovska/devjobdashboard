import { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({
	jobs,
	isLoading,
}: {
	jobs: JobItem[];
	isLoading: boolean;
}) {
	return (
		<>
			<ul className="job-list">
				{isLoading && <Spinner />}
				{!isLoading && jobs.map((job) => <JobListItem job={job} />)}
			</ul>
		</>
	);
}

export default JobList;
