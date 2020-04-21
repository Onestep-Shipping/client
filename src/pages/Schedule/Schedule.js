import React, {useState} from 'react';
import './Schedule.css';

import DatePicker from 'react-datepicker';

import Header from '../../components/Header/Header.js';
import ScheduleFormMin from '../../components/ScheduleFormMin/ScheduleFormMin.js';

const Schedule = () => {
  const [resultHeaders] = useState(['Port of Loading', 'Transshipments',
    'Vessels / Services', 'Port of Discharge', 'Transit Time']);

  const [results] = useState(
      [{
        from: 'Vancouver, BC | CA',
        trans: 0,
        ves: 'YM UPSURGENCE / 043W / PN2',
        to: 'Vung Tau | VN',
        time: '35',
      }],
  );

  return (
    <div class="homepage-container">
      <Header />
      <div class="body-container2">
        <ScheduleFormMin />
        <div class="schedule-result-container">
          <div class="schedule-result-row">
            {
              resultHeaders.map((header) => {
                return (
                  <text class="schedult-result-header-text">{header}</text>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
