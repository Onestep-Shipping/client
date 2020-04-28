import React from 'react';
import '../../pages/_user/Booking/Booking.css';
import PropTypes from 'prop-types';
import {InfoRow, Select} from './Helpers.js';

const BookingForm = (props) => {
  const CONTAINER_TYPES = ['20\' Dry', '40\' Dry', '40\'HC Dry'];
  const PAYMENT_TYPES = ['Prepaid', 'Collect'];

  return (
    <form className="booking-form-container" onSubmit={props.action} noValidate>
      <InfoRow name="Commodity" />
      <InfoRow name="HS Code" />
      <Select name="Container Type" options={CONTAINER_TYPES} />
      <InfoRow name="Quantity" />
      <Select name="Payment Term" options={PAYMENT_TYPES} />
      <button className="result-button">Book</button>
    </form>
  );
};

export default BookingForm;

BookingForm.propTypes = {
  action: PropTypes.func,
};
