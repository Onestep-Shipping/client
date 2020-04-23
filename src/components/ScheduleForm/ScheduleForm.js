import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {FROM_LOCATIONS, TO_LOCATIONS, CARRIERS} from './data.js';

import './ScheduleForm.css';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleForm = () => {
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromLocation !== '' && toLocation !== '') {
      history.push('/schedule');
    }
  };

  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [carrier, setCarrier] = useState(CARRIERS[0]);

  return (
    <form class="schedule-form-cotainer" onSubmit={handleSubmit}>
      <text class="schedule-label">From</text>
      <div class="textfield-container">
        <Select
          options={FROM_LOCATIONS} placeholder="Location"
          onChange={(opt) => setFromLocation(opt.label)} clearable/>
        <DatePicker
          id="from-date"
          selected={startDate}
          onChange={setStartDate}
          placeholderText="Select a day"
        />
      </div>
      <text class="schedule-label">To</text>
      <div class="textfield-container">
        <Select options={TO_LOCATIONS} placeholder="Location"
          onChange={(opt) => setToLocation(opt.label)} clearable/>
        <DatePicker
          id="to-date"
          selected={endDate}
          minDate={startDate}
          onChange={setEndDate}
        />
      </div>
      <text class="schedule-label">Carrier</text>
      <div class="textfield-container">
        <select
          id="carrier-selector"
          onChange={(carrier) => setCarrier(carrier)} >
          {
            CARRIERS.map((opt) => {
              return (<option value={opt}>{opt}</option>);
            })
          }
        </select>
      </div>
      <button id="find-button" type="submit">Find</button>
    </form>
  );
};

export default ScheduleForm;
