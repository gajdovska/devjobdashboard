import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useRef, useState } from "react";
import { useOnClickOutside } from "../lib/hooks";

export default function BookmarksButton() {
	const [toggleBookmarkPopover, setToggleBookmarkPopover] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	useOnClickOutside([buttonRef, containerRef], () => {
		console.log("inside");
		setToggleBookmarkPopover(false);
	});

	return (
		<section>
			<button
				ref={buttonRef}
				className="bookmarks-btn"
				onClick={() => setToggleBookmarkPopover((prev) => !prev)}
			>
				Bookmarks <TriangleDownIcon />
			</button>
			{toggleBookmarkPopover && <BookmarksPopover ref={containerRef} />}
		</section>
	);
}
