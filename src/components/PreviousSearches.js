import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


export default function PreviousSearches({
  searchInput,
  onSearchChange,
  onSearchSubmit,
}) {
  return (
    <div className="previous-searches section">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search ..."
          value={searchInput}
          onChange={onSearchChange}
        />
        <button className="btn" onClick={onSearchSubmit}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}