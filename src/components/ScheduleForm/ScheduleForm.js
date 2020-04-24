import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {
  FROM_LOCATIONS, TO_LOCATIONS, CARRIERS,
} from '../../data/ScheduleFormData.js';

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
    <form className="schedule-form-cotainer" onSubmit={handleSubmit}>
      <text className="schedule-label">From</text>
      <div className="textfield-container">
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
      <text className="schedule-label">To</text>
      <div className="textfield-container">
        <Select options={TO_LOCATIONS} placeholder="Location"
          onChange={(opt) => setToLocation(opt.label)} clearable/>
        <DatePicker
          id="to-date"
          selected={endDate}
          minDate={startDate}
          onChange={setEndDate}
        />
      </div>
      <text className="schedule-label">Carrier</text>
      <div className="textfield-container">
        <select
          id="carrier-selector"
          onChange={(carrier) => setCarrier(carrier)} >
          {
            CARRIERS.map((opt, ind) => {
              return (<option value={opt} key={ind}>{opt}</option>);
            })
          }
        </select>
      </div>
      <button id="find-button" type="submit">Find</button>
    </form>
  );
};

export default ScheduleForm;
