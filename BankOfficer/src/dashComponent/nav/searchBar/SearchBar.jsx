import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.scss';
import { AppContext } from '../../../context/context';

export function SearchBar() {
  const {
    serverUrl,
    searchString,
    setSearchString,
    properties,
    setProperties,
    getProperties,
  } = useContext(AppContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchString || searchString.trim().length < 3) {
      alert('Search string must be at least 3 characters.');
      return;
    }
    navigate('/view');
    getProperties();
  };

  return (
    <div className="searchBarContainer">
      {/* Hamburger Menu */}
      <div className="hamburgerWrapper">
        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Open menu"
        >
          ☰
        </button>
        {menuOpen && (
          <ul className="dropdownMenu">
            <li onClick={() => navigate('/')}>Profile</li>
            <li onClick={() => navigate('/dashboard')}>Dashboard</li>
            <li onClick={() => navigate('/myAssets')}>Assets</li>
            <li onClick={() => navigate('/profile')}>Profile Settings</li>
          </ul>
        )}
      </div>

      {/* Search Input */}
      <form role="search" className="searchInputWrapper" onSubmit={handleSubmit}>
        <img loading="lazy" src="/search.png" className="searchIcon" alt="Search Icon" />
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
