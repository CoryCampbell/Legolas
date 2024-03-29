import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassDollar } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const searchBarRef = useRef(null);

	useEffect(() => {
		const handleClickOutsideSearchBar = (e) => {
			if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
				setShowResults(false);
			}
		};

		// Add the event listener when the component mounts
		document.addEventListener("click", handleClickOutsideSearchBar);

		// Clean up the event listener when the component unmounts
		return () => {
			document.removeEventListener("click", handleClickOutsideSearchBar);
		};
	}, []); // No dependencies, so it only runs once on mount

	const handleSearch = (e) => {
		setQuery(e.target.value);
		if (e.target.value.trim()) {
			fetch(`/api/search/search_companies?query=${encodeURIComponent(e.target.value)}`)
				.then((res) => res.json())
				.then((data) => setResults(data))
				.catch((err) => console.error(err));

			setShowResults(true); // Show results when there is a search query
		} else {
			setResults([]);
			setShowResults(false); // Hide results when the search query is empty
		}
	};

	const handleShowResults = () => {
		setShowResults(false);
		setQuery("");
		setResults([]);
	};

	return (
		<div className="search-container" ref={searchBarRef}>
			<div className="search-bar">
				<FontAwesomeIcon icon={faMagnifyingGlassDollar} />
				<input type="text" value={query} placeholder="search" onChange={handleSearch} />
			</div>
			{showResults && (
				<div className="search-results">
					{results.map((company) => (
						<NavLink
							className="result-link"
							key={company.id}
							to={`/companies/${company.id}`}
							onClick={handleShowResults}
						>
							{company.symbol} - {company.name}
						</NavLink>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
