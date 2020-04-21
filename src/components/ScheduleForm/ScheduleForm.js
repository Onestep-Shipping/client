import React, {useState} from 'react';
import DatePicker from 'react-datepicker';

import './ScheduleForm.css';
import 'react-datepicker/dist/react-datepicker.css';

const ScheduleForm = () => {
  const [carriers] = useState(
      ['Hapag-Lloyd', 'Maersk', 'YangMing', 'ONE', 'MSC', 'APL'],
  );

  const today = new Date;

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  return (
    <form class="schedule-form-cotainer">
      <text class="schedule-label">From</text>
      <div class="textfield-container">
        <input type="text" class="location" placeholder="Location" />
        <DatePicker
          id="from-date"
          selected={startDate}
          onChange={setStartDate}
          minDate={startDate}
          placeholderText="Select a day"
        />
      </div>
      <text class="schedule-label">To</text>
      <div class="textfield-container">
        <input type="text" class="location" placeholder="Location" />
        <DatePicker
          id="to-date"
          selected={endDate}
          minDate={startDate}
          onChange={setEndDate}
        />
      </div>
      <text class="schedule-label">Carrier</text>
      <div class="textfield-container">
        <select id="carrier-selector">
          {
            carriers.map((opt) => {
              return (<option value={opt}>{opt}</option>);
            })
          }
        </select>
      </div>
      <button id="find-button">Find</button>
    </form>
  );
};

export default ScheduleForm;
