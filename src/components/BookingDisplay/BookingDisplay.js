import './BookingDisplay.css';

import PropTypes from 'prop-types';
import React from 'react';
import Utils from '../../utils/Helpers.js';

const BookingDisplay = (props) => {
  const { schedule, quote, fields } = props;
  return (
    <div className="booking-details-container">
      <div className="info-row">
        <div>
          <span className="info-label">From: </span>
          <span className="schedule-info-text-left">{schedule.route.startLocation}</span>
        </div>
        <div>
          <span className="info-label">Date: </span>
          <span className="schedule-info-text">{schedule.startDate}</span>
        </div>
      </div>
      <div className="info-row">
        <div>
          <span className="info-label">To: </span>
          <span className="schedule-info-text-left">{schedule.route.endLocation}</span>
        </div>
        <div>
          <span className="info-label">Date: </span>
          <span className="schedule-info-text">{schedule.endDate}</span>
        </div>
      </div>
      <div className="info-row">
        <span className="info-label">Vessels / Services: </span>
        <span className="schedule-result-text">{schedule.vessels}</span>
      </div>
      {fields > 3 &&
        <div style={{width: '100%'}}>
          <div className="info-row">
            <span className="info-label">Carrier: </span>
            <span className="schedule-result-text">{schedule.route.carrier}</span>
          </div>
          <div className="info-row">
            <div>
              <span className="info-label">Transshipments: </span>
              <span className="schedule-result-text">{schedule.transshipment}</span>
            </div>
            <div>
              <span className="info-label">Transit Time: </span>
              <span className="schedule-result-text">{schedule.transitTime} days</span>
            </div>
          </div>

        </div>
      }
      {fields > 5 &&
        <div style={{width: '100%'}}>
          <h2>Quote</h2>
          <div className="info-row">
            <span className="info-label">Validity: </span>
            <span className="schedule-result-text">{Utils.formatValidity(quote.validity)}</span>
          </div>
          {quote.selling.oceanFreight.map((container, ind) => 
             <div className="info-row" key={ind}>
               <span className="info-label">{ind === 0 && "Ocean Freight (All-in): "}</span>
              <span className="schedule-result-text">{container.containerType} - ${container.price}</span>
            </div>
          )}
          <div className="info-row">
            <span className="info-label">Documentation Fee: </span>
            <span className="schedule-result-text">${quote.selling.docFee}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Administration Fee: </span>
            <span className="schedule-result-text">${quote.selling.adminFee}</span>
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
