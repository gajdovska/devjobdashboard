import { useJobItemsContext } from "../contexts/JobItemsContextProvider";
import JobList from "./JobList";

export default function JobListSearch() {
	const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();

	return <JobList jobs={jobItemsSortedAndSliced || []} isLoading={isLoading} />;
}
