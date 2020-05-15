import React, {useCallback} from 'react';
import './Booking.css';
import PropTypes from 'prop-types';

import {useParams, useHistory} from 'react-router-dom';
import Header from '../../../components/Header/Header.js';
import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import BookingForm from '../../../components/ServiceForm/BookingForm.js';
import BolForm from '../../../components/ServiceForm/BolForm.js';

const Booking = (props) => {
  const { id } = useParams();
  const history = useHistory();
  const { formType } = props;

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    history.push('/success/' + id);
  }, [history, id, formType]);

  const formBool = formType === 'bol';
  const fieldNumber = formBool ? 3 : 8;

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <div className="booking-container">
          <text className="schedule-header-text">
            {formBool ? 'Bill Of Lading (BOL) Instruction' : 'Booking Request'} 
          </text>
          <div className={"info-container" + (formBool ? "2" : "")}>
            <BookingDisplay schedule={props.location.state.schedule} fields={fieldNumber}/>
            {formBool ?
              <BolForm action={handleSubmit} /> :
              <BookingForm action={handleSubmit} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

Booking.propTypes = {
  formType: PropTypes.string,
};
