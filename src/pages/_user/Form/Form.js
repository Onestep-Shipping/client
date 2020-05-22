import './Form.css';

import React, {useCallback} from 'react';
import { handleBillInstruction, handleBookingRequest } from './FormUtils.js';
import {useHistory, useParams} from 'react-router-dom';

import BolForm from '../../../components/ServiceForm/BolForm.js';
import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import BookingForm from '../../../components/ServiceForm/BookingForm.js';
import Header from '../../../components/Header/Header.js';
import PropTypes from 'prop-types';
import client from '../../../apollo/index.js';

const Form = (props) => {
  const { type, id } = useParams();
  const history = useHistory();
  const { schedule, quote } = props.location.state;

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const { mutation, variables } = type === "booking" ? 
      handleBookingRequest(e.target, schedule._id, quote._id) : 
      handleBillInstruction(e.target, id); // shipment Id for Bill Instruction
    
    client.mutate({ mutation, variables })
      .then(res => {
        const { 
          createBookingRequestAndInitShipment, createBillInstruction 
        } = res.data;
        if (createBookingRequestAndInitShipment === "OK" || 
            createBillInstruction               === "OK") {
          history.push('/success/' + type + '/' + id);
        }  
      })
  }, [history, id, type]);

  const formBool = type === 'booking';
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
            <BookingDisplay schedule={schedule} quote={quote} fields={fieldNumber}/>
            {formBool ?
              <BookingForm action={handleSubmit} /> : 
              <BolForm action={handleSubmit} shipmentId={id} />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

Form.propTypes = {
  formType: PropTypes.string,
  location: PropTypes.object,
};
