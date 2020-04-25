import React from 'react';
import './Profile.css';
import {useHistory} from 'react-router-dom';

import Header from '../../components/Header/Header.js';
import DATA from '../../data/ScheduleDetailsData.js';

const Profile = () => {
  const history = useHistory();
  const PROFILE_HEADERS = ['Date Booked', 'From', 'To', 'Vessel', 'Booking Status'];

  const chooseBackgrounColorFromStatus = (status) => {
    if (status === "In Process") {
      return "#f2e89d"; // yellow
    } else {
      return "#a0eec1"; // green
    }
  };

  const handleClick = (status, id) => {
    if (status === "Received") {
      history.push('/billing-instruction/' + id);
    }
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <div className="profile-container">
          <div className="schedule-result-header-row">
            {
              PROFILE_HEADERS.map((header, ind) => {
                return (
                  <div className="col" key={ind}>
                    <text className="schedule-result-header-text">{header}</text>
                  </div>
                );
              })
            }
          </div>
          {
            DATA.map((booking, ind) => {
              return (
                <div className="schedule-result-row-container" key={ind}>
                  <div 
                    className='schedule-result-row' 
                    style={{backgroundColor: chooseBackgrounColorFromStatus(booking.status)}} >
                    <div className="col">
                      <text className="schedule-result-text">{booking.bookedDate}</text>
                    </div>
                    <div className="col">
                      <text className="schedule-result-text">{booking.from}</text>
                      <text className="schedule-result-text-time">{booking.fromDate}</text>
                    </div>
                    <div className="col">
                      <text className="schedule-result-text">{booking.to}</text>
                      <text className="schedule-result-text-time">{booking.toDate}</text>
                    </div>
                    <div className="col">
                      <text className="schedule-result-text">{booking.ves}</text>
                    </div>
                    <div className="col" onClick={() => handleClick(booking.status, ind)}>
                      <text 
                        className={"schedule-result-text" + (booking.status === "Received" ? "-link" : "")}>
                          {booking.status}
                      </text>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
