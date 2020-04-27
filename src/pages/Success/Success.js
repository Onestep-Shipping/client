import React from 'react';
import './Success.css';
import completedIcon from '../../assets/success-icon.gif';
import {useHistory, useParams} from 'react-router-dom';

import Header from '../../components/Header/Header.js';

const Success = () => {
  const history = useHistory();
  const { type } = useParams();

  let message = "Successfully ";
  let waitingFor = "";

  if (type.startsWith("booking")) {
    message += "booked!";
    waitingFor = "booking confirmation";
  } else if (type.startsWith("bol")) {
    message += "sent!";
    waitingFor = "bill of lading";
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <img className="gif" src={completedIcon} alt="Success!" />
        <text className="success-text">{message}</text>
        <text className="success-text-small">
          We will get back to you as soon as
          possible with {waitingFor} ☺
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

export default Success;
