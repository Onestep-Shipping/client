import React, { useState } from 'react';
import './UserList.css';
import PropTypes from 'prop-types';
import profileImg from '../../assets/profile-placeholder.png';

const UserList = props => {
  const [currentIndex, setIndex] = useState(0);
  const { setInd, opt, type } = props;

  return (
    <ul className={type + "-instruction-list"}> 
      {opt.map((item, i) => (
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
              checked={item.isCompleted} 
            />
            <label htmlFor="checkbox-1-1"></label>
          </div>
          <img id={"profile" + (item.isCompleted ? "-completed" : "-pending")}
            className="profile-image" 
            src={profileImg} alt="" />
          <div className="item-header-container">
            <text className="booking-id-text">
              {type === "booking" ? item.company.name : ("Booking #" + item.id)}
            </text>
            <text className="customer-email-text">
              From: {type === "booking" ? item.personInCharge : item.email}
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
