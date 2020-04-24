import React from 'react';
import './HeaderText.css';
import PropTypes from 'prop-types';

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
  value: PropTypes.string,
  action: PropTypes.func
};