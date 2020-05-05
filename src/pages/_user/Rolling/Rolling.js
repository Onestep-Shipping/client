import React, { useState, useCallback } from 'react';
import './Rolling.css';

import {useParams, useHistory} from 'react-router-dom';
import Header from '../../../components/Header/Header.js';
import ScheduleResultList from '../../../components/ScheduleResultList/ScheduleResultList.js';
import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';

const Rolling = () => {
  const { id } = useParams();
  const history = useHistory();

  const handleAccept = useCallback((id) => {
    history.push('/profile');
  }, [history]);

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <h1>Current Schedule</h1>
        <BookingDisplay id={'' + id} fields={8}/>
        <ScheduleResultList action={handleAccept}/>
      </div>
    </div>
  );
};

export default Rolling;