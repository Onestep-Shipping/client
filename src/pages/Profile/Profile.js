import React from 'react';
import './Profile.css';
import profilePlaceholder from '../../assets/profile-placeholder.png';

import Header from '../../components/Header/Header.js';
import DATA from '../../data/ScheduleDetailsData.js';

const Profile = () => {
  const TRACKING_HEADERS = ['Date Booked', 'From', 'To', 'Carrier', 'Booking Status'];

  const chooseBackgrounColorFromStatus = (status) => {
    if (status === "In Process") {
      return "#f2e89d"; // yellow
    } else {
      return "#a0eec1"; // green
    }
  };

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <div className="profile-container">
          <img className="profile-img" src={profilePlaceholder} alt="Profile Picture"/>
          <div className="user-info-container">
            <h1>Shippose</h1>
            <div className="user-info-row">
              <text className="info-label-link" id="email">scarlet.nguyen01@gmail.com</text>
              <text className="info-label-link">(604) 369-9123</text>
            </div>
            <div className="user-info-row">
              <text className="info-label">Tax ID: </text>
              <text className="schedule-info-text-left">123456</text>
            </div>
            <div className="user-info-row">
              <text className="info-label">Person In-charge: </text>
              <text className="schedule-info-text">Scarlet Nguyen</text>
            </div>
            <div className="user-info-row">
              <text className="info-label">Position: </text>
              <text className="schedule-info-text">Logistics Coordinator</text>
            </div>
          </div>
        </div>
        <div className="tracking-container">
          <div className="schedule-result-header-row">
            {
              TRACKING_HEADERS.map((header, ind) => {
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
                      <text className="schedule-result-text">{booking.carrier}</text>
                    </div>
                    <div className="col">
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
