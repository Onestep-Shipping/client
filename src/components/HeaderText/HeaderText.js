import './HeaderText.css';

import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const HeaderText = (props) => {
  const {value} = props;
  const history = useHistory();

  const handleClick = () => {
    history.push('/' + value.toLowerCase());
  }

  return (
    <div className="header-text-container" onClick={handleClick}>
      <span className="header-text">{value}</span>
    </div>
  );
};

export default HeaderText;

HeaderText.propTypes = {
  value: PropTypes.string,
};