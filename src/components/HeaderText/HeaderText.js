import React from 'react';
import './HeaderText.css';

const HeaderText = (props) => {
  const {value, action} = props;

  return (
    <div className="header-text-container" onClick={action}>
      <text className="header-text">{value}</text>
    </div>
  );
};

export default HeaderText;

HeaderText.propTypes = {
  value: String,
  action: Function
};