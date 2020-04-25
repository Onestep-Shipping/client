import React, {useState, useContext, useCallback} from 'react';
import './Schedule.css';

import DATA from '../../data/ScheduleDetailsData.js';
import Header from '../../components/Header/Header.js';
import ScheduleFormMin from '../../components/ScheduleForm/ScheduleFormMin.js';
import {AuthContext} from '../../firebase/Auth.js';
import {useHistory} from 'react-router-dom';

const Schedule = () => {
  const history = useHistory();

  const RESULT_HEADERS = ['#', 'Port of Loading', 'Transshipments',
    'Vessels / Services', 'Port of Discharge', 'Transit Time'];

  const QUOTE_HEADERS = ['Ocean Freight (All-in)',
    'Documentation Fee', 'Administration Fee'];

  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  const {currentUser} = useContext(AuthContext);

  const handleQuoteSubmit = useCallback((id) => {
    history.push('/booking/' + id);
  }, [history]);

  return (
    <div className="homepage-container">
      <Header />
      <div className="schedule-body-container">
        <ScheduleFormMin />
        <div className="schedule-result-container">
          <div className="schedule-result-header-row">
            {
              RESULT_HEADERS.map((header, ind) => {
                return (
                  <div className={"col" + (ind === 0 ? "-numb" : "")} key={ind}>
                    <text className="schedule-result-header-text">{header}</text>
                  </div>
                );
              })
            }
          </div>
          {
            DATA.map((booking, ind) => {
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
                      <text className="schedule-result-text">{booking.from}</text>
                      <text className="schedule-result-text-time">{booking.fromDate}</text>
                    </div>
                    <div className="col">
                      <text className="schedule-result-text">{booking.trans}</text>
                    </div>
                    <div className="col">
                      <text className="schedule-result-text">{booking.ves}</text>
                    </div>
                    <div className="col">
                      <text className="schedule-result-text">{booking.to}</text>
                      <text className="schedule-result-text-time">{booking.toDate}</text>
                    </div>
                    <div className="col">
                      <text className="schedule-result-text">{booking.time}</text>
                    </div>
                  </div>
                  {(ind === currentBookingIndex && currentUser) &&
                    (<div className="quote-dropdown">
                      <div className="schedule-result-header-row">
                        <div className="col3">
                          <text className="schedule-result-header-text">{QUOTE_HEADERS[0]}</text>
                          <text className="schedule-result-text">${booking.oceanFreight}</text>
                        </div>
                        <div className="col3">
                          <text className="schedule-result-header-text">{QUOTE_HEADERS[1]}</text>
                          <text className="schedule-result-text">${booking.docFee}</text>
                        </div>
                        <div className="col3">
                          <text className="schedule-result-header-text">{QUOTE_HEADERS[2]}</text>
                          <text className="schedule-result-text">${booking.adFee}</text>
                        </div>
                      </div>
                      <button
                        className="result-button"
                        onClick={() => handleQuoteSubmit(ind)}
                      >
                        Accept
                      </button>
                    </div>)}
                </div>
              );
            })
          }
          {!currentUser &&
            <button
              className="result-button"
              onClick={() => history.push('/auth')}
            >
              Login to Proceed
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Schedule;
