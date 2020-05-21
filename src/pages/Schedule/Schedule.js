import React, { useCallback, useState, useContext } from 'react';
import './Schedule.css';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header.js';
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm.js';
import ScheduleResultList from '../../components/ScheduleResultList/ScheduleResultList.js';
import {useHistory} from 'react-router-dom';
import styles from '../../components/ScheduleForm/ScheduleFormMin.module.css';
import { ScheduleFormContext } from "../../context/ScheduleFormContext.js";
import FIND_SCHEDULES from '../../apollo/queries/FindScheduleQuery.js';
import client from '../../apollo/index.js';
import moment from 'moment';

const convertDateToISO = date => {
  return moment(date).format("YYYY-MM-DD");
}

const Schedule = props => {
  const history = useHistory();
  const [scheduleList, setScheduleList] = useState(props.location.state.schedules); 

  const handleQuoteSubmit = useCallback((schedule, quote) => {
    history.push({
      pathname: 'form/booking/' + schedule._id,
      state: { schedule, quote }
    });
  }, [history]);

  const { schedule } = useContext(ScheduleFormContext);

  const handleSubmit = useCallback(async () => {
    client.query({
      query: FIND_SCHEDULES,
      variables: { 
        routeId: schedule.fromLocation.value + "-" + schedule.toLocation.value,
        carrier: schedule.carrier,
        startDate: convertDateToISO(schedule.fromDate),
        endDate: convertDateToISO(schedule.toDate)
      }
    }).then(res => {
      const { findSchedules } = res.data;
      setScheduleList(findSchedules);
    })
  }, [history, schedule]);

  return (
    <div className="homepage-container">
      <Header />
      <div className="schedule-body-container">
        <ScheduleForm styles={styles} onSubmit={handleSubmit}/>
        <ScheduleResultList 
          action={handleQuoteSubmit} 
          scheduleList={scheduleList} />
      </div>
    </div>
  );
};

export default Schedule;

Schedule.propTypes = {
  location: PropTypes.object,
};
