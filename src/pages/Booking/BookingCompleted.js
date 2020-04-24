import React from 'react';
import './BookingCompleted.css';
import completedIcon from '../../assets/success-icon.gif';
import {useHistory} from 'react-router-dom';

import Header from '../../components/Header/Header.js';

const BookingCompleted = () => {
  const history = useHistory();

  return (
    <div class="homepage-container">
      <Header />
      <div class="body-container2">
        <img class="gif" src={completedIcon} alt="Success!" />
        <text class="success-text">Successfully booked!</text>
        <text class="success-text-small">
          We will get back to you as soon as
          possible with booking confirmation ☺
        </text>
        <div>
          <button
            class="result-button"
            id="left-button"
            onClick={() => history.push('/schedule')}
          >
            Book More
          </button>
          <button
            class="result-button"
            onClick={() => {}}
          >
            Track Process
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCompleted;
