import React, { useState, useContext } from 'react';
import './ScheduleResultList.css';
import PropTypes from 'prop-types';

import FixedSizeList from '../FixedSizeList/FixedSizeList.js';
import { AuthContext } from '../../context/AuthContext.js';
import DATA from '../../data/ScheduleDetailsData.js';
import arrowIcon from '../../assets/arrow-down.svg';
import { CONTAINER_TYPES } from '../../constants/ServiceFormConstants.js';
import { comma } from '../../helpers/Helpers.js';


const ScheduleResultList = props => {
  const { action } = props;

  const [validity, setValidity] = useState(0);

  const { currentUser, isAdmin } = useContext(AuthContext);

  const RESULT_HEADERS = ['#', 'Port of Loading', 'Transshipments',
    'Vessels / Services', 'Port of Discharge', 'Transit Time'];
  
  const QUOTE_HEADERS = ['Ocean Freight (All-in)',
    'Documentation Fee', 'Administration Fee'];

  
  const PRICES = [
    { validity: "04/01/2020 - 04/30/2020", oceanFreight: [800, 1100, 1200] }, 
    { validity: "05/14/2020 - 05/27/2020", oceanFreight: [900, 1500, 2000] },
  ]

  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  const row = (schedule, ind) => {
    return (
      <div className="schedule-result-row-container" key={ind}>
        <div
          className={'schedule-result-row' +
            (ind === currentBookingIndex ? '-selected' : '')}
          onClick={() => setCurrentBookingIndex(ind)}>
          <div className="col-numb">
            <text className="schedule-result-text">{ind + 1}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{schedule.startLocation}</text>
            <text className="schedule-result-text-time">{schedule.startDate}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{schedule.transshipment}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{schedule.vessels}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{schedule.endLocation}</text>
            <text className="schedule-result-text-time">{schedule.endDate}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{schedule.transitTime}</text>
          </div>
        </div>

        {(ind === currentBookingIndex && !isAdmin && currentUser) &&
        <div className="quote-dropdown">
          <div className="validity-container">
            <text className="schedule-result-header-text">{validity === 0 ? "CURRENT" : "UPCOMING"} VALIDITY: </text>
            {PRICES[validity].validity}
            {PRICES.length > 1 && 
            <img 
              className={"arrow-icon-point-" + (validity === 0 ? "right" : "left")} 
              src={arrowIcon} alt="Arrow Icon" 
              onClick={() => setValidity(validity === 0 ? 1 : 0)} 
            />}
          </div>
          <div className="quote-body">
            <div className="col3">
              <text className="schedule-result-header-text">{QUOTE_HEADERS[0].toUpperCase()}</text>
              {CONTAINER_TYPES.map((container, ind) => 
                <div key={ind} className="container-types-quote">
                  <text className="schedule-result-text">{container}: </text>
                  <text className="schedule-result-text">${comma(PRICES[validity].oceanFreight[ind])}</text>
                </div>
              )}
            </div>
            <div className="col3">
              <text className="schedule-result-header-text">{QUOTE_HEADERS[1].toUpperCase()}</text>
              <text className="schedule-result-text">${comma(schedule.docFee)}</text>
            </div>
            <div className="col3">
              <text className="schedule-result-header-text">{QUOTE_HEADERS[2].toUpperCase()}</text>
              <text className="schedule-result-text">${comma(schedule.adminFee)}</text>
            </div>
          </div>
          <div className="finance-display-form">
            Note: FAK Rates (Except {schedule.except})
          </div>
          <button className="result-button" onClick={() => action(ind)}>
            Accept
          </button>
        </div>}
      </div>
    );
  }

  return (
    <div className="schedule-result-container">
      {/* props.location.state.detail */}
      <FixedSizeList headers={RESULT_HEADERS} data={DATA} row={row}/>
    </div>
  );
};

export default ScheduleResultList;

ScheduleResultList.propTypes = {
  action: PropTypes.func,
};