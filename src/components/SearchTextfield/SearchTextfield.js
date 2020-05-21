import './SearchTextfield.css';

import PropTypes from 'prop-types';
import React from 'react';
import searchIcon from '../../assets/search-icon.png';

const SearchTextfield = props => {
  const { placeholder = "Search" } = props;
  return (
    <div className="search-container">
      <input type="text" id="search" placeholder={placeholder} />
      <button id="search-button">
        <img src={searchIcon} alt="Search Icon" id="search-icon" />
      </button>
    </div>
  );
};

export default SearchTextfield;

SearchTextfield.propTypes = {
  placeholder: PropTypes.string,
};