import React, {useState} from 'react';
import './ScheduleFormMin.css';
import DatePicker from 'react-datepicker';

const ScheduleFormMin = () => {
  const [carriers] = useState(
      ['Hapag-Lloyd', 'Maersk', 'YangMing', 'ONE', 'MSC', 'APL'],
  );

  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  return (
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
  );
};

export default ScheduleFormMin;
