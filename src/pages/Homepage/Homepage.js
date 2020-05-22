import './Homepage.css';

import React, { useCallback, useContext } from 'react';

import FIND_SCHEDULES from '../../apollo/queries/FindScheduleQuery.js';
import Header from '../../components/Header/Header.js';
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm.js';
import { ScheduleFormContext } from "../../context/ScheduleFormContext.js";
import Utils from '../../utils/Helpers.js';
import client from '../../apollo/index.js';
import styles from '../../components/ScheduleForm/ScheduleForm.module.css';
import {useHistory} from 'react-router-dom';

const Homepage = () => {
  const history = useHistory();

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
      history.push({
        pathname: '/schedule',
        state: { schedules: findSchedules }
      });
    })
  }, [history, schedule]);

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container">
        <span className="schedule-header-text">Find Schedule</span>
        <ScheduleForm styles={styles} onSubmit={handleSubmit}/>
      </div>
    </div>
  );
};

export default Homepage;
