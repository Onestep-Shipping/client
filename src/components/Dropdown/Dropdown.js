import './Dropdown.css';

import React, {useCallback, useEffect, useRef, useState} from 'react';

import AuthModal from '../AuthModal/AuthModal.js';
import PropTypes from 'prop-types';

const Dropdown = (props) => {
  const node = useRef();
  const [open, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    type = '', 
    content, 
    options = [], 
    onChange, 
    isLoggedIn = false, 
    customStyle = null,
  } = props;

  const openModal = () => {
    setModalOpen(true);
  }
 
  const closeModal = () => {
    setModalOpen(false);
  }

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
      openModal();
    }
  }

  return (
    <div ref={node} className="login-container">
      <button className="user-button" onClick={handleAuth}>
        {content}
      </button>
      {open && (
        <ul style={customStyle}
          className="dropdown-menu">
          {options.map((opt, ind) => (
            <li className="dropdown-menu-item" key={ind} onClick={() => handleChange(opt)}>
              {opt}
            </li>
          ))}
        </ul>
      )}
      <AuthModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        type={type} />
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  type: PropTypes.string,
  content: PropTypes.element,
  options: PropTypes.array,
  onChange: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  customStyle: PropTypes.object,
};

