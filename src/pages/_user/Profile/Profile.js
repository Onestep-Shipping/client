import React, {useState, useCallback, useRef, useEffect} from 'react';
import ToolTip from 'react-portal-tooltip'
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
  const [isTooltipActive, setIsTooltipActive] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(-1);

  const node = useRef();

  const measuredRef = useCallback((e) => {
    if (node.current && !node.current.contains(e.target)) {
      setIsTooltipActive(false); 
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', measuredRef);

    return () => {
      document.removeEventListener('mousedown', measuredRef);
    };
  }, [measuredRef]);

  const toggleToolTip = ind => { 
    setCurrentBooking(ind);
    setIsTooltipActive(true); 
  }

  const PROFILE_HEADERS = [
    '#', 'Date Booked', 'From', 'To', 'Vessel', 
    'Booking Status', 'BOL Status', 'Invoice Status'
  ];

  const handleBook = useCallback((status) => {
    if (status === "Received") {
      window.open(bookingConfirmationPdf, '_blank');
    }
  }, []);

  const handleBol = useCallback((status, id) => {
    if (status === "Ready" ||  (status === "In Process")) {
      history.push('/form/bill-of-lading-instruction/' + id);
    } else if (status === "Received") {
       window.open(bolPdf, '_blank');
    }
  }, [history]);

  const handleInvoice = useCallback((status) => {
    if (status === "Received") {
      window.open(invoicePdf, '_blank');
    }
  }, []);
  
  const onRollClick = () => {
    history.push("/rolling/" + currentBooking);
  }

  const onCancelClick = () => {
    const message = 'Are you sure you want to cancel booking request #' + currentBooking + '?';
    if (window.confirm(message)) {
      console.log("Remove!");
    }
  }

  const row = (booking, ind) => {
    return (
      <div key={ind}>
        <div className='booking-profile-row'>
          <div className="col-numb">
            <text id={"text" + ind} className="booking-no-button" onClick={() => toggleToolTip(ind)}>
              {ind + 1}
            </text>
            <ToolTip 
              tooltipTimeout={0} active={isTooltipActive} 
              position="top" arrow="center" parent={"#text" + currentBooking}>
                <div ref={node} className="tiptool-container">
                  <button className="tooltip-button" onClick={onRollClick}>Roll</button>
                  <button className="tooltip-button" onClick={onCancelClick}>Cancel</button>
                </div>
            </ToolTip>
          </div>
          <div className="col">
            <text className="schedule-result-text">{booking.bookedDate}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{booking.startLocation}</text>
            <text className="schedule-result-text-time">{booking.startDate}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">{booking.endLocation}</text>
            <text className="schedule-result-text-time">{booking.endDate}</text>
          </div>
          <div className="col">
            <text className="schedule-result-text">
              {booking.vessels.substring(0, booking.vessels.indexOf('/'))}
            </text>
          </div>
          <div className="col" onClick={() => handleBook(booking.bookingStatus)}>
            <text
              id={booking.bookingStatus === "Received" ? "red-link" : ""}
              className={"schedule-result-text"}>
                {booking.bookingStatus}
            </text>
          </div>
          <div className="col" onClick={() => handleBol(booking.bolStatus)}>
            <text 
              id={booking.bolStatus === "Received" ? "red-link" : ""}
              className={"schedule-result-text" + 
                ((booking.bolStatus === "Ready" || booking.bolStatus === "In Process") ? "-link" : "")}>
                {booking.bolStatus}
            </text>
          </div>
          <div className="col" onClick={() => handleInvoice(booking.invoiceStatus)}>
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
