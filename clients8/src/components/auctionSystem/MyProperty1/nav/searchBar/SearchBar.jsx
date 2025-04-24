import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchBar.scss';
import { AppContext } from '../../../../../context/context';

export function SearchBar() {
  const { serverUrl, searchString, setSearchString, properties, setProperties, getProperties } = useContext(AppContext);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchString || searchString.trim().length < 3) {
      alert("Search string must be at least 3 characters.");
      return;
    }

    navigate('/view');
    getProperties();
  };

  return (
    <div className="searchBarWrapper">
      <div className="mobileMenu">
        <div className="hamburger" onClick={() => setShowDropdown(!showDropdown)}>
          &#9776; {/* Unicode for hamburger menu */}
        </div>
        {showDropdown && (
          <ul className="dropdownMenu">
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/assets')}>Assets</li>
            <li onClick={() => navigate('/profile')}>Profile Settings</li>
            <li onClick={() => navigate('/about')}>About</li>
          </ul>
        )}
      </div>

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
    </div>
  );
}
