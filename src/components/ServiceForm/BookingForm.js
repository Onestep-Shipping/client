import React, {useState} from 'react';
import '../../pages/_user/Booking/Booking.css';
import { 
  CONTAINER_HEADERS, CONTAINER_TYPES, PAYMENT_TYPES, AUTO_FILLING 
} from '../../data/ServiceFormData.js';
import PropTypes from 'prop-types';
import {InfoRow, Select} from './Helpers.js';

const MAX_ROW = 5;

const BookingForm = (props) => {
  const [row, setRow] = useState(1);

  const addContainer = (e) => {
    e.preventDefault();
    const newVal = row + 1;
    if (newVal <= MAX_ROW) {
      setRow(row + 1);
    } else {
      alert("You reached the limit.")
    }
  }

  return (
    <form className="booking-form-container" onSubmit={props.action} noValidate>
      <InfoRow name="Commodity" />
      <InfoRow name="HS Code" />
      <div className="schedule-result-header-row">
        {CONTAINER_HEADERS.map((header, ind) => 
          <div key={ind}>
            <text className="info-label-special">{header}</text>
          </div>
        )}
      </div>
      {Array(row).fill().map((booking, ind) => 
        <div className='instruction-result-row' key={ind}>
          <input
            type="text"
            name="quantity"
            className="booking-form-input-start"
            placeholder="i.e. 420010"
            required/>
          <select className="booking-form-input">
            {CONTAINER_TYPES.map((type, ind) => <option value={type} key={ind}>{type}</option>)}
          </select>
        </div>
      )}
      <button className="add-button" onClick={addContainer}>
        Add Container
      </button>
      <Select name="Payment Term" options={PAYMENT_TYPES} />
      <Select name="CAED/AES filing by OneStep?" options={AUTO_FILLING} />
      <button className="result-button">Book</button>
    </form>
  );
};

export default BookingForm;

BookingForm.propTypes = {
  action: PropTypes.func,
};
