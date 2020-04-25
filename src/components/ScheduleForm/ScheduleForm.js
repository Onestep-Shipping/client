import React, {useState, useCallback} from 'react';
import './ScheduleForm.css';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {
  FROM_LOCATIONS, TO_LOCATIONS, CARRIERS,
} from '../../data/ScheduleFormData.js';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

const ScheduleForm = (props) => {
  const { styles } = props;
  const history = useHistory();
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    history.push('/schedule');
  }, [history]);

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.infoContainer}>
        <text className={styles.scheduleLabel}>From</text>
        <div className={styles.textfieldContainer}>
          <Select
            options={FROM_LOCATIONS} placeholder="Location" clearable/>
          <DatePicker
            className={styles.fromDate}
            selected={startDate}
            onChange={setStartDate}
            placeholderText="Select a day"
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <text className={styles.scheduleLabel}>To</text>
        <div className={styles.textfieldContainer}>
          <Select options={TO_LOCATIONS} placeholder="Location" clearable/>
          <DatePicker
            className={styles.toDate}
            selected={endDate}
            minDate={startDate}
            onChange={setEndDate}
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <text className={styles.scheduleLabel}>Carrier</text>
        <div className={styles.textfieldContainer}>
          <select className={styles.carrierSelector}>
            {
              CARRIERS.map((opt, ind) => {
                return (<option value={opt} key={ind}>{opt}</option>);
              })
            }
          </select>
        </div>
      </div>
      <button className={styles.findButton} type="submit">Find</button>
    </form>
  );
};

export default ScheduleForm;

ScheduleForm.propTypes = {
  styles: PropTypes.object,
};
