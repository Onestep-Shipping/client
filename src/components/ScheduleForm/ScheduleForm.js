import React, {useCallback} from 'react';
import './ScheduleForm.css';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import {
  FROM_LOCATIONS, TO_LOCATIONS, CARRIERS,
} from '../../data/ScheduleFormData.js';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
  setFromLocation, 
  setFromDate, 
  setToLocation, 
  setToDate, 
  setCarrier 
} from '../../actions/ScheduleActions.js';

const ScheduleForm = (props) => {
  const { styles, schedule } = props;
  const history = useHistory();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    history.push('/schedule');
  }, [history]);

  const handleFromDateSelect = (fromDate) => {
    props.setFromDate(fromDate);
    if (fromDate > schedule.toDate) {
      props.setToDate(fromDate);
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
            onChange={props.setFromLocation}
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
            onChange={props.setToLocation}
            value={schedule.toLocation}
            clearable/>
          <DatePicker
            className={styles.toDate}
            selected={schedule.toDate}
            minDate={schedule.fromDate}
            onSelect={props.setToDate}
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <text className={styles.scheduleLabel}>Carrier</text>
        <div className={styles.textfieldContainer}>
          <select 
            value={schedule.carrier}
            className={styles.carrierSelector} 
            onChange={(e) => props.setCarrier(e.target.value)}>
            {
              CARRIERS.map((opt, ind) => {
                return (<option value={opt} key={ind}>{opt}</option>);
              })
            }
          </select>
        </div>
      </div>
      <button className={styles.findButton}>Find</button>
    </form>
  );
};

const mapStateToProps = (state) => {
  const schedule = state;
  return schedule;
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setFromLocation, 
    setFromDate, 
    setToLocation, 
    setToDate, 
    setCarrier
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleForm);

ScheduleForm.propTypes = {
  styles: PropTypes.object,
  schedule: PropTypes.object,
  setFromLocation: PropTypes.func,
  setFromDate: PropTypes.func,
  setToLocation: PropTypes.func,
  setToDate: PropTypes.func,
  setCarrier: PropTypes.func,
};
