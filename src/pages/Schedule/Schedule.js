import React, { useCallback } from 'react';
import './Schedule.css';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header.js';
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm.js';
import ScheduleResultList from '../../components/ScheduleResultList/ScheduleResultList.js';
import {useHistory} from 'react-router-dom';
import styles from '../../components/ScheduleForm/ScheduleFormMin.module.css';

const Schedule = props => {
  const history = useHistory();

  const handleQuoteSubmit = useCallback((id) => {
    history.push('/booking/' + id);
  }, [history]);

  return (
    <div className="homepage-container">
      <Header />
      <div className="schedule-body-container">
        <ScheduleForm styles={styles}/>
        <ScheduleResultList 
          action={handleQuoteSubmit} 
          scheduleList={props.location.state.schedules} />
      </div>
    </div>
  );
};

export default Schedule;

Schedule.propTypes = {
  location: PropTypes.object,
};
