import React, {useCallback} from 'react';
import './Booking.css';

import {useParams, useHistory} from 'react-router-dom';
import DATA from '../../data/ScheduleDetailsData.js';
import Header from '../../components/Header/Header.js';

const Booking = () => {
  const {id} = useParams();
  const history = useHistory();

  const CONTAINER_TYPES = ['20\' Dry', '40\' Dry', '40\'HC Dry'];
  const PAYMENT_TYPES = ['Prepaid', 'Collect'];

  const handleBook = useCallback((e) => {
    e.preventDefault();
    // const commodity = e.target[0].value;
    // const hsCode = e.target[1].value;
    // const containerType = e.target[2].value;
    // const quantity = e.target[3].value;
    // const payment = e.target[4].value;
    history.push('/success/booking-' + id);
  }, [history, id]);

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <div className="booking-container">
          <div className="h1-container">
            <h1>Booking Information</h1>
          </div>
          <div className="info-container">
            {DATA.map((booking, index) => {
              if (index.toString() === id) {
                return (
                  <div className="booking-details-container" key={index}>
                    <div className="info-row">
                      <div>
                        <text className="info-label">From: </text>
                        <text className="schedule-info-text-left">{booking.from}</text>
                      </div>
                      <div>
                        <text className="info-label">Date: </text>
                        <text className="schedule-info-text">{booking.fromDate}</text>
                      </div>
                    </div>
                    <div className="info-row">
                      <div>
                        <text className="info-label">To: </text>
                        <text className="schedule-info-text-left">{booking.to}</text>
                      </div>
                      <div>
                        <text className="info-label">Date: </text>
                        <text className="schedule-info-text">{booking.toDate}</text>
                      </div>
                    </div>
                    <div className="info-row">
                      <div>
                        <text className="info-label">Transshipments: </text>
                        <text className="schedule-result-text">{booking.trans}</text>
                      </div>
                    </div>
                    <div className="info-row">
                      <text className="info-label">Vessels / Services: </text>
                      <text className="schedule-result-text">{booking.ves}</text>
                    </div>
                    <div className="info-row">
                      <div>
                        <text className="info-label">Transit Time: </text>
                        <text className="schedule-result-text">{booking.time} days</text>
                      </div>
                    </div>
                    <h2>Quote</h2>
                    <div className="info-row">
                      <text className="info-label">Ocean Freight (All-in): </text>
                      <text className="schedule-result-text">${booking.oceanFreight}</text>
                    </div>
                    <div className="info-row">
                      <text className="info-label">Documentation Fee: </text>
                      <text className="schedule-result-text">${booking.docFee}</text>
                    </div>
                    <div className="info-row">
                      <text className="info-label">Administration Fee: </text>
                      <text className="schedule-result-text">${booking.adFee}</text>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
            <form className="booking-form-container" onSubmit={handleBook} noValidate>
              <div className="info-row">
                <text className="info-label">Commodity: </text>
                <input
                  type="text"
                  name="commodity"
                  className="booking-form-input"
                  placeholder="i.e. Food, Clothes, etc."
                  required/>
              </div>
              <div className="info-row">
                <text className="info-label">HS Code: </text>
                <input
                  type="number"
                  name="hs-code"
                  className="booking-form-input"
                  placeholder="i.e. 420010"
                  required/>
              </div>
              <div className="info-row">
                <text className="info-label">Container Type: </text>
                <select className="booking-form-input">
                  {CONTAINER_TYPES.map((type, ind) => {
                    return (
                      <option value={type} key={ind}>{type}</option>
                    )
                  })}
                </select>
              </div>
              <div className="info-row">
                <text className="info-label">Quantity: </text>
                <input
                  type="number"
                  name="quantity"
                  className="booking-form-input"
                  placeholder="i.e. 1, 2, 3, 4, etc."
                  required/>
              </div>
              <div className="info-row">
                <text className="info-label">Payment Term: </text>
                <select className="booking-form-input">
                  {PAYMENT_TYPES.map((type, ind) => {
                    return (
                      <option value={type} key={ind}>{type}</option>
                    )
                  })}
                </select>
              </div>
              <button className="result-button">
                Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
