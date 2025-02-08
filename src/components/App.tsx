import Background from "./Background";
import Container from "./Container";
import Header from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import PaginationControls from "./PaginationControls";
import { Toaster } from "react-hot-toast";
import JobListSearch from "./JobListSearch";

function App() {
	return (
		<>
			<Background />
			<Header>
				<div className="header__top">
					<Logo />
					<BookmarksButton />
				</div>
				<SearchForm />
			</Header>
			<Container>
				<Sidebar>
					<div className="sidebar__top">
						<ResultsCount />
						<SortingControls />
					</div>
					<JobListSearch />
					<PaginationControls />
				</Sidebar>
				<JobItemContent />
			</Container>
			<Toaster position="top-right" />
		</>
	);
}

export default App;
