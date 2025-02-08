import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { DirectionType } from "../lib/types";
import { useJobItemsContext } from "../contexts/JobItemsContextProvider";

export default function PaginationControls() {
	const { handlePageChange, currentPage, totalNumberOfPages } =
		useJobItemsContext();
	return (
		<section className="pagination">
			{currentPage > 1 && (
				<PaginationButton
					currentPage={currentPage}
					direction="previous"
					onClick={() => handlePageChange("previous")}
				/>
			)}
			{currentPage < totalNumberOfPages && (
				<PaginationButton
					currentPage={currentPage}
					direction="next"
					onClick={() => handlePageChange("next")}
				/>
			)}
		</section>
	);
}

type PaginationButtonProps = {
	currentPage: number;
	direction: DirectionType;
	onClick: () => void;
};

function PaginationButton({
	currentPage,
	direction,
	onClick,
}: PaginationButtonProps) {
	return (
		<button
			onClick={(e) => {
				onClick();
				e.currentTarget.blur();
			}}
			className={`pagination__button pagination__button--${direction}`}
		>
			{direction === "previous" && (
				<>
					<ArrowLeftIcon />
					Page {currentPage - 1}
				</>
			)}
			{direction === "next" && (
				<>
					Page {currentPage + 1} <ArrowRightIcon />
				</>
			)}
		</button>
	);
}
