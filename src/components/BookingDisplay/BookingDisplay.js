import React from 'react';
import './BookingDisplay.css';
import DATA from '../../data/ScheduleDetailsData.js';

const BookingDisplay = (props) => {
  const { schedule, fields } = props;
  return (
    <div className="booking-details-container">
      <div className="info-row">
        <div>
          <text className="info-label">From: </text>
          <text className="schedule-info-text-left">{schedule.startLocation}</text>
        </div>
        <div>
          <text className="info-label">Date: </text>
          <text className="schedule-info-text">{schedule.startDate}</text>
        </div>
      </div>
      <div className="info-row">
        <div>
          <text className="info-label">To: </text>
          <text className="schedule-info-text-left">{schedule.endLocation}</text>
        </div>
        <div>
          <text className="info-label">Date: </text>
          <text className="schedule-info-text">{schedule.endDate}</text>
        </div>
      </div>
      <div className="info-row">
        <text className="info-label">Vessels / Services: </text>
        <text className="schedule-result-text">{schedule.vessels}</text>
      </div>
      {fields > 3 &&
        <div style={{width: '100%'}}>
          <div className="info-row">
            <text className="info-label">Carrier: </text>
            <text className="schedule-result-text">{schedule.route.carrier}</text>
          </div>
          <div className="info-row">
            <div>
              <text className="info-label">Transshipments: </text>
              <text className="schedule-result-text">{schedule.transshipment}</text>
            </div>
            <div>
              <text className="info-label">Transit Time: </text>
              <text className="schedule-result-text">{schedule.transitTime} days</text>
            </div>
          </div>

        </div>
      }
      {fields > 5 &&
        <div style={{width: '100%'}}>
          <h2>Quote</h2>
          <div className="info-row">
            <text className="info-label">Validity: </text>
            <text className="schedule-result-text">{schedule.validity}</text>
          </div>
          <div className="info-row">
            <text className="info-label">Ocean Freight (All-in): </text>
            <text className="schedule-result-text">${schedule.oceanFreight}</text>
          </div>
          <div className="info-row">
            <text className="info-label">Documentation Fee: </text>
            <text className="schedule-result-text">${schedule.docFee}</text>
          </div>
          <div className="info-row">
            <text className="info-label">Administration Fee: </text>
            <text className="schedule-result-text">${schedule.adminFee}</text>
          </div>
        </div>
      }
    </div>
  );
};

export default BookingDisplay;
