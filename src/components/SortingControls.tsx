import { useJobItemsContext } from "../contexts/JobItemsContextProvider";

export default function SortingControls() {
	const { sortBy, handleSortBy } = useJobItemsContext();

	return (
		<section className="sorting">
			<i className="fa-solid fa-arrow-down-short-wide"></i>

			<SortByButton
				isActive={sortBy === "relevant"}
				onClick={() => handleSortBy("relevant")}
			>
				Relevant
			</SortByButton>
			<SortByButton
				isActive={sortBy === "recent"}
				onClick={() => handleSortBy("recent")}
			>
				Recent
			</SortByButton>
		</section>
	);
}

type SortingButtonProps = {
	children: React.ReactNode;
	onClick: () => void;
	isActive: boolean;
};

function SortByButton({ children, onClick, isActive }: SortingButtonProps) {
	return (
		<button
			className={`sorting__button sorting__button--relevant ${
				isActive ? "sorting__button--active" : ""
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
