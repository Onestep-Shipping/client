import React, {useState, useContext, useEffect, useRef} from 'react';
import './Dropdown.css';
import userIcon from '../../assets/user-icon.svg';
import arrowDownIcon from '../../assets/arrow-down.svg';
import {useHistory} from 'react-router-dom';
import app from '../../firebase/base.js';
import {AuthContext} from '../../firebase/Auth.js';

const Dropdown = () => {
  const node = useRef();
  const [displayMenu, setDisplayMenu] = useState(false);
  const history = useHistory();

  const {currentUser} = useContext(AuthContext);

  const handleChange = (e) => {
    if (!node.current.contains(e.target)) {
      setDisplayMenu(false);
    }
  };

  const handleLogin = (e) => {
    setDisplayMenu(false);
    if (currentUser) {
      setDisplayMenu(!displayMenu);
    } else {
      history.push('/auth');
    }
  };

  const signOut = () => {
    setDisplayMenu(false);
    app.auth().signOut();
    window.location.reload();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleChange);

    return () => {
      document.removeEventListener('mousedown', handleChange);
    };
  }, []);

  return (
    <div ref={node} class="login-container">
      <button id="login-button" class="user-button" onClick={handleLogin}>
        <img class="svg" src={userIcon} />
        <text>
          {currentUser ?
            currentUser.email.substring(0, currentUser.email.indexOf('@')) :
            'Login'}
        </text>
        {currentUser && <img class="svg-arrow" src={arrowDownIcon} />}
      </button>
      {displayMenu &&
        <ul>
          <li>Profile</li>
          <li>Tracking</li>
          <li onClick={signOut}>Sign Out</li>
        </ul>
      }
    </div>
  );
};

export default Dropdown;
