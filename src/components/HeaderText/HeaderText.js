import './HeaderText.css';

import PropTypes from 'prop-types';
import React from 'react';

const HeaderText = (props) => {
  const {value, action} = props;

  return (
    <div className="header-text-container" onClick={action}>
      <span className="header-text">{value}</span>
    </div>
  );
};

export default HeaderText;

HeaderText.propTypes = {
  value: PropTypes.string,
  action: PropTypes.func
};