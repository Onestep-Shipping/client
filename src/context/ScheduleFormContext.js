import React, {useState} from 'react';
import DATA from '../data/ScheduleFormData.js'; 
import PropTypes from 'prop-types';

export const ScheduleFormContext = React.createContext();

const ScheduleFormProvider = ({ children }) => {
  const [schedule, setSchedule] = useState({
    fromLocation: '',
    fromDate: new Date(),
    toLocation: '',
    toDate: new Date(),
    carrier: DATA.CARRIERS[0],
  });

  const setFromLocation = fromLocation => {
    setSchedule({ ...schedule, fromLocation });
  };

  const setFromDate = fromDate => {
    setSchedule({ ...schedule, fromDate });
  };

  const setToLocation = toLocation => {
    setSchedule({ ...schedule, toLocation });
  };

  const setToDate = toDate => {
    setSchedule({ ...schedule, toDate });
  };

  const setCarrier = carrier => {
    setSchedule({ ...schedule, carrier });
  };

  return (
    <ScheduleFormContext.Provider value={{ 
      schedule, 
      setFromLocation, setFromDate,
      setToLocation, setToDate,
      setCarrier
    }}>
      {children}
    </ScheduleFormContext.Provider>
  );
};

export default ScheduleFormProvider;

ScheduleFormProvider.propTypes = {
  children: PropTypes.element,
};