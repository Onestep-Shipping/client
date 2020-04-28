import React, {useState, useRef} from 'react';
import './BOLInstruction.css';
import profileImg from '../../../assets/profile-placeholder.png';

import Header from '../../../components/Header/Header.js';
import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import BOL from '../../../data/BOLInstructionData.js';
import {InfoRow, ShipmentDetail} from './Helpers.js';

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

  const handleCurrentBolIndexChange = ind => {
    if (ind !== currentBolIndex) {
      setPDF("");
    }
    setCurrentBolIndex(ind)
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
          <ul className="bol-instruction-list"> 
            {BOL.map((booking, ind) => (
                <li id={(ind === currentBolIndex ? 'selected-item' : '')}
                    className={"bol-instruction-item" + (booking.isCompleted ? "-completed" : "-pending")}
                    onClick={() => handleCurrentBolIndexChange(ind)} key={ind}>
                  <div>
                    <input 
                      type="checkbox" id="checkbox-1-1" className="regular-checkbox" 
                      checked={booking.isCompleted} 
                    />
                    <label htmlFor="checkbox-1-1"></label>
                  </div>
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
            <BookingDisplay id={'' + currentBolIndex} fields={3}/>
          </div>

          <div className="form-container">
            <text className="booking-id-text">BOL Instruction</text>
            <div className="booking-details-container">
              <InfoRow label="Shipper" value={BOL[currentBolIndex].bol.shipper} />
              <InfoRow label="Consignee" value={BOL[currentBolIndex].bol.consignee} />
              <InfoRow label="Notify" value={BOL[currentBolIndex].bol.notify} />
              <InfoRow label="Description of Goods" value={BOL[currentBolIndex].bol.description} />
              <InfoRow label="Shipment Detail" value="" />
              <div className="shipment-detail-row">
                {BOL[currentBolIndex].bol.cargoInfo.map((container, ind) => (
                 <ShipmentDetail key={ind} container={container} ind={ind} />
                ))}
              </div>
              <InfoRow label="Order/PO Number" value={BOL[currentBolIndex].bol.orderNo} />
              <InfoRow label="HS Code" value={BOL[currentBolIndex].bol.hsCode} />
              <InfoRow label="CAED/AES Number" value={BOL[currentBolIndex].bol.caedNo} />
              <InfoRow label="Cargo Value" value={BOL[currentBolIndex].bol.value} />
            </div>
          </div>

          <div className="pdf-text">{pdf}</div>
          {!BOL[currentBolIndex].isCompleted &&
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
          }
        </div>
      </div>
    </div>
  );
};

export default BOLInstruction;
