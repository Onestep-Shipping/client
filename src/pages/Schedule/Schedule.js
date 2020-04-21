import React, {useState} from 'react';
import './Schedule.css';

import DatePicker from 'react-datepicker';

import Header from '../../components/Header/Header.js';
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm.js';

const Schedule = () => {
  const [carriers] = useState(
      ['Hapag-Lloyd', 'Maersk', 'YangMing', 'ONE', 'MSC', 'APL'],
  );

  const [results] = useState(
      [{
        from: 'Vancouver, BC | CA',
        trans: 0,
        ves: 'YM UPSURGENCE / 043W / PN2',
        to: 'Vung Tau | VN',
        time: '35',
      }],
  );

  const today = new Date;
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  return (
    <div class="homepage-container">
      <Header />
      <div class="body-container2">
        <div class="search-container2">
          <div class="textfield-container2">
            <text class="schedule-label-text2">From</text>
            <input type="text" class="location2" placeholder="Location" />
            <DatePicker
              id="from-date2"
              selected={startDate}
              onChange={setStartDate}
              minDate={startDate}
              placeholderText="Select a day"
            />
          </div>
          <div class="textfield-container2">
            <text class="schedule-label-text2">  </text>
            <text class="schedule-label-text2">To</text>
            <input type="text" class="location2" placeholder="Location" />
            <DatePicker
              id="to-date2"
              selected={endDate}
              onChange={setEndDate}
              minDate={startDate}
              placeholderText="Select a day"
            />
          </div>
          <div class="textfield-container2">
            <text class="schedule-label-text2">Carrier</text>
            <select id="carrier-selector2">
              {
                carriers.map((opt) => {
                  return (<option value={opt}>{opt}</option>);
                })
              }
            </select>
          </div>
          <button id="find-button2">Find</button>
        </div>

        <div class="schedule-result-container">
          <div class="schedule-result-row">
            <text class="schedult-result-header-text">Port of Loading</text>
            <text class="schedult-result-header-text">Transshipments</text>
            <text class="schedult-result-header-text">Vessels / Services</text>
            <text class="schedult-result-header-text">Port of Discharge</text>
            <text class="schedult-result-header-text">Transit Time</text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
