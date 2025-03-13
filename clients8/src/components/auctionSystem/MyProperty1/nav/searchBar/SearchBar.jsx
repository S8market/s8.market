import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchBar.scss';
import { AppContext } from '../../../../../context/context';

export function SearchBar() {
  
  const { serverUrl, searchString, setSearchString, properties, setProperties, getProperties } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the search string length.
    if (!searchString || searchString.trim().length < 3) {
      alert("Search string must be at least 3 characters.");
      return;
    }

    // Navigate to '/view'
    navigate('/view');

    getProperties()
  };

  return (
    <form role="search" className="searchInputWrapper" onSubmit={handleSubmit}>
      <img
        loading="lazy"
        src="/search.png"
        className="searchIcon"
        alt="Search Icon"
      />
      <label htmlFor="searchInput" className="visually-hidden">
        Search for anything
      </label>
      <input
        type="search"
        id="searchInput"
        className="searchInput"
        placeholder="Search location/pincode..."
        aria-label="Search for anything"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </form>
  );
}
