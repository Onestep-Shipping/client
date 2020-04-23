import React, {useState, useContext} from 'react';
import './Schedule.css';

import DATA from './data.js';
import Header from '../../components/Header/Header.js';
import ScheduleFormMin from '../../components/ScheduleForm/ScheduleFormMin.js';
import {AuthContext} from '../../firebase/Auth.js';

const Schedule = () => {
  const [resultHeaders] = useState(['#', 'Port of Loading', 'Transshipments',
    'Vessels / Services', 'Port of Discharge', 'Transit Time']);

  const [quoteHeaders] = useState(['Ocean Freight (All-in)',
    'Documentation Fee', 'Administration Fee']);

  const [results] = useState(DATA);
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  const {currentUser} = useContext(AuthContext);

  return (
    <div class="homepage-container">
      <Header />
      <div class="schedule-body-container">
        <ScheduleFormMin />
        <div class="schedule-result-container">
          <div class="schedule-result-header-row">
            {
              resultHeaders.map((header) => {
                return (
                  <div class="col">
                    <text class="schedult-result-header-text">{header}</text>
                  </div>
                );
              })
            }
          </div>
          {
            results.map((booking, index) => {
              return (
                <div class="schedule-result-row-container">
                  <div
                    class={'schedule-result-row' +
                      (index === currentBookingIndex ? '-selected' : '')}
                    onClick={(e) => setCurrentBookingIndex(index)}>
                    <div class="col">
                      <text class="schedult-result-text">{index + 1}</text>
                    </div>
                    <div class="col">
                      <text class="schedult-result-text">{booking.from}</text>
                      <text class="schedult-result-text-time">{booking.fromDate}</text>
                    </div>
                    <div class="col">
                      <text class="schedult-result-text">{booking.trans}</text>
                    </div>
                    <div class="col">
                      <text class="schedult-result-text">{booking.ves}</text>
                    </div>
                    <div class="col">
                      <text class="schedult-result-text">{booking.to}</text>
                      <text class="schedult-result-text-time">{booking.toDate}</text>
                    </div>
                    <div class="col">
                      <text class="schedult-result-text">{booking.time}</text>
                    </div>
                  </div>
                  {(index === currentBookingIndex && currentUser) ?
                    (<div class="quote-dropdown">
                      <div class="schedule-result-header-row">
                        <div class="col2">
                          <text class="schedult-result-header-text">{quoteHeaders[0]}</text>
                          <text class="schedult-result-text">${booking.oceanFreight}</text>
                        </div>
                        <div class="col2">
                          <text class="schedult-result-header-text">{quoteHeaders[1]}</text>
                          <text class="schedult-result-text">${booking.docFee}</text>
                        </div>
                        <div class="col2">
                          <text class="schedult-result-header-text">{quoteHeaders[2]}</text>
                          <text class="schedult-result-text">${booking.adFee}</text>
                        </div>
                      </div>
                      <button class="result-button">Accept</button>
                    </div>) :
                    <div />}
                </div>
              );
            })
          }
          {!currentUser ? (
              <a href="/auth" class="warning-text">
                You must log in to proceed.
              </a>
            ) : <div />
          }
        </div>
      </div>
    </div>
  );
};

export default Schedule;
