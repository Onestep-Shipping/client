import React from 'react';
import './SearchTextfield.css';
import searchIcon from '../../assets/search-icon.png';
import PropTypes from 'prop-types';

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