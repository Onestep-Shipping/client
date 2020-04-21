import React, {useState} from 'react';
import './Schedule.css';

import DATA from './data.js';
import Header from '../../components/Header/Header.js';
import ScheduleFormMin from '../../components/ScheduleFormMin/ScheduleFormMin.js';

const Schedule = () => {
  const [resultHeaders] = useState(['Port of Loading', 'Transshipments',
    'Vessels / Services', 'Port of Discharge', 'Transit Time']);

  const [results] = useState(DATA);
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

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
                  <text class="schedult-result-header-text">{header}</text>
                );
              })
            }
          </div>
          {
            results.map((booking, index) => {
              return (
                <div
                  class={'schedule-result-row' +
                    (index === currentBookingIndex ? '-selected' : '')}
                  onClick={(e) =>setCurrentBookingIndex(index)}>
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
              );
            })
          }
          <div class="schedule-button-container">
            <button class="result-button">Quote</button>
            <button class="result-button">Book</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
