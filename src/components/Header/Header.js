import React, {useContext, useCallback} from 'react';
import './Header.css';
import SearchTextfield from '../SearchTextfield/SearchTextfield.js';
import Dropdown from '../Dropdown/Dropdown.js';
import HeaderText from '../HeaderText/HeaderText.js';
import {useHistory} from 'react-router-dom';
import app from '../../firebase/base.js';
import {AuthContext} from '../../firebase/Auth.js';
import registerIcon from '../../assets/register-icon.svg';
import loginIcon from '../../assets/login-icon.svg';
import arrowDownIcon from '../../assets/arrow-down.svg';
import notiIcon from '../../assets/noti-icon.svg';

const NOTIFICATIONS = [];

const Header = () => {
  const history = useHistory();

  const {currentUser} = useContext(AuthContext);
  const isLoggedIn = currentUser ? true : false;


  const handleNotification = useCallback((val) => {
    console.log(val);
  }, []);

  const signOut = useCallback(() => {
    app.auth().signOut();
  }, []);
  
  const handleLogin = useCallback((val) => {
    if (val === "Sign Out") {
      signOut();
    } else {
      history.push('/profile');
    }
  }, [history, signOut]);

  const userButton = (name, icon) => {return (
    <div className="button-content">
      <img className="svg" src={icon} alt="User Icon" />
      <text>
      {currentUser ?
        currentUser.email.substring(0, currentUser.email.indexOf('@')) : name}
      </text>
      {currentUser && <img className="svg-arrow" src={arrowDownIcon} alt="Dropdown Icon" />}
    </div>
  )};

  const notificationButton = (
    <div className="button-content">
      <img className="svg-noti" src={notiIcon} alt="Nofification Icon" />
      {NOTIFICATIONS.length > 0 && <div className="red-dot" />}
    </div>
  );

  return (
    <div className="header-container">
      <div className="login-container">
        <Dropdown
          type={'register'}
          content={userButton('Register', registerIcon)}
          oonChange={val => handleLogin(val)}
          isLoggedIn={isLoggedIn} isAlwaysVisible={!isLoggedIn} />
        <Dropdown
          content={userButton('Login', loginIcon)}
          type={'login'}
          onChange={val => handleLogin(val)}
          options={["My Booking", "Sign Out"]}
          isLoggedIn={isLoggedIn} />
        <Dropdown
          content={notificationButton}
          onChange={val => handleNotification(val)}
          options={NOTIFICATIONS.length > 0 ? NOTIFICATIONS : ["Notification is empty."]}
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
