import { forwardRef } from "react";
import { useBookmarksContext } from "../contexts/BookmarksContextProvider";
import JobList from "./JobList";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
	const { bookmarkedJobItems, isLoading } = useBookmarksContext();

	return createPortal(
		<div className="bookmarks-popover" ref={ref}>
			<JobList jobs={bookmarkedJobItems} isLoading={isLoading} />
		</div>,
		document.body
	);
});

export default BookmarksPopover;
