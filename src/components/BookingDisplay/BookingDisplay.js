import React from 'react';
import './BookingDisplay.css';
import PropTypes from 'prop-types';
import Utils from '../../utils/Helpers.js';

const BookingDisplay = (props) => {
  const { schedule, quote, fields } = props;
  return (
    <div className="booking-details-container">
      <div className="info-row">
        <div>
          <text className="info-label">From: </text>
          <text className="schedule-info-text-left">{schedule.route.startLocation}</text>
        </div>
        <div>
          <text className="info-label">Date: </text>
          <text className="schedule-info-text">{schedule.startDate}</text>
        </div>
      </div>
      <div className="info-row">
        <div>
          <text className="info-label">To: </text>
          <text className="schedule-info-text-left">{schedule.route.endLocation}</text>
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
            <text className="schedule-result-text">{Utils.formatValidity(quote.validity)}</text>
          </div>
          {quote.selling.oceanFreight.map((container, ind) => 
             <div className="info-row" key={ind}>
               <text className="info-label">{ind === 0 && "Ocean Freight (All-in): "}</text>
              <text className="schedule-result-text">{container.containerType} - ${container.price}</text>
            </div>
          )}
          <div className="info-row">
            <text className="info-label">Documentation Fee: </text>
            <text className="schedule-result-text">${quote.selling.docFee}</text>
          </div>
          <div className="info-row">
            <text className="info-label">Administration Fee: </text>
            <text className="schedule-result-text">${quote.selling.adminFee}</text>
          </div>
        </div>
      }
    </div>
  );
};

export default BookingDisplay;

BookingDisplay.propTypes = {
  schedule: PropTypes.object, 
  quote: PropTypes.object, 
  fields: PropTypes.number
};
