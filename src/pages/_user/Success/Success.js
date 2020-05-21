import './Success.css';

import {useHistory, useParams} from 'react-router-dom';

import Header from '../../../components/Header/Header.js';
import React from 'react';
import completedIcon from '../../../assets/success-icon.gif';

const Success = () => {
  const history = useHistory();
  const { type } = useParams();

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <img className="gif" src={completedIcon} alt="Success!" />
        <text className="success-text">
          Successfully {type === "booking" ? "booked" : "submitted"}!
        </text>
        <text className="success-text-small">
          We will get back to you as soon as possible with {type === "booking" ? 
          "booking confirmation" : "bill of lading"} ☺
        </text>
        <div>
          <button
            className="result-button"
            id="left-button"
            onClick={() => history.push('/schedule')}>
            Book More
          </button>
          <button
            className="result-button"
            onClick={() => history.push('/profile')}>
            Track Process
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
