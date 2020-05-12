import React, {useState} from 'react';
import './BookingRequest.css';

import Header from '../../../components/Header/Header.js';
import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import UserList from '../../../components/UserList/UserList.js';
import styles from '../../../components/ScheduleForm/ScheduleFormMin.module.css';
import BOOKING_REQ from '../../../data/BookingRequestData.js';
import DATA from '../../../data/ScheduleDetailsData.js';
import { InfoRow, ContainerDetail, Address, MiniDatePicker, MiniDatePickerTime } from '../Helpers.js';
import PdfGenerator from './PdfGenerator.js';
import FileUploadService from '../../../services/FileUploadService.js';

const BookingRequest = () => {
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  const today = new Date();
  const myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const [terminalDate, setTerminalDate] = useState(myToday);
  const [docDate, setDocDate] = useState(myToday);
  const [vgmDate, setVgmDate] = useState(myToday);
  const [etdDate, setEtdDate] = useState(DATA[currentBookingIndex].startDate);
  const [etaDate, setEtaDate] = useState(DATA[currentBookingIndex].endDate);

  const handleIndexChange = newInd => {
    setCurrentBookingIndex(newInd);
    setTerminalDate(myToday);
    setDocDate(myToday);
    setVgmDate(myToday);
    [...document.getElementsByTagName("input")].forEach(node => node.value = "");
  }

  const handlePreview = e => {
    e.preventDefault();
    PdfGenerator.preview(createInfoObject(e));
  }

  const handleUpload = e => {
    e.preventDefault();
    const blob = PdfGenerator.uploadToServer();
    const pdf = new File(
      [blob], 
      'Booking Confirmation #' + document.getElementById("bookingNo").value + '.pdf', 
      { type: 'application/pdf' } 
    )
    const formData = new FormData();
    formData.append("file", pdf);

    FileUploadService.uploadFile(formData)
      .then(res => {
        alert(res.data.fileLocation);
      })
      .catch(e => {
        console.log(e.response);
      });
  }

  const createInfoObject = e => {
    const { bookingNo, 
            etd, eta, terminal, doc, vgm,
            pickupLocationStreet, pickupLocationCity, pickupLocationCountry,
            returnLocationStreet, returnLocationCity, returnLocationCountry 
          } = e.target;
    
    return {
      company: BOOKING_REQ[currentBookingIndex].company,
      schedule: DATA[currentBookingIndex],
      booking: BOOKING_REQ[currentBookingIndex].booking,
      bookingNo: bookingNo.value,
      etd: etd.value,
      eta: eta.value,
      terminalDate: terminal.value, 
      docDate: doc.value, 
      vgmDate: vgm.value,
      pickupLine1: pickupLocationStreet.value,
      pickupLine2: pickupLocationCity.value,
      pickupLine3: pickupLocationCountry.value,
      returnLine1: returnLocationStreet.value,
      returnLine2: returnLocationCity.value,
      returnLine3: returnLocationCountry.value,
    }
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
        <UserList  
          setInd={handleIndexChange}
          opt={BOOKING_REQ} type="booking"
        />
        <div className="booking-instruction-detail"> 
          <div className="booking-id-container">
            <h1>Booking Request</h1>
          </div>
          <div className="customer-info-container">
            <text>Contact: {BOOKING_REQ[currentBookingIndex].personInCharge}</text>
            <text>Email: {BOOKING_REQ[currentBookingIndex].email}</text>
            <text>{BOOKING_REQ[currentBookingIndex].dateSent}</text>
          </div>

          <div className="form-container">
            <h2>Schedule</h2>
            <BookingDisplay id={'' + currentBookingIndex} fields={8}/>
          </div>

          <div className="form-container">
            <div className="booking-details-container">
              <InfoRow label="Commodity" value={BOOKING_REQ[currentBookingIndex].booking.commodity} />
              <InfoRow label="HS Code" value={BOOKING_REQ[currentBookingIndex].booking.hsCode} />
              <InfoRow label="Shipment Detail" value="" />
              <div className="shipment-detail-row">
                {BOOKING_REQ[currentBookingIndex].booking.container.map((row, ind) => (
                 <ContainerDetail key={ind} container={row} ind={ind} />
                ))}
              </div>
              <InfoRow label="Payment Term" value={BOOKING_REQ[currentBookingIndex].booking.payment} />
              <InfoRow label="CAED/AES filling by OneStep" value={BOOKING_REQ[currentBookingIndex].booking.autoFilling} />
            </div>
          </div>

          {!BOOKING_REQ[currentBookingIndex].isCompleted &&
          <form className="booking-confirmation-container" onSubmit={handlePreview}>
            <h2>Booking Confirmation</h2>
            <div className="confirmation-info-container">
              <text className={styles.scheduleLabel}>Booking No.</text>
              <input
                type="text"
                id="bookingNo"
                name="bookingNo"
                className="commodity-input"
                placeholder="i.e. 1234567"
                required />
            </div>
            <div className="confirmation-info-container">
              <text className={styles.scheduleLabel}>ETD</text>
              <text className={styles.scheduleLabel}>ETA</text>
            </div>
            <div className="confirmation-info-container">
              <MiniDatePicker name="etd" value={new Date(etdDate)} action={setEtdDate} />
              <MiniDatePicker name="eta" value={new Date(etaDate)} action={setEtaDate} id="align-right"/>
            </div>
            <div className="confirmation-info-container">
              <text className={styles.scheduleLabel}>Terminal Cut-off</text>
              <text className={styles.scheduleLabel}>Document Cut-off</text>
              <text className={styles.scheduleLabel}>VGM Cut-off</text>
            </div>
            <div className="confirmation-info-container">
              <MiniDatePickerTime name="terminal" value={terminalDate} action={setTerminalDate} />
              <MiniDatePickerTime name="doc" value={docDate} action={setDocDate} />
              <MiniDatePickerTime name="vgm" value={vgmDate} action={setVgmDate} />
            </div>

            <div className="confirmation-info-container">
              <text className={styles.scheduleLabelSpecial}>Empty Pickup Location</text>
              <text className={styles.scheduleLabelSpecial}>Return Location</text>  
            </div>
            <Address type="Street" />
            <Address type="City" />
            <Address type="Country" />

            <div className="bol-button-form">
              <input id="left-button" type="submit" className="result-button" value="Generate PDF" />
              <button  className="result-button" onClick={handleUpload}>
                Send to Customer
              </button>
            </div>
          </form>}
        </div>
      </div>
    </div>
  );
};

export default BookingRequest;