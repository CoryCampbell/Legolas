import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlassDollar } from "@fortawesome/free-solid-svg-icons";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

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

  return (
    <div className="search-bar">
      <FontAwesomeIcon icon={faMagnifyingGlassDollar} />
      <input
        type="text"
        value={query}
        placeholder="search"
        onChange={handleSearch}
      />
      <div>
        {results.map((company) => (
          <div key={company.id}>
            {company.name} ({company.symbol})
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
