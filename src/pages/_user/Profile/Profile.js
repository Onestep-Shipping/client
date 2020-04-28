import React, {useCallback} from 'react';
import './Profile.css';
import { useHistory } from 'react-router-dom';

import Header from '../../../components/Header/Header.js';
import FixedSizeList from '../../../components/FixedSizeList/FixedSizeList.js';
import DATA from '../../../data/ScheduleDetailsData.js';

const Profile = () => {
  const history = useHistory();
  const PROFILE_HEADERS = ['#', 'Date Booked', 'From', 'To', 'Vessel', 'Booking Status', 'BOL Status', 'Invoice Status'];

  const chooseBackgrounColorFromStatus = (booking, bol, invoice) => {
    if (booking === "In Process" && bol === "Not Ready") {
      return "#f0f0f0"; // gray
    } else if (booking === "Received" && bol === "Received" && invoice === "Received") {
      return "#a0eec1"; // green
    } else {
      return "#f2e89d"; // yellow
    }
  };

  const handleBook = useCallback((status, id) => {
    if (status === "Received") {
      history.push('/booking-confirmation/' + id);
    }
  }, [history]);

  const handleBol = (status, id) => {
    if (status === "Ready") {
      history.push('/bill-of-lading-instruction/' + id);
    } else if (status === "Received") {
      history.push('/bill-of-lading-confirmation/' + id);
    }
  }

  const row = (booking, ind) => {
    return (
      <div key={ind}>
        <div 
          className='booking-profile-row' 
          style={{
            backgroundColor: chooseBackgrounColorFromStatus(
              booking.bookingStatus, booking.bolStatus, booking.invoiceStatus
            )
          }} >
          <div className="col-numb">
            <text className="schedule-result-text">{ind + 1}</text>
          </div>
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
            <text className="schedule-result-text">{booking.ves.substring(0, booking.ves.indexOf('/'))}</text>
          </div>
          <div className="col" onClick={() => handleBook(booking.bookingStatus, ind)}>
            <text
              id={booking.bookingStatus === "Received" ? "red-link" : ""}
              className={"schedule-result-text"}>
                {booking.bookingStatus}
            </text>
          </div>
          <div className="col" onClick={() => handleBol(booking.bolStatus, ind)}>
            <text 
              id={booking.bolStatus === "Received" ? "red-link" : ""}
              className={"schedule-result-text" + 
                (booking.bolStatus === "Ready" ? "-link" : "")}>
                {booking.bolStatus}
            </text>
          </div>
          <div className="col" onClick={() => handleBol(booking.invoiceStatus, ind)}>
            <text 
              id={booking.invoiceStatus === "Received" ? "red-link" : ""}
              className={"schedule-result-text"}>
                {booking.invoiceStatus}
            </text>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <div className="profile-container">
          <FixedSizeList headers={PROFILE_HEADERS} data={DATA} row={row}/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
