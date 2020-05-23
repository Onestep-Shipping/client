import './Header.css';

import { ADMIN_OPTIONS, USER_OPTIONS } from '../../constants/DropdownConstants.js';
import React, {useCallback, useContext} from 'react';

import { AuthContext } from '../../context/AuthContext.js';
import Dropdown from '../Dropdown/Dropdown.js';
import HeaderText from '../HeaderText/HeaderText.js';
import NOTIFICATIONS from '../../data/NotificationData.js';
import SearchTextfield from '../SearchTextfield/SearchTextfield.js';
import app from '../../firebase/base.js';
import arrowDownIcon from '../../assets/arrow-down.svg';
import loginIcon from '../../assets/login-icon.svg';
import notiIcon from '../../assets/noti-icon.svg';
import registerIcon from '../../assets/register-icon.svg';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  const { currentUser, isAdmin } = useContext(AuthContext);
  const isLoggedIn = currentUser ? true : false;

  const handleNotification = useCallback((val) => {
    console.log(val);
  }, []);

  const signOut = useCallback(() => {
    app.auth().signOut();
    history.push('/');
  }, [history]);

    const handleAdminRedirect = useCallback((val) => {
    const lcName = val.toLowerCase().replace(' ', '-');
    history.push("/admin/" + lcName);
  }, [history]);
  
  const handleLogin = useCallback((val) => {
    switch (val) {
      case "My Booking":
        history.push('/profile');
        break;
      case "Sign Out":
        signOut();
        break;
      default:
        handleAdminRedirect(val);
        break;
    }
  }, [history, signOut, handleAdminRedirect]);

  const notificationCustomStyle = {
    width: '250px',
    height: '250px', 
    overflowY: 'scroll'
  }

  const userButton = (name, icon) => {return (
    <div className="button-content" id={name === "Login" ? "add-margin" : ""}>
      <img className="svg" src={icon} alt="User Icon" />
      <span>
      {currentUser ?
        currentUser.email.substring(0, currentUser.email.indexOf('@')) : name}
      </span>
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
      <div onClick={() => history.push('/')}>
        <span className="logo-text">OneStep Shipping</span>
      </div>

      <div className="menu-container">
        <div className="login-container">
          <Dropdown
            content={userButton('Login', loginIcon)}
            type={'login'}
            onChange={val => handleLogin(val)}
            options={isAdmin ? ADMIN_OPTIONS : USER_OPTIONS}
            isLoggedIn={isLoggedIn} />
          {!isLoggedIn &&
          <Dropdown
            type={'register'}
            content={userButton('Register', registerIcon)}
            onChange={val => handleLogin(val)}
            isLoggedIn={isLoggedIn} 
          />}
          {isLoggedIn &&
          <Dropdown
            type={'noti'}
            content={notificationButton}
            onChange={val => handleNotification(val)}
            options={NOTIFICATIONS.length > 0 ? NOTIFICATIONS : ["Notification is empty."]}
            isLoggedIn={isLoggedIn}
            customStyle={notificationCustomStyle} 
          />}
        </div>
        <SearchTextfield />
        <HeaderText value="Contact" action={() => history.push('/contact')} />
        <HeaderText value="News" action={() => history.push('/news')} />
        <HeaderText value="Services" action={() => history.push('/services')} />
        <HeaderText value="About" action={() => history.push('/about')} />
      </div>
    </div>
  );
};

export default Header;
