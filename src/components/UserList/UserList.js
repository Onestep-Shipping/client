import React, { useState } from 'react';
import './UserList.css';
import PropTypes from 'prop-types';
import profileImg from '../../assets/profile-placeholder.png';

const UserList = props => {
  const [currentIndex, setIndex] = useState(0);
  const { setInd, opt, type } = props;

  return (
    <ul className={type + "-instruction-list"}> 
      {opt.map((shipment, i) => (
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
              checked={shipment.bookingRequest.status === "Received"} 
            />
            <label htmlFor="checkbox-1-1"></label>
          </div>
          <img id={"profile" + (shipment.bookingRequest.status === "Received" ? "-completed" : "-pending")}
            className="profile-image" 
            src={profileImg} alt="" />
          <div className="item-header-container">
            <text className="booking-id-text">
              {type === "booking" ? shipment.bookedBy.name : ("Booking #" + shipment._id)}
            </text>
            <text className="customer-email-text">
              From: {shipment.bookedBy.personInCharge.name}
            </text>
          </div>
          <text>Fri</text>
        </li>
        )
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
