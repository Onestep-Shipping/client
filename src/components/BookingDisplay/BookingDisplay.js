import React from 'react';
import './BookingDisplay.css';
import DATA from '../../data/ScheduleDetailsData.js';

const BookingDisplay = (props) => {
  const { id, fields } = props;

  return (
    DATA.map((booking, index) => {
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
              <text className="info-label">Vessels / Services: </text>
              <text className="schedule-result-text">{booking.ves}</text>
            </div>
            {fields > 3 &&
              <div style={{width: '100%'}}>
                <div className="info-row">
                  <text className="info-label">Carrier: </text>
                  <text className="schedule-result-text">{booking.carrier}</text>
                </div>
                <div className="info-row">
                  <div>
                    <text className="info-label">Transshipments: </text>
                    <text className="schedule-result-text">{booking.trans}</text>
                  </div>
                  <div>
                    <text className="info-label">Transit Time: </text>
                    <text className="schedule-result-text">{booking.time} days</text>
                  </div>
                </div>

              </div>
            }
            {fields > 5 &&
              <div style={{width: '100%'}}>
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
            }
          </div>
        );
      } else {
        return null;
      }
    })
  );
};

export default BookingDisplay;
