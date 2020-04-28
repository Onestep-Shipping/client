import React, {useContext, useCallback} from 'react';
import './Header.css';
import SearchTextfield from '../SearchTextfield/SearchTextfield.js';
import Dropdown from '../Dropdown/Dropdown.js';
import HeaderText from '../HeaderText/HeaderText.js';
import { useHistory } from 'react-router-dom';
import app from '../../firebase/base.js';
import { AuthContext } from '../../context/AuthContext.js';
import registerIcon from '../../assets/register-icon.svg';
import loginIcon from '../../assets/login-icon.svg';
import arrowDownIcon from '../../assets/arrow-down.svg';
import notiIcon from '../../assets/noti-icon.svg';

import NOTIFICATIONS from '../../data/NotificationData.js';

const ADMIN_OPTIONS = ["Companies", "Booking Request", "BOL Instruction", "Invoice", "Sign Out"];
const USER_OPTIONS = ["My Booking", "Sign Out"];

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
        <div onClick={() => history.push('/')}>
          <text className="logo-text">OneStep Ocean</text>
        </div>

        <div className="menu-container">
          <div className="login-container">
            <Dropdown
              type={'register'}
              content={userButton('Register', registerIcon)}
              onChange={val => handleLogin(val)}
              isLoggedIn={isLoggedIn} isAlwaysVisible={!isLoggedIn} />
            <Dropdown
              content={userButton('Login', loginIcon)}
              type={'login'}
              onChange={val => handleLogin(val)}
              options={isAdmin ? ADMIN_OPTIONS : USER_OPTIONS}
              isLoggedIn={isLoggedIn} />
            <Dropdown
              content={notificationButton}
              onChange={val => handleNotification(val)}
              options={NOTIFICATIONS.length > 0 ? NOTIFICATIONS : ["Notification is empty."]}
              isLoggedIn={isLoggedIn} isAlwaysVisible={isLoggedIn} 
              customStyle={notificationCustomStyle} />
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
