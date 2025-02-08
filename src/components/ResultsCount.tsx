import { useJobItemsContext } from "../contexts/JobItemsContextProvider";

export default function ResultsCount() {
	const { totalNumberOfResults } = useJobItemsContext();
	return <p className="count">{totalNumberOfResults} results</p>;
}
