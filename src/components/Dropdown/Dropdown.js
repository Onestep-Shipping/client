import React, {useState, useEffect, useRef, useCallback} from 'react';
import './Dropdown.css';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

const Dropdown = (props) => {
  const node = useRef();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const {content, options, onChange, isLoggedIn = false, isAlwaysVisible = true} = props;

  const measuredRef = useCallback((e) => {
    if (node.current && !node.current.contains(e.target)) {
      setOpen(false);
    }
  }, []);

  const handleChange = selectedValue => {
    onChange(selectedValue);
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', measuredRef);

    return () => {
      document.removeEventListener('mousedown', measuredRef);
    };
  }, [measuredRef]);

  const handleAuth = () => {
    if (isLoggedIn) {
      setOpen(!open);
    } else {
      history.push('/auth');
    }
  }

  if (!isAlwaysVisible) {
    return <div />;
  }

  return (
    <div ref={node} className="login-container">
      <button className="user-button" onClick={handleAuth}>
        {content}
      </button>
      {open && (
        <ul className="dropdown-menu">
          {options.map((opt, ind) => (
            <li className="dropdown-menu-item" key={ind} onClick={() => handleChange(opt)}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  content: PropTypes.element,
  options: PropTypes.array,
  onChange: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  isAlwaysVisible: PropTypes.bool
};

