import './Schedule.css';

import React, { useCallback, useContext, useState } from 'react';

import FIND_SCHEDULES from '../../apollo/queries/FindScheduleQuery.js';
import Header from '../../components/Header/Header.js';
import PropTypes from 'prop-types';
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm.js';
import { ScheduleFormContext } from "../../context/ScheduleFormContext.js";
import ScheduleResultList from '../../components/ScheduleResultList/ScheduleResultList.js';
import Utils from '../../utils/Helpers.js';
import client from '../../apollo/index.js';
import styles from '../../components/ScheduleForm/ScheduleFormMin.module.css';
import {useHistory} from 'react-router-dom';

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
        startDate: Utils.convertDateToISO(schedule.fromDate),
        endDate: Utils.convertDateToISO(schedule.toDate)
      }
    }).then(res => {
      const { findSchedules } = res.data;
      setScheduleList(findSchedules);
    })
  }, [schedule]);

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
