import { useSearchTextContext } from "../contexts/SearchTextContextProvider";

export default function SearchForm() {
	const { searchInput, handleChangeSearchText } = useSearchTextContext();
	return (
		<form
			action="#"
			onSubmit={(e) => {
				e.preventDefault();
			}}
			className="search"
		>
			<button type="submit">
				<i className="fa-solid fa-magnifying-glass"></i>
			</button>

			<input
				value={searchInput}
				spellCheck="false"
				type="text"
				required
				onChange={(e) => {
					handleChangeSearchText(e.target.value);
				}}
				placeholder="Find remote developer jobs..."
			/>
		</form>
	);
}
