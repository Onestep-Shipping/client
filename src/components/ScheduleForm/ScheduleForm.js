import React, {useCallback, useContext} from 'react';
import './ScheduleForm.css';
import {useHistory} from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import DATA from '../../data/ScheduleFormData.js';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { ScheduleFormContext } from "../../context/ScheduleFormContext.js";
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const HELLO = gql`
  query {
    hello
  }
`;

const ScheduleForm = (props) => {
  const [
    getHello, { loading, data }
  ] = useLazyQuery(HELLO);
  
  const { styles, action = null } = props;
  const history = useHistory();

  const { schedule, setFromLocation, setFromDate, 
          setToLocation, setToDate, setCarrier  } = useContext(ScheduleFormContext);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    getHello();
    alert(data ? data.hello : "no data");
    // const { fromLocation, fromDate, toLocation, toDate, carrier } = e.target;
    // const data = {
    //   carrier: carrier.value,
    //   startLocation: fromLocation.value,
    //   startDate: fromDate.value,
    //   endLocation: toLocation.value,
    //   endDate: toDate.value,
    // }

    // history.push("/schedule");
  
  }, [history]);

  return (
    <form className={styles.formContainer} onSubmit={action === null ? handleSubmit : action}>
      <div className={styles.infoContainer}>
        <text className={styles.scheduleLabel}>From</text>
        <div className={styles.textfieldContainer}>
          <Select
            name="fromLocation"
            options={DATA.FROM_LOCATIONS} 
            placeholder="Location" 
            value={schedule.fromLocation}
            onChange={setFromLocation}
            clearable/>
          <DatePicker
            name="fromDate"
            className={styles.fromDate}
            selected={schedule.fromDate}
            onSelect={setFromDate}
            placeholderText="Select a day"
          />
        </div>
      </div>
      <div className={styles.infoContainer}>
        <text className={styles.scheduleLabel}>To</text>
        <div className={styles.textfieldContainer}>
          <Select 
            name="toLocation"
            options={DATA.TO_LOCATIONS} 
            placeholder="Location" 
            onChange={setToLocation}
            value={schedule.toLocation}
            clearable/>
          <DatePicker
            name="toDate"
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
            name="carrier"
            value={schedule.carrier}
            className={styles.carrierSelector} 
            onChange={(e) => setCarrier(e.target.value)}>
            {DATA.CARRIERS.map((opt, ind) => (<option value={opt} key={ind}>{opt}</option>))}
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
  action: PropTypes.func,
};
