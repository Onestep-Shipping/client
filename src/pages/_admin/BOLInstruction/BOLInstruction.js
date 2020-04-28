import React, {useState, useRef} from 'react';
import './BOLInstruction.css';
import profileImg from '../../../assets/profile-placeholder.png';

import Header from '../../../components/Header/Header.js';
import BOL from '../../../data/BOLInstructionData.js';

const BOLInstruction = () => {
  const [currentBolIndex, setCurrentBolIndex] = useState(0);
  const [pdf, setPDF] = useState('')
  const inputFile = useRef(null) 

  const handleChange = () => {
    const pathSplit = document.getElementById("file").value.split("\\");
    const newVal = pathSplit[pathSplit.length - 1]
    if (newVal !== "") {
      setPDF(newVal);
    }
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
          <ul className="bol-instruction-list"> 
            {BOL.map((booking, ind) => (
                <li id={(ind === currentBolIndex ? 'selected-item' : '')}
                    className="bol-instruction-item"
                    onClick={() => setCurrentBolIndex(ind)} key={ind}>
                  <img className="profile-image" src={profileImg} alt="Profile Image" />
                  <div className="item-header-container">
                    <text className="booking-id-text">Booking #{booking.id}</text>
                    <text className="customer-email-text">From: {booking.email}</text>
                  </div>
                  <text>Fri</text>
                </li>
              )
            )}
          </ul>
        <div className="bol-instruction-detail"> 
          <div className="booking-id-container">
            <text className="booking-id-text-in-detail">Booking #{BOL[currentBolIndex].id}</text>
          </div>
          <div className="customer-info-container">
            <text>Email: {BOL[currentBolIndex].email}</text>
            <text>{BOL[currentBolIndex].dateSent}</text>
          </div>

          <div className="form-container">
            <text className="booking-id-text">Schedule</text>
            <div className="booking-details-container">
              <div className="info-row">
                <div>
                  <text className="info-label">From: </text>
                  <text className="schedule-info-text-left">{BOL[currentBolIndex].schedule.fromLocation}</text>
                </div>
                <div>
                  <text className="info-label">To: </text>
                  <text className="schedule-info-text">{BOL[currentBolIndex].schedule.toLocation}</text>
                </div>
              </div>
              <div className="info-row">
                <text className="info-label">Vessels: </text>
                <text className="schedule-info-text">{BOL[currentBolIndex].schedule.ves}</text>
              </div>
            </div>
          </div>

          <div className="form-container">
            <text className="booking-id-text">BOL Instruction</text>
            <div className="booking-details-container">
              <div className="info-row">
                <text className="info-label">Shipper: </text>
                <text className="schedule-result-text">{BOL[currentBolIndex].bol.shipper}</text>
              </div>
              <div className="info-row">
                <text className="info-label">Consignee: </text>
                <text className="schedule-result-text">{BOL[currentBolIndex].bol.consignee}</text>
              </div>
              <div className="info-row">
                <text className="info-label">Notify: </text>
                <text className="schedule-result-text">{BOL[currentBolIndex].bol.notify}</text>
              </div>
              <div className="info-row">
                <text className="info-label">Description of Goods: </text>
                <text className="schedule-result-text">{BOL[currentBolIndex].bol.description}</text>
              </div>
              <div className="info-row">
                <text className="info-label">Shipment Detail: </text>
              </div>
              <div className="shipment-detail-row">
                {BOL[currentBolIndex].bol.cargoInfo.map((container, ind) => (
                  <div className="shipment-detail-container" key={ind}>
                    <text className="schedule-result-text">{ind + 1}</text>
                    <div className="shipment-ind-row">
                      <text className="schedule-result-text">Container No.</text>
                      <text className="schedule-result-text">{container.containerNo}</text>
                    </div>
                    <div className="shipment-ind-row">
                      <text className="schedule-result-text">Seel No. </text>
                      <text className="schedule-result-text">{container.seelNo}</text>
                    </div>
                    <div className="shipment-ind-row">
                      <text className="schedule-result-text">Cargo Weight (kgs)</text>
                      <text className="schedule-result-text">{container.weight}</text>
                    </div>
                    <div className="shipment-ind-row">
                      <text className="schedule-result-text">Measurement (cbm)</text>
                      <text className="schedule-result-text">{container.measurement}</text>
                    </div>
                    <div className="shipment-ind-row">
                      <text className="schedule-result-text">VGM</text>
                      <text className="schedule-result-text">{container.vgm}</text>
                    </div>
                  </div>
                ))}
              </div>
              <div className="info-row">
                <text className="info-label">Order/PO Number: </text>
                <text className="schedule-result-text">{BOL[currentBolIndex].bol.orderNo}</text>
              </div>
              <div className="info-row">
                <text className="info-label">HS Code: </text>
                <text className="schedule-result-text">{BOL[currentBolIndex].bol.hsCode}</text>
              </div>
              <div className="info-row">
                <text className="info-label">CAED/AES Number: </text>
                <text className="schedule-result-text">{BOL[currentBolIndex].bol.caedNo}</text>
              </div>
              <div className="info-row">
                <text className="info-label">Cargo Value: </text>
                <text className="schedule-result-text">{BOL[currentBolIndex].bol.value}</text>
              </div>
            </div>
          </div>

          <div className="pdf-text">{pdf}</div>
          <div className="bol-button-form">
            <label htmlFor="file" className="file-label"> 
              Choose a file
            </label>
            <input 
              type='file' id='file' ref={inputFile} 
              className="inputfile" 
              onChange={handleChange}
              accept="application/pdf"
            />
            <button className="result-button">Send to Customer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BOLInstruction;
