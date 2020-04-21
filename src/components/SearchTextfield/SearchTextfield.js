import React from 'react';
import './SearchTextfield.css';
import searchIcon from '../../assets/search-icon.png';

const SearchTextfield = () => {
  return (
    <div class="search-container">
      <input type="text" id="search" placeholder="Search" />
      <button id="search-button">
        <img src={searchIcon} alt="Search Icon" id="search-icon" />
      </button>
    </div>
  );
};

export default SearchTextfield;
