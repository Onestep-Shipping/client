import React from 'react';
import './Homepage.css';
import Header from '../../components/Header/Header.js';
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm.js';
import styles from '../../components/ScheduleForm/ScheduleForm.module.css';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <Header style="homepage-header"/>
      <div className="body-container">
        <text id="schedule-header-text">Find Schedule</text>
        <ScheduleForm styles={styles}/>
      </div>
    </div>
  );
};

export default Homepage;
