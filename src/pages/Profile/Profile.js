import React from 'react';
import './Profile.css';
import {useHistory} from 'react-router-dom';

import Header from '../../components/Header/Header.js';
import DATA from '../../data/ScheduleDetailsData.js';

const Profile = () => {
  const history = useHistory();
  const PROFILE_HEADERS = ['#', 'Date Booked', 'From', 'To', 'Vessel', 'Booking Status', 'BOL Status'];

  const chooseBackgrounColorFromStatus = (booking, bol) => {
    if (booking === "In Process" && bol === "Not Ready") {
      return "#e6e6e6"; // gray
    } else if (booking === "Completed" && bol === "Completed") {
      return "#a0eec1"; // green
    } else {
      return "#f2e89d"; // yellow
    }
  };

  const handleBook = (status, id) => {
    if (status === "Received") {
      history.push('/bill-of-lading/' + id);
    }
  }

  const handleBol = (status, id) => {
    if (status === "Received") {
      console.log(id);
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
                  <div className={"col" + (ind === 0 ? "2" : "3")} key={ind}>
                    <text className="schedule-result-header-text">{header}</text>
                  </div>
                );
              })
            }
          </div>
          {
            DATA.map((booking, ind) => {
              return (
                <div key={ind}>
                  <div 
                    className='booking-profile-row' 
                    style={{
                      backgroundColor: chooseBackgrounColorFromStatus(booking.bookingStatus, booking.bolStatus)
                    }} >
                    <div className="col2">
                      <text className="schedule-result-text">{ind + 1}</text>
                    </div>
                    <div className="col3">
                      <text className="schedule-result-text">{booking.bookedDate}</text>
                    </div>
                    <div className="col3">
                      <text className="schedule-result-text">{booking.from}</text>
                      <text className="schedule-result-text-time">{booking.fromDate}</text>
                    </div>
                    <div className="col3">
                      <text className="schedule-result-text">{booking.to}</text>
                      <text className="schedule-result-text-time">{booking.toDate}</text>
                    </div>
                    <div className="col3">
                      <text className="schedule-result-text">{booking.ves.substring(0, booking.ves.indexOf('/'))}</text>
                    </div>
                    <div className="col3" onClick={() => handleBook(booking.bookingStatus, ind)}>
                      <text
                        id={booking.bookingStatus === "Received" ? "red-link" : ""}
                        className={"schedule-result-text" + 
                          (booking.bookingStatus === "Completed" ? "-link" : "")}>
                          {booking.bookingStatus}
                      </text>
                    </div>
                    <div className="col3" onClick={() => handleBol(booking.bolStatus, ind)}>
                      <text 
                        id={booking.bolStatus === "Received" ? "red-link" : ""}
                        className={"schedule-result-text" + 
                          (booking.bolStatus === "Completed" ? "-link" : "")}>
                          {booking.bolStatus}
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
