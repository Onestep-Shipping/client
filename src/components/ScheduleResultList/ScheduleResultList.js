import './ScheduleResultList.css';

import React, { useContext, useState } from 'react';

import { AuthContext } from '../../context/AuthContext.js';
import FixedSizeList from '../FixedSizeList/FixedSizeList.js';
import PropTypes from 'prop-types';
import Utils from '../../utils/Helpers.js';
import arrowIcon from '../../assets/arrow-down.svg';

const ScheduleResultList = props => {
  const { action, scheduleList, remove = { _id: null } } = props;
  const [validity, setValidity] = useState(0);
  const { currentUser, isAdmin } = useContext(AuthContext);

  const RESULT_HEADERS = ['#', 'Port of Loading', 'Transshipments',
    'Vessels / Services', 'Port of Discharge', 'Transit Time'];
  
  const QUOTE_HEADERS = ['Ocean Freight (All-in)',
    'Documentation Fee', 'Administration Fee'];

  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  const row = (schedule, ind) => {
    const quotes =
      schedule.route.quoteHistory
        .filter(quote => Date.parse(quote.validity.startDate) <=  Date.parse(schedule.startDate))
        .slice(0, 2)
    return (
      <div className="schedule-result-row-container" key={ind}>
        <div
          className={'schedule-result-row' +
            (ind === currentBookingIndex ? '-selected' : '')}
          onClick={() => setCurrentBookingIndex(ind)}>
          <div className="col-numb">
            <span className="schedule-result-text">{ind + 1}</span>
          </div>
          <div className="col">
            <span className="schedule-result-text">{schedule.route.startLocation}</span>
            <span className="schedule-result-text-time">
              {Utils.formatISOString(schedule.startDate)}
            </span>
          </div>
          <div className="col">
            <span className="schedule-result-text">{schedule.transshipment}</span>
          </div>
          <div className="col">
            <span className="schedule-result-text">{schedule.vessels}</span>
          </div>
          <div className="col">
            <span className="schedule-result-text">{schedule.route.endLocation}</span>
            <span className="schedule-result-text-time">
              {Utils.formatISOString(schedule.endDate)}
            </span>
          </div>
          <div className="col">
            <span className="schedule-result-text">{schedule.transitTime}</span>
          </div>
        </div>

        {(ind === currentBookingIndex && !isAdmin && currentUser) &&
        <div className="quote-dropdown">
          <div className="validity-container">
            <span className="schedule-result-header-text">
              {validity === 0 ? "CURRENT" : "UPCOMING"} VALIDITY: 
            </span>
            {Utils.formatValidity(quotes[validity].validity)}
            {quotes > 1 && 
            <img 
              className={"arrow-icon-point-" + (validity === 0 ? "right" : "left")} 
              src={arrowIcon} alt="Arrow Icon" 
              onClick={() => setValidity(validity === 0 ? 1 : 0)} 
            />}
          </div>
          <div className="quote-body">
            <div className="col3">
              <span className="schedule-result-header-text">{QUOTE_HEADERS[0].toUpperCase()}</span>
              {quotes[validity].selling.oceanFreight.map((container, ind) => 
                <div key={ind} className="container-types-quote">
                  <span className="schedule-result-text">{container.containerType}: </span>
                  <span className="schedule-result-text">${Utils.comma(container.price)}</span>
                </div>
              )}
            </div>
            <div className="col3">
              <span className="schedule-result-header-text">{QUOTE_HEADERS[1].toUpperCase()}</span>
              <span className="schedule-result-text">${Utils.comma(quotes[validity].selling.docFee)}</span>
            </div>
            <div className="col3">
              <span className="schedule-result-header-text">{QUOTE_HEADERS[2].toUpperCase()}</span>
              <span className="schedule-result-text">${Utils.comma(quotes[validity].selling.adminFee)}</span>
            </div>
          </div>
          {quotes[validity].except &&
          <div className="finance-display-form">
            Note: FAK Rates (Except {quotes[validity].except})
          </div>}
          <button className="result-button" onClick={() => action(schedule, quotes[0])}>
            Accept
          </button>
        </div>}
      </div>
    );
  }

  return (
    <div className="schedule-result-container">
      <FixedSizeList 
        headers={RESULT_HEADERS} 
        data={scheduleList.filter(item => item._id !== remove._id)} 
        row={row}
      />
    </div>
  );
};

export default ScheduleResultList;

ScheduleResultList.propTypes = {
  scheduleList: PropTypes.array,
  action: PropTypes.func,
  remove: PropTypes.object,
};