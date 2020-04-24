import React from 'react';
import './Header.css';
import SearchTextfield from '../SearchTextfield/SearchTextfield.js';
import Dropdown from '../Dropdown/Dropdown.js';
import HeaderText from '../HeaderText/HeaderText.js';
import {useHistory} from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  return (
    <div className="header-container">
      <Dropdown />
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
