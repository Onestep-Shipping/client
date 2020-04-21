import React from 'react';
import './HeaderText.css';

const HeaderText = (props) => {
  const {value} = props;

  return (
    <div class="header-text-container">
      <text class="header-text">{value}</text>
    </div>
  );
};

export default HeaderText;
