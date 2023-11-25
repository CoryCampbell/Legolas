import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassDollar } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // console.log("result--------->", results);

  useEffect(() => {
    setShowResults(true);
  }, [showResults]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim()) {
      fetch(
        `/api/search/search_companies?query=${encodeURIComponent(
          e.target.value
        )}`
      )
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error(err));
    } else {
      setResults([]);
    }
  };

  const handleShowResults = () => {
    setShowResults(false);
    setQuery("");
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
        <input
          type="text"
          value={query}
          placeholder="search"
          onChange={handleSearch}
        />
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
