import React from 'react';
import './HeaderText.css';

const HeaderText = (props) => {
  const {value, action} = props;

  return (
    <div class="header-text-container" onClick={action}>
      <text class="header-text">{value}</text>
    </div>
  );
};

export default HeaderText;
