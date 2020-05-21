import './Input.css';

import PropTypes from 'prop-types';
import React from 'react';

const Input = (props) => {
  const {type, name, displayErrors, placeholder = name} = props;
  const lcName = name.toLowerCase().replace(' ', '-');
  const errorClass = displayErrors ? 'display-errors' : '';

  return (
    <div className="input-group">
      <label htmlFor={lcName} className="login-label">{name}</label>
      <input
        type={type}
        name={lcName}
        className={'login-input ' + errorClass}
        placeholder={placeholder}
        required />
    </div>
  );
};

export default Input;

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  displayErrors: PropTypes.bool,
  placeholder: PropTypes.string,
};
