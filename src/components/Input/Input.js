import React from 'react';
import './Input.css';

const Input = (props) => {
  const {type, value, name, displayErrors} = props;
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
        onChange={(e) => props.onChange(e)}
        value={value}
        required/>
    </div>
  );
};

export default Input;

Input.propTypes = {
  name: String,
  type: String,
  value: String,
  displayErrors: Object,
  onChange: Function
};
