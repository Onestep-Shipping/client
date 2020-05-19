import React, {useCallback} from 'react';
import './Booking.css';
import PropTypes from 'prop-types';

import {useParams, useHistory} from 'react-router-dom';
import Header from '../../../components/Header/Header.js';
import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import BookingForm from '../../../components/ServiceForm/BookingForm.js';
import BolForm from '../../../components/ServiceForm/BolForm.js';
import CREATE_BOOKING_REQUEST from '../../../apollo/mutations/CreateBookingRequestMutation.js';
import client from '../../../apollo/index.js';

const getValuesOfNodeList = potentialList => {
  const result = [];
  if (potentialList.value === "") { // has a list of values
    potentialList.forEach(input => {
      if (input.value !== "") {
        result.push(input.value);
      }
    });
  } else { // only has one value
    result.push(potentialList.value);
  }
  return result;
}

const Booking = (props) => {
  const { type, id } = useParams();
  const history = useHistory();
  const { schedule, quote } = props.location.state;

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const bookingRequest = (createBookingRequestFromForm(e.target));

    client.mutate({
      mutation: CREATE_BOOKING_REQUEST,
      variables: { 
        companyId: "5ebb4f56b6a43ab1f1500127",
        scheduleId: schedule._id,
        quoteId: quote._id,
        bookingRequest
      }
    }).then(res => {
      const { createBookingRequestAndInitShipment } = res.data;
      if (createBookingRequestAndInitShipment === "OK") {
        history.push('/success/' + id);
      } 
    })
  }, [history, id, type]);

  const createBookingRequestFromForm = form => {
    const { commodity, hsCode, quantity, containerType, paymentTerm, autoFilling} = form;

    const quantities = getValuesOfNodeList(quantity);
    const containerTypes = getValuesOfNodeList(containerType);

    const containers = [];

    for (let i = 0; i < quantities.length; i++) {
      containers.push({ 
        containerType: containerTypes[i], 
        quantity: parseInt(quantities[i]) 
      })
    }

    return {
      commodity: commodity.value,
      hsCode: hsCode.value,
      containers,
      paymentTerm: paymentTerm.value,
      autoFilling: autoFilling.value === "Yes",
    }
  }

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
              <BolForm action={handleSubmit} />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

Booking.propTypes = {
  formType: PropTypes.string,
  location: PropTypes.object,
};
