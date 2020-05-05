import React, {useCallback} from 'react';
import './Profile.css';
import { useHistory } from 'react-router-dom';

import Header from '../../../components/Header/Header.js';
import FixedSizeList from '../../../components/FixedSizeList/FixedSizeList.js';
import DATA from '../../../data/ScheduleDetailsData.js';

import bookingConfirmationPdf from './pdf/booking-confirmation.pdf';
import bolPdf from './pdf/BOL.pdf';
import invoicePdf from './pdf/invoice.pdf';

const Profile = () => {
  const history = useHistory();
  const PROFILE_HEADERS = [
    '#', 'Date Booked', 'From', 'To', 'Vessel', 
    'Booking Status', 'BOL Status', 'Invoice Status'
  ];

  const handleBook = useCallback((status, id) => {
    if (status === "Received") {
      window.open(bookingConfirmationPdf, '_blank');
    }
  }, []);

  const handleBol = useCallback((status, id) => {
    if (status === "Ready") {
      history.push('/bill-of-lading-instruction/' + id);
    } else if (status === "Received") {
       window.open(bolPdf, '_blank');
    }
  }, [history]);

  const handleInvoice = useCallback((status, id) => {
    if (status === "Received") {
      window.open(invoicePdf, '_blank');
    }
  }, []);

  const row = (booking, ind) => {
    return (
      <div key={ind}>
        <div className='booking-profile-row'>
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
          <div className="col" onClick={() => handleInvoice(booking.invoiceStatus, ind)}>
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
