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
    history.push('/success/' + formType + '-' + id);
  }, [history, id, formType]);

  const formBool = formType === 'booking';
  const fieldNumber = formBool ? 8 : 3;

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <div className="booking-container">
          <text className="schedule-header-text">
            {formBool ? 'Booking Request' : 'Bill Of Lading (BOL) Instruction'} 
          </text>
          <div className={"info-container" + (formBool ? "" : "2")}>
            <BookingDisplay id={id} fields={fieldNumber}/>
            {formBool ?
              <BookingForm action={handleSubmit} /> :
              <BolForm action={handleSubmit} />}
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
