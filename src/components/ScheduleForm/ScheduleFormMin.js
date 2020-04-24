import React, {useState} from 'react';
import './ScheduleFormMin.css';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {
  FROM_LOCATIONS, TO_LOCATIONS, CARRIERS,
} from '../../data/ScheduleFormData.js';

const ScheduleFormMin = () => {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  return (
    <div className="search-container2">
      <div className="textfield-container2">
        <text className="schedule-label-text2">From</text>
        <Select options={FROM_LOCATIONS} placeholder="Location" clearable/>
        <DatePicker
          id="from-date2"
          selected={startDate}
          onChange={setStartDate}
          placeholderText="Select a day"
        />
      </div>
      <div className="textfield-container2">
        <text className="schedule-label-text2">  </text>
        <text className="schedule-label-text2">To</text>
        <Select options={TO_LOCATIONS} placeholder="Location" clearable/>
        <DatePicker
          id="to-date2"
          selected={endDate}
          onChange={setEndDate}
          minDate={startDate}
          placeholderText="Select a day"
        />
      </div>
      <div className="textfield-container2">
        <text className="schedule-label-text2">Carrier</text>
        <select id="carrier-selector2">
          {
            CARRIERS.map((opt, ind) => {
              return (<option value={opt} key={ind}>{opt}</option>);
            })
          }
        </select>
      </div>
      <button id="find-button2">Find</button>
    </div>
  );
};

export default ScheduleFormMin;
