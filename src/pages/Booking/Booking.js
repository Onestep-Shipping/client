import React, {useState} from 'react';
import './Booking.css';

import {useParams} from 'react-router-dom';
import DATA from '../../data/ScheduleDetailsData.js';
import Header from '../../components/Header/Header.js';

const Booking = () => {
  const {id} = useParams();

  const [commodity, setCommodity] = useState('');
  const [shCode, setShCode] = useState('');
  const [quantity, setQuantity] = useState('');

  const onInputChange = (e, func) => {
    const value = e.currentTarget.value;
    func(value === null ? '' : value);
  };

  return (
    <div class="homepage-container">
      <Header />
      <div class="body-container2">
        <div class="booking-container">
          <div class="h1-container">
            <h1>Booking Information</h1>
          </div>
          <div class="info-container">
            {DATA.map((booking, index) => {
              console.log(booking);
              if (index == id) {
                return (
                  <div class="booking-details-container">
                    <div class="info-row">
                      <div>
                        <text class="info-label">From: </text>
                        <text class="schedult-info-text-left">{booking.from}</text>
                      </div>
                      <div>
                        <text class="info-label">Date: </text>
                        <text class="schedult-info-text">{booking.fromDate}</text>
                      </div>
                    </div>
                    <div class="info-row">
                      <div>
                        <text class="info-label">Transshipments: </text>
                        <text class="schedult-result-text">{booking.trans}</text>
                      </div>
                    </div>
                    <div class="info-row">
                      <text class="info-label">Vessels / Services: </text>
                      <text class="schedult-result-text">{booking.ves}</text>
                    </div>
                    <div class="info-row">
                      <div>
                        <text class="info-label">To: </text>
                        <text class="schedult-info-text-left">{booking.to}</text>
                      </div>
                      <div>
                        <text class="info-label">Date: </text>
                        <text class="schedult-info-text">{booking.toDate}</text>
                      </div>
                    </div>
                    <div class="info-row">
                      <div>
                        <text class="info-label">Transit Time: </text>
                        <text class="schedult-result-text">{booking.time} days</text>
                      </div>
                    </div>
                    <h2>Quote</h2>
                    <div class="info-row">
                      <text class="info-label">Ocean Freight (All-in): </text>
                      <text class="schedult-result-text">${booking.oceanFreight}</text>
                    </div>
                    <div class="info-row">
                      <text class="info-label">Documentation Fee: </text>
                      <text class="schedult-result-text">${booking.docFee}</text>
                    </div>
                    <div class="info-row">
                      <text class="info-label">Administration Fee: </text>
                      <text class="schedult-result-text">${booking.adFee}</text>
                    </div>
                  </div>
                );
              }
            })}
            <form class="booking-form-container">
              <h2>Booking Details</h2>
              <div class="info-row">
                <text class="info-label">Commodity: </text>
                <input
                  type="text"
                  name="commodity"
                  className="booking-form-input"
                  placeholder="i.e. Food, Clothes, etc."
                  onChange={(e) => onInputChange(e, setCommodity)}
                  value={commodity}
                  required/>
              </div>
              <div class="info-row">
                <text class="info-label">SH Code: </text>
                <input
                  type="number"
                  name="sh-code"
                  className="booking-form-input"
                  placeholder="i.e. 420010"
                  onChange={(e) => onInputChange(e, setShCode)}
                  value={shCode}
                  required/>
              </div>
              <div class="info-row">
                <text class="info-label">Container Type: </text>
                <select class="booking-form-input">
                  <option value="dry-20">20' Dry</option>
                  <option value="dry-40">40' Dry</option>
                  <option value="dry-40hc">40'HC Dry</option>
                </select>
              </div>
              <div class="info-row">
                <text class="info-label">Quantity: </text>
                <input
                  type="number"
                  name="quantity"
                  className="booking-form-input"
                  placeholder="i.e. 1, 2, 3, 4, etc."
                  onChange={(e) => onInputChange(e, setQuantity)}
                  value={quantity}
                  required/>
              </div>
              <div class="info-row">
                <text class="info-label">Payment Term: </text>
                <select class="booking-form-input">
                  <option value="prepaid">Prepaid</option>
                  <option value="collect">Collect</option>
                </select>
              </div>
              <button class="result-button" onClick={() => {}}>
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
