import React, {useContext, useCallback} from 'react';
import './Header.css';
import SearchTextfield from '../SearchTextfield/SearchTextfield.js';
import Dropdown from '../Dropdown/Dropdown.js';
import HeaderText from '../HeaderText/HeaderText.js';
import {useHistory} from 'react-router-dom';
import app from '../../firebase/base.js';
import {AuthContext} from '../../firebase/Auth.js';
import userIcon from '../../assets/user-icon.svg';
import arrowDownIcon from '../../assets/arrow-down.svg';
import notiIcon from '../../assets/noti-icon.svg';

const Header = () => {
  const history = useHistory();

  const {currentUser} = useContext(AuthContext);
  const isLoggedIn = currentUser ? true : false;

  const handleLogin = useCallback((val) => {
    console.log(val);
    if (val === "Sign Out") {
      signOut();
    } else {
      history.push('/' + val.toLowerCase());
    }
  }, [currentUser, history]);

  const handleNotification = useCallback((val) => {
    console.log(val);
  }, []);

  const signOut = useCallback(() => {
    app.auth().signOut();
    window.location.reload();
  }, []);

  const loginButton = (
    <div className="button-content">
      <img className="svg" src={userIcon} alt="User Icon" />
      <text>
      {currentUser ?
        currentUser.email.substring(0, currentUser.email.indexOf('@')) :
          'Login'}
      </text>
      {currentUser && <img className="svg-arrow" src={arrowDownIcon} alt="Dropdown Icon" />}
    </div>
  );

  const notificationButton = (
    <div className="button-content">
      <img className="svg-noti" src={notiIcon} alt="Nofification Icon" />
    </div>
  );

  return (
    <div className="header-container">
      <div className="login-container">
        <Dropdown
          content={loginButton}
          onChange={val => handleLogin(val)}
          options={["Profile", "Sign Out"]}
          isLoggedIn={isLoggedIn} />
        <Dropdown
          content={notificationButton}
          onChange={val => handleNotification(val)}
          options={["Notification is empty."]}
          isLoggedIn={isLoggedIn} isAlwaysVisible={isLoggedIn} />
      </div>
      <div className="lower-container">
        <div className="logo-container" onClick={() => history.push('/')}>
          <text id="logo-text">Shippose</text>
        </div>

        <div className="menu-container">
          <SearchTextfield />
          <HeaderText
            value="Contact" action={() => history.push('/contact')}
          />
          <HeaderText value="News" action={() => history.push('/news')} />
          <HeaderText
            value="Services" action={() => history.push('/services')}
          />
          <HeaderText value="About" action={() => history.push('/about')} />
        </div>
      </div>
    </div>
  );
};

export default Header;
