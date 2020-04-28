import React, {useState} from 'react';
import './BookingRequest.css';
import profileImg from '../../../assets/profile-placeholder.png';

import Header from '../../../components/Header/Header.js';
import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import BOOKING_REQ from '../../../data/BookingRequestData.js';
import {InfoRow, ShipmentDetail} from '../Helpers.js';

const BookingRequest = () => {
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
          <ul className="bol-instruction-list"> 
            {BOOKING_REQ.map((booking, ind) => (
                <li id={(ind === currentBookingIndex ? 'selected-item' : '')}
                    className={"bol-instruction-item" + (booking.isCompleted ? "-completed" : "-pending")}
                    onClick={() => setCurrentBookingIndex(ind)} key={ind}>
                  <div>
                    <input 
                      type="checkbox" id="checkbox-1-1" className="regular-checkbox" 
                      checked={booking.isCompleted} 
                    />
                    <label htmlFor="checkbox-1-1"></label>
                  </div>
                  <img className="profile-image" src={profileImg} alt="Profile Image" />
                  <div className="item-header-container">
                    <text className="booking-id-text">{booking.company}</text>
                    <text className="customer-email-text">From: {booking.email}</text>
                  </div>
                  <text>Fri</text>
                </li>
              )
            )}
          </ul>
        <div className="bol-instruction-detail"> 
          <div className="booking-id-container">
            <text className="booking-id-text-in-detail">{BOOKING_REQ[currentBookingIndex].company}</text>
          </div>
          <div className="customer-info-container">
            <text>Email: {BOOKING_REQ[currentBookingIndex].email}</text>
            <text>{BOOKING_REQ[currentBookingIndex].dateSent}</text>
          </div>

          <div className="form-container">
            <text className="booking-id-text">Schedule</text>
            <BookingDisplay id={'' + currentBookingIndex} fields={8}/>
          </div>

          <div className="form-container">
            <text className="booking-id-text">BOL Instruction</text>
            <div className="booking-details-container">
              <InfoRow label="Commodity" value={BOOKING_REQ[currentBookingIndex].booking.commodity} />
              <InfoRow label="HS Code" value={BOOKING_REQ[currentBookingIndex].booking.hsCode} />
              <InfoRow label="Container Type" value={BOOKING_REQ[currentBookingIndex].booking.containerType} />
              <InfoRow label="Quantity" value={BOOKING_REQ[currentBookingIndex].booking.quantity} />
              <InfoRow label="Payment Term" value={BOOKING_REQ[currentBookingIndex].booking.payment} />
            </div>
          </div>
          
          <div className="bol-button-form">
            <button className="result-button">Send to Customer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingRequest;
