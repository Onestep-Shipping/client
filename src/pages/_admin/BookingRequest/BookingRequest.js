import React, {useState} from 'react';
import './BookingRequest.css';
import profileImg from '../../../assets/profile-placeholder.png';

import Header from '../../../components/Header/Header.js';
import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import styles from '../../../components/ScheduleForm/ScheduleFormMin.module.css';
import BOOKING_REQ from '../../../data/BookingRequestData.js';
import DATA from '../../../data/ScheduleDetailsData.js';
import { InfoRow, ContainerDetail } from '../Helpers.js';
import pdfGenerator from './pdfGenerator.js';
import DatePicker from 'react-datepicker';

const BookingRequest = () => {
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  const today = new Date();
  const [terminalDate, setTerminalDate] = useState(today);
  const [docDate, setDocDate] = useState(today);
  const [vgmDate, setVgmDate] = useState(today);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { bookingNo, terminal, doc, vgm,
            pickupLocationStreet, pickupLocationCity, pickupLocationCountry,
            returnLocationStreet, returnLocationCity, returnLocationCountry 
          } = e.target;
    
    const info = {
      company: BOOKING_REQ[currentBookingIndex].company,
      schedule: DATA[currentBookingIndex],
      booking: BOOKING_REQ[currentBookingIndex].booking,
      bookingNo: bookingNo.value,
      terminalDate: terminal.value,
      docDate: doc.value,
      vgmDate: vgm.value,
      pickupLine1: pickupLocationStreet.value,
      pickupLine2: pickupLocationCity.value,
      pickupLine3: pickupLocationCountry.value,
      returnLine1: returnLocationStreet.value,
      returnLine2: returnLocationCity.value,
      returnLine3: returnLocationCountry.value,
    }

    const pdf = pdfGenerator(info);
    var data = new FormData();
    data.append('data', pdf);

    // TODO: Fetch formData to server
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
          <ul className="booking-instruction-list"> 
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
                  <img className="profile-image" src={profileImg} alt="" />
                  <div className="item-header-container">
                    <text className="booking-id-text">{booking.company.name}</text>
                    <text className="customer-email-text">From: {booking.personInCharge}</text>
                  </div>
                  <text>Fri</text>
                </li>
              )
            )}
          </ul>
        <div className="booking-instruction-detail"> 
          <div className="booking-id-container">
            <h2>{BOOKING_REQ[currentBookingIndex].company.name}</h2>
          </div>
          <div className="customer-info-container">
            <text>Contact: {BOOKING_REQ[currentBookingIndex].personInCharge}</text>
            <text>Email: {BOOKING_REQ[currentBookingIndex].email}</text>
            <text>{BOOKING_REQ[currentBookingIndex].dateSent}</text>
          </div>

          <div className="form-container">
            <h2>Schedule</h2>
            <BookingDisplay id={'' + currentBookingIndex} fields={8}/>
          </div>

          <div className="form-container">
            <h2>Booking Request</h2>
            <div className="booking-details-container">
              <InfoRow label="Commodity" value={BOOKING_REQ[currentBookingIndex].booking.commodity} />
              <InfoRow label="HS Code" value={BOOKING_REQ[currentBookingIndex].booking.hsCode} />
              <InfoRow label="Shipment Detail" value="" />
              <div className="shipment-detail-row">
                {BOOKING_REQ[currentBookingIndex].booking.container.map((row, ind) => (
                 <ContainerDetail key={ind} container={row} ind={ind} />
                ))}
              </div>
              <InfoRow label="Payment Term" value={BOOKING_REQ[currentBookingIndex].booking.payment} />
            </div>
          </div>

          <h2>Booking Confirmation</h2>
          <form className="booking-confirmation-container" onSubmit={handleSubmit}>
            <div className="confirmation-info-container">
              <text className={styles.scheduleLabel}>Booking No.</text>
              <input
                type="text"
                name="bookingNo"
                className="commodity-input"
                placeholder="i.e. 1234567"
                required />
            </div>
            <div className="confirmation-info-container">
              <text className={styles.scheduleLabel}>Terminal Cut-off</text>
              <text className={styles.scheduleLabel}>Document Cut-off</text>
              <text className={styles.scheduleLabel}>VGM Cut-off</text>
            </div>
            <div className="confirmation-info-container">
              <div>
                <DatePicker
                  name="terminal"
                  className={styles.fromDate}
                  placeholderText="Select a day"
                  selected={terminalDate}
                  onSelect={setTerminalDate}
                />
              </div>
              <div>
                <DatePicker
                  name="doc"
                  className={styles.fromDate}
                  placeholderText="Select a day"
                  selected={docDate}
                  onSelect={setDocDate}
                />
              </div>
              <div>
                <DatePicker
                  name="vgm"
                  className={styles.fromDate}
                  placeholderText="Select a day"
                  selected={vgmDate}
                  onSelect={setVgmDate}
                />
              </div>
            </div>

            <div className="confirmation-info-container">
              <text className={styles.scheduleLabel}>Empty Pickup Location</text>
              <text className={styles.scheduleLabel}>Return Location</text>  
            </div>
            <div className="confirmation-info-container">
              <div>
                <input
                  type="text"
                  name="pickupLocationStreet"
                  className="booking-confirmation-input"
                  placeholder="i.e. 8237 Montcalm Street"
                  required/>
              </div>
              <div>
                <input
                  type="text"
                  name="returnLocationStreet"
                  className="booking-confirmation-input"
                  placeholder="i.e. 8237 Montcalm Street"
                  required/>
              </div>
            </div>
            <div className="confirmation-info-container">
              <div>
                <input
                  type="text"
                  name="pickupLocationCity"
                  className="booking-confirmation-input"
                  placeholder="i.e. Vancouver, BC, V6P 4P4"
                  required/>
              </div>
              <div>
                <input
                  type="text"
                  name="returnLocationCity"
                  className="booking-confirmation-input"
                  placeholder="i.e. Vancouver, BC, V6P 4P4"
                  required/>
              </div>
            </div>
            <div className="confirmation-info-container">
              <div>
                <input
                  type="text"
                  name="pickupLocationCountry"
                  className="booking-confirmation-input"
                  placeholder="i.e. Canada"
                  required/>
              </div>
              <div>
                <input
                  type="text"
                  name="returnLocationCountry"
                  className="booking-confirmation-input"
                  placeholder="i.e. Canada"
                  required/>
              </div>
            </div>

            <div className="bol-button-form">
              <input id="left-button" type="submit" className="result-button" value="Generate PDF" />
              <button  className="result-button">
                Send to Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingRequest;
