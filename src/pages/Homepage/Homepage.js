import React from 'react';
import './Homepage.css';
import Header from '../../components/Header/Header.js';
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm.js';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container">
        <text id="schedule-header-text">Find Schedule</text>
        <ScheduleForm />
      </div>
    </div>
  );
};

export default Homepage;
