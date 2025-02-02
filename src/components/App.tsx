import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import { useState } from "react";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useActiveId, useJobItem, useJobItems } from "../lib/hooks";

function App() {
	const [searchInput, setSearchInput] = useState("");
	const [jobs, isLoading] = useJobItems(searchInput);
	const activeId = useActiveId();
	const jobItem = useJobItem(activeId);

	return (
		<>
			<Background />
			<Header>
				<div className="header__top">
					<Logo />
					<BookmarksButton />
				</div>
				<SearchForm searchInput={searchInput} setSearchInput={setSearchInput} />
			</Header>
			<Container>
				<Sidebar>
					<div className="sidebar__top">
						<ResultsCount />
						<SortingControls />
					</div>
					<JobList jobs={jobs} isLoading={isLoading} />
					<PaginationControls />
				</Sidebar>
				<JobItemContent />
			</Container>
			<Footer />
		</>
	);
}

export default App;
