import React, {useContext} from 'react';
import './Header.css';
import SearchTextfield from '../SearchTextfield/SearchTextfield.js';
import HeaderText from '../HeaderText/HeaderText.js';
import {useHistory} from 'react-router-dom';
import userIcon from '../../assets/user-icon.svg';
import app from '../../firebase/base.js';
import {AuthContext} from '../../firebase/Auth.js';

const Header = () => {
  const history = useHistory();

  const {currentUser} = useContext(AuthContext);

  console.log(currentUser);

  const handleLogin = () => {
    if (currentUser) {
      app.auth().signOut();
    } else {
      history.push('/auth');
    }
  };

  return (
    <div class="header-container">
      <div class="login-container">
        <button id="login-button" class="user-button" onClick={handleLogin}>
          <img class="svg" src={userIcon} />
          <text>
            {currentUser ?
              currentUser.email.substring(0, currentUser.email.indexOf('@')) :
              'Login'}
          </text>
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
