import React from 'react';
import './Input.css';

const Input = (props) => {
  const {type, name, displayErrors} = props;
  const lcName = name.toLowerCase().replace(' ', '-');
  const errorClass = displayErrors ? 'display-errors' : '';

  return (
    <div className="input-group">
      <label htmlFor={lcName} className="login-label">{name}</label>
      <input
        type={type}
        name={lcName}
        className={'login-input ' + errorClass}
        placeholder={name}
        required />
    </div>
  );
};

export default Input;

Input.propTypes = {
  name: String,
  type: String,
  displayErrors: Object,
};
