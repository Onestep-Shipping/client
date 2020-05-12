import React, {useState, useRef} from 'react';
import './BOLInstruction.css';

import Header from '../../../components/Header/Header.js';
import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import UserList from '../../../components/UserList/UserList.js';
import BOL from '../../../data/BOLInstructionData.js';
import {InfoRow, ShipmentDetail} from '../Helpers.js';
import FileUploadService from '../../../services/FileUploadService.js';

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
    setCurrentBolIndex(ind);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    FileUploadService.uploadFile(formData)
      .then(res => {
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
        <UserList 
          setInd={handleCurrentBolIndexChange}
          opt={BOL} type="bol" />
        <div className="bol-instruction-detail"> 
          <div className="booking-id-container">
            <h1>BOL Instruction</h1>
          </div>
          <div className="customer-info-container">
            <text>Email: {BOL[currentBolIndex].email}</text>
            <text>{BOL[currentBolIndex].dateSent}</text>
          </div>

          <div className="form-container">
            <h2>Schedule</h2>
            <BookingDisplay id={'' + currentBolIndex} fields={3}/>
          </div>

          <div className="form-container">
            <h2>BOL Instruction</h2>
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
            <form 
              className="bol-button-form" 
              encType="multipart/form-data"
              onSubmit={handleSubmit}>
              <label htmlFor="file" className="file-label"> 
                Choose a file
              </label>
              <input 
                name="file"
                type='file' id='file' ref={inputFile} 
                className="inputfile" 
                onChange={handleChange}
                accept="application/pdf"
              />
              <input type="submit" className="result-button" value="Send to Customer" />
            </form>
          }
        </div>
      </div>
    </div>
  );
};

export default BOLInstruction;
