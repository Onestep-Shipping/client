import './UserList.css';

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import moment from 'moment';
import profileImg from '../../assets/profile-placeholder.png';

const UserList = props => {
  const [currentIndex, setIndex] = useState(0);
  const { setInd, opt, type } = props;
  return (
    <ul className={type + "-instruction-list"}> 
      {opt.map((shipment, i) => {
        const { status, form } = type === "booking" ? 
          shipment.bookingRequest : shipment.billInstruction;
        
        return (
        <li id={(i === currentIndex ? 'selected-item' : '')}
            className="bol-instruction-item"
            onClick={() => {
              setInd(i);
              setIndex(i);
            }} key={i}>
          <div>
            <input 
              type="checkbox" id="checkbox-1-1" 
              className="regular-checkbox" 
              disabled={true}
              checked={status === "Received"} 
            />
            <label htmlFor="checkbox-1-1"></label>
          </div>
          <img id={"profile" + (status === "Received" ? "-completed" : "-pending")}
            className="profile-image" 
            src={profileImg} alt="" />
          <div className="item-header-container">
            <span className="booking-id-text">{shipment.bookedBy.name}</span>
            <span className="customer-email-text">
              From: {shipment.bookedBy.personInCharge.name}
            </span>
          </div>
          <span>
            {moment(form.createdAt).calendar(null, {
              sameDay : 'HH:mm',
              lastDay : 'ddd',
              lastWeek : 'ddd',
              sameElse : 'ddd'
            })}
          </span>
        </li>)
      }
      )}
    </ul>
  );
}

export default UserList;

UserList.propTypes = {
  ind: PropTypes.number,
  setInd: PropTypes.func,
  opt: PropTypes.array,
  type: PropTypes.string,
};
