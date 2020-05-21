import React, {useState} from 'react';
import './BookingRequest.css';

import Header from '../../../components/Header/Header.js';
import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import UserList from '../../../components/UserList/UserList.js';
import styles from '../../../components/ScheduleForm/ScheduleFormMin.module.css';
import DATA from '../../../data/ScheduleDetailsData.js';
import { InfoRow, ContainerDetail, Address, MiniDatePicker, MiniDatePickerTime } from '../Helpers.js';
import PdfGenerator from './PdfGenerator.js';
import FileUploadService from '../../../services/FileUploadService.js';
import GET_BOOKING_REQUEST from '../../../apollo/queries/GetBookingRequestQuery.js';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

const formatISOString = iso => {
  return moment(iso).utc().format('MM/DD/YYYY');
}

const BookingRequest = () => {
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);

  const { loading, error, data } = useQuery(GET_BOOKING_REQUEST, {
    fetchPolicy: 'cache-and-network'
  });

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const shipments = data.getAllShipments;

  const  { bookingRequest, schedule, bookedBy } = shipments[currentBookingIndex];

  const quote = schedule.route.quoteHistory
    .filter(quote => Date.parse(quote.validity.startDate) <=  Date.parse(schedule.startDate))
    .slice(0, 1)[0];

  const createInfoObject = e => {
    const { bookingNo, 
            etd, eta, terminal, doc, vgm,
            pickupLocationStreet, pickupLocationCity, pickupLocationCountry,
            returnLocationStreet, returnLocationCity, returnLocationCountry 
          } = e.target;
    
    return {
      company: bookedBy,
      schedule: DATA[currentBookingIndex],
      booking: bookingRequest,
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
          opt={shipments} type="booking"
        />
        <div className="booking-instruction-detail"> 
          <div className="booking-id-container">
            <h1>Booking Request</h1>
          </div>
          <div className="customer-info-container">
            <text>Contact: {bookedBy.personInCharge.name}</text>
            <text>Email: {bookedBy.email}</text>
            <text>
              {formatISOString(bookingRequest.form.createdAt)}
            </text>
          </div>

          <div className="form-container">
            <h2>Schedule</h2>
            <BookingDisplay  schedule={schedule} quote={quote} fields={8} />
          </div>

          <div className="form-container">
            <div className="booking-details-container">
              <InfoRow label="Commodity" value={bookingRequest.form.commodity} />
              <InfoRow label="HS Code" value={bookingRequest.form.hsCode} />
              <InfoRow label="Shipment Detail" value="" />
              <div className="shipment-detail-row">
                {bookingRequest.form.containers.map((row, ind) => (
                 <ContainerDetail key={ind} container={row} ind={ind} />
                ))}
              </div>
              <InfoRow label="Payment Term" value={bookingRequest.form.paymentTerm} />
              <InfoRow 
                label="CAED/AES filling by OneStep" 
                value={bookingRequest.form.autoFilling ? "Yes" : "No"} 
              />
            </div>
          </div>

          {!bookingRequest.status === "Received" &&
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