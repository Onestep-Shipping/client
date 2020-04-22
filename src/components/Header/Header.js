import React from 'react';
import './Header.css';
import SearchTextfield from '../SearchTextfield/SearchTextfield.js';
import HeaderText from '../HeaderText/HeaderText.js';
import {useHistory} from 'react-router-dom';
import userIcon from '../../assets/user-icon.svg';

const Header = () => {
  const history = useHistory();

  return (
    <div class="header-container">
      <div class="login-container">
        <button
          class="user-button"
          onClick={(e) => history.push('/auth')}
        >
          <img class="svg" src={userIcon} />
          <text>Login</text>
        </button>
      </div>

      <div class="lower-container">
        <div class="logo-container" onClick={(e) => history.push('/')}>
          <text id="logo-text">Shippose</text>
        </div>

        <div class="menu-container">
          <SearchTextfield />
          <HeaderText
            value="Contact" action={(e) => history.push('/contact')}
          />
          <HeaderText value="News" action={(e) => history.push('/news')} />
          <HeaderText
            value="Services" action={(e) => history.push('/services')}
          />
          <HeaderText value="About" action={(e) => history.push('/about')} />
        </div>
      </div>
    </div>
  );
};

export default Header;
