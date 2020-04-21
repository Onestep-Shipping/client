import React from 'react';
import './Header.css';
import SearchTextfield from '../SearchTextfield/SearchTextfield.js';
import HeaderText from '../HeaderText/HeaderText.js';

const Header = () => {
  return (
    <div class="header-container">
      <div class="login-n-register-container">
        <button class="user-button" id="register-button">Register</button>
        <button class="user-button" id="login-button">Login</button>
      </div>

      <div class="lower-container">
        <div class="logo-container">
          <text id="logo-text">Shippose</text>
        </div>

        <div class="menu-container">
          <SearchTextfield />
          <HeaderText value="Contact" />
          <HeaderText value="News" />
          <HeaderText value="Services" />
          <HeaderText value="About" />
        </div>
      </div>
    </div>
  );
};

export default Header;
