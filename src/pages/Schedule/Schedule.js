import React, {useState, useContext, useCallback} from 'react';
import './Schedule.css';

import Header from '../../components/Header/Header.js';
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm.js';
import { AuthContext } from '../../context/AuthContext.js';
import {useHistory} from 'react-router-dom';
import styles from '../../components/ScheduleForm/ScheduleFormMin.module.css';
import FixedSizeList from '../../components/FixedSizeList/FixedSizeList.js';
import DATA from '../../data/ScheduleFormData.js';

const Schedule = props => {
  const history = useHistory();

  const RESULT_HEADERS = ['#', 'Port of Loading', 'Transshipments',
    'Vessels / Services', 'Port of Discharge', 'Transit Time'];

  const QUOTE_HEADERS = ['Ocean Freight (All-in)',
    'Documentation Fee', 'Administration Fee'];

  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  const { currentUser, isAdmin } = useContext(AuthContext);

  const handleQuoteSubmit = useCallback((id) => {
    history.push('/booking/' + id);
  }, [history]);

  const row = (schedule, ind) => {
    return (
      <div className="schedule-result-row-container" key={ind}>
        <div
          className={'schedule-result-row' +
            (ind === currentBookingIndex ? '-selected' : '')}
          onClick={() => setCurrentBookingIndex(ind)}>
          <div className="col-numb">
            <text className="schedule-result-text">{ind + 1}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{schedule.startLocation}</text>
            <text className="schedule-result-text-time">{schedule.startDate}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{schedule.transshipment}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{schedule.vessels}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{schedule.endLocation}</text>
            <text className="schedule-result-text-time">{schedule.endDate}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{schedule.transitTime}</text>
          </div>
        </div>
        {(ind === currentBookingIndex && !isAdmin && currentUser) &&
          (<div className="quote-dropdown">
            <div className="schedule-result-header-row">
              <div className="col3">
                <text className="schedule-result-header-text">{QUOTE_HEADERS[0].toUpperCase()}</text>
                <text className="schedule-result-text">${schedule.oceanFreight}</text>
              </div>
              <div className="col3">
                <text className="schedule-result-header-text">{QUOTE_HEADERS[1].toUpperCase()}</text>
                <text className="schedule-result-text">${schedule.docFee}</text>
              </div>
              <div className="col3">
                <text className="schedule-result-header-text">{QUOTE_HEADERS[2].toUpperCase()}</text>
                <text className="schedule-result-text">${schedule.adminFee}</text>
              </div>
            </div>
            <button
              className="result-button"
              onClick={() => handleQuoteSubmit(ind)}>
              Accept
            </button>
          </div>)}
      </div>
    );
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="schedule-body-container">
        <ScheduleForm styles={styles}/>
        <div className="schedule-result-container">
          <FixedSizeList headers={RESULT_HEADERS} data={props.location.state.detail} row={row}/>
          {!currentUser &&
            <text className="schedule-header-text">Please login to proceed.</text>
          }
        </div>
      </div>
    </div>
  );
};

export default Schedule;
