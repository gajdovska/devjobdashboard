type SearchFormType = {
	setSearchInput: (input: string) => void;
	searchInput: string;
};

export default function SearchForm({
	setSearchInput,
	searchInput,
}: SearchFormType) {
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
					setSearchInput(e.target.value);
				}}
				placeholder="Find remote developer jobs..."
			/>
		</form>
	);
}
