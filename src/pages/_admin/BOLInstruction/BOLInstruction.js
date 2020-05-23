import './BOLInstruction.css';

import {InfoRow, ShipmentDetail} from '../Helpers.js';
import React, {useRef, useState} from 'react';

import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import CREATE_BOL from '../../../apollo/mutations/CreateBOLMutation.js';
import FileUploadService from '../../../services/FileUploadService.js';
import GET_BILL_INSTRUCTION from '../../../apollo/queries/GetBillInstructionQuery.js';
import Header from '../../../components/Header/Header.js';
import UserList from '../../../components/UserList/UserList.js';
import Utils from '../../../utils/Helpers.js';
import client from '../../../apollo/index.js';
import { useQuery } from '@apollo/react-hooks';

const BOLInstruction = () => {
  const [currentBolIndex, setCurrentBolIndex] = useState(0);
  const [pdf, setPDF] = useState('');
  const inputFile = useRef(null);

  const { loading, error, data } = useQuery(GET_BILL_INSTRUCTION, {
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const shipments = data.getAllShipments.filter(
    shipment => shipment.billInstruction.status !== "Ready"
  );

  const  { billInstruction, schedule, bookedBy } = shipments[currentBolIndex];

  console.log(billInstruction);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const uploadedResponse = await FileUploadService.uploadFile(formData);
    const { fileLocation } = uploadedResponse.data;
    client.mutate({
      mutation: CREATE_BOL,
      variables: { 
        shipmentId: shipments[currentBolIndex]._id,
        pdf: fileLocation
      },
      refetchQueries: [{ query: GET_BILL_INSTRUCTION }]
    }).then(response => {
      const { createBOL } = response.data;
      if (createBOL === "OK") {
        alert("BOL has been sent!");
        setPDF("");
      }
    })
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
        <UserList 
          setInd={handleCurrentBolIndexChange}
          opt={shipments} type="bol" />
        <div className="bol-instruction-detail"> 
          <div className="booking-id-container">
            <h1>BOL Instruction</h1>
          </div>
          <div className="customer-info-container">
            <span>Contact: {bookedBy.personInCharge.name}</span>
            <span>Email: {bookedBy.email}</span>
            <span>
              {Utils.formatISOString(billInstruction.form.updatedAt)}
            </span>
          </div>

          {billInstruction.status === "Received" && 
          <span 
            className="schedule-result-text-link" 
            onClick={() => Utils.handlePDFOpen(billInstruction.pdf)}>
            BOL has been sent.
          </span>}

          <div className="form-container">
            <h2>Schedule</h2>
            <BookingDisplay schedule={schedule} fields={3}/>
          </div>

          <div className="form-container">
            <h2>BOL Instruction</h2>
            <div className="booking-details-container">
              <InfoRow label="Shipper" value={billInstruction.form.shipper} />
              <InfoRow label="Consignee" value={billInstruction.form.consignee} />
              <InfoRow label="Notify" value={billInstruction.form.notify} />
              <InfoRow label="Description of Goods" value={billInstruction.form.description} />
              <InfoRow label="Shipment Detail" value="" />
              <div className="shipment-detail-row">
                {billInstruction.form.containers.map((container, ind) => (
                 <ShipmentDetail key={ind} container={container} ind={ind} />
                ))}
              </div>
              <InfoRow label="Order/PO Number" value={billInstruction.form.orderNo} />
              <InfoRow label="HS Code" value={billInstruction.form.hsCode} />
              <InfoRow label="CAED/AES Number" value={billInstruction.form.caedNo} />
              <InfoRow label="Cargo Value" value={billInstruction.form.cargoValue} />
            </div>
          </div>

          <div className="pdf-text">{pdf}</div>
          {!shipments[currentBolIndex].isCompleted &&
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
              {pdf && <input type="submit" className="result-button" value="Send to Customer" />}
            </form>
          }
        </div>
      </div>
    </div>
  );
};

export default BOLInstruction;
