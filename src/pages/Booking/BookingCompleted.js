import React from 'react';
import './BookingCompleted.css';
import completedIcon from '../../assets/success-icon.gif';
import {useHistory} from 'react-router-dom';

import Header from '../../components/Header/Header.js';

const BookingCompleted = () => {
  const history = useHistory();

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <img className="gif" src={completedIcon} alt="Success!" />
        <text className="success-text">Successfully booked!</text>
        <text className="success-text-small">
          We will get back to you as soon as
          possible with booking confirmation ☺
        </text>
        <div>
          <button
            className="result-button"
            id="left-button"
            onClick={() => history.push('/schedule')}
          >
            Book More
          </button>
          <button
            className="result-button"
            onClick={() => history.push('/profile')}
          >
            Track Process
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCompleted;
