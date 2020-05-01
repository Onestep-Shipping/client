import React, {useCallback, useContext} from 'react';
import './ScheduleForm.css';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {
  FROM_LOCATIONS, TO_LOCATIONS, CARRIERS,
} from '../../data/ScheduleFormData.js';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { ScheduleFormContext } from "../../context/ScheduleFormContext.js";

const ScheduleForm = (props) => {
  const { styles } = props;
  const history = useHistory();

  const { schedule, 
          setFromLocation, 
          setFromDate, 
          setToLocation, 
          setToDate, 
          setCarrier  } = useContext(ScheduleFormContext);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    history.push('/schedule');
  }, [history]);

  const handleFromDateSelect = (fromDate) => {
    setFromDate(fromDate);
    if (fromDate > schedule.toDate) {
      setToDate(fromDate);
    }
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.infoContainer}>
        <text className={styles.scheduleLabel}>From</text>
        <div className={styles.textfieldContainer}>
          <Select
            options={FROM_LOCATIONS} 
            placeholder="Location" 
            value={schedule.fromLocation}
            onChange={setFromLocation}
            clearable/>
          <DatePicker
            className={styles.fromDate}
            selected={schedule.fromDate}
            onSelect={handleFromDateSelect}
            placeholderText="Select a day"
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <text className={styles.scheduleLabel}>To</text>
        <div className={styles.textfieldContainer}>
          <Select 
            options={TO_LOCATIONS} 
            placeholder="Location" 
            onChange={setToLocation}
            value={schedule.toLocation}
            clearable/>
          <DatePicker
            className={styles.toDate}
            selected={schedule.toDate}
            minDate={schedule.fromDate}
            onSelect={setToDate}
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <text className={styles.scheduleLabel}>Carrier</text>
        <div className={styles.textfieldContainer}>
          <select 
            value={schedule.carrier}
            className={styles.carrierSelector} 
            onChange={(e) => setCarrier(e.target.value)}>
            {CARRIERS.map((opt, ind) => (<option value={opt} key={ind}>{opt}</option>))}
          </select>
        </div>
      </div>
      <button className={styles.findButton}>Find</button>
    </form>
  );
};

export default ScheduleForm;


ScheduleForm.propTypes = {
  styles: PropTypes.object,
};
