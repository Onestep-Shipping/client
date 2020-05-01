import React, { useState } from 'react';
import './Invoice.css';

import Header from '../../../components/Header/Header.js';

import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import UserList from '../../../components/UserList/UserList.js';
import INVOICE from '../../../data/InvoiceData.js';
import { InfoRow } from '../Helpers.js';
import pdfGenerator from './pdfGenerator.js';

const comma = x => {
  return Number(x).toLocaleString()
}

const Invoice = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fees, setFees] = useState(
    Array(INVOICE[currentIndex].booking.container.length + 2).fill(0)
  );

  const handleSubmit = e => {
    e.preventDefault();
    createInfoObject(e);
    // const pdf = pdfGenerator(createInfoObject(e));
    // var data = new FormData();
    // data.append('data', pdf);

    // TODO: Fetch formData to server
  }

  const onFeeChange = (e, i) => {
    let newFees = [...fees]; 
    let newVal = e.target.value;
    if (i < fees.length - 2) {
      newVal *=  INVOICE[currentIndex].booking.container[i].quantity;
    }
    newFees[i] = newVal;
    setFees(newFees);
  }

  const createInfoObject = e => {
    const { price, total, subTotal } = e.target;

    price.forEach(node => {
      console.log("Price: " + node.value);
    })
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
        <UserList 
          setInd={setCurrentIndex}
          opt={INVOICE} type="bol" />
        <div className="bol-instruction-detail"> 
          <div className="booking-id-container">
            <h1>Booking #{INVOICE[currentIndex].id}</h1>
          </div>
          <div className="customer-info-container">
            <text>Company: {INVOICE[currentIndex].company.name}</text>
            <text>Email: {INVOICE[currentIndex].email}</text>
          </div>

          <div className="form-container">
            <h2>Schedule</h2>
            <BookingDisplay id={'' + currentIndex} fields={8}/>
          </div>

          <div className="form-container">
            <h2>Information</h2>
            <div className="booking-details-container">
              <InfoRow label="Booking Number" value={INVOICE[currentIndex].id} />
              <InfoRow label="Commodity" value={INVOICE[currentIndex].booking.commodity} />
              <InfoRow label="Order/PO Number" value={INVOICE[currentIndex].bol.orderNo} />
            </div>
          </div>

          <form className="invoice-form-container" onSubmit={handleSubmit}>
            <h2>Invoice</h2>
            <div className="invoice-row">
                <text className="info-label-special">Description</text>
                <text className="info-label-special">Quantity</text>
                <text className="info-label-special">Container</text>
                <div className="usd-input-container">
                  <text className="info-label-special">Price (USD)</text>
                  <text className="info-label-special">Total (USD)</text>
                </div>
            </div>
            {INVOICE[currentIndex].booking.container.map((row, ind) => (
              <div className="invoice-row" key={ind}>
                <text>Ocean Freight</text>
                <text>{row.quantity}</text>
                <text>{row.containerType}</text>
                <div className="usd-input-container">
                <input 
                  type="text" name="price" className="usd-input" 
                  onChange={e => onFeeChange(e, ind)}
                />
                <input 
                  type="text" name="total" className="usd-input" 
                  disabled={true} value={comma(fees[ind])}
                />
              </div>
              </div>
            ))}
            <div className="invoice-row">
              <text>Document Fee</text>
              <div className="usd-input-container">
                <input 
                  type="text" name="price" className="usd-input" 
                  onChange={e => onFeeChange(e, fees.length - 2)}
                />
                <input 
                  type="text" name="total" className="usd-input" 
                  disabled={true} value={comma(fees[fees.length - 2])}
                />
              </div>
            </div>
            <div className="invoice-row">
              <text>Administration Fee</text>
              <div className="usd-input-container">
                <input 
                  type="text" name="price" className="usd-input" 
                  onChange={e => onFeeChange(e, fees.length - 1)}
                />
                <input 
                  type="text" name="total" className="usd-input" 
                  disabled={true} value={comma(fees[fees.length - 1])}
                />
              </div>
            </div>
            <div className="invoice-row-right">
              <text>Subtotal</text>
              <input 
                type="text" name="subTotal" className="total-input" 
                disabled={true} value={comma(fees.reduce((a, b) => a + b, 0))}
              />
            </div>
            <div className="bol-button-form">
              <input id="left-button" type="submit" className="result-button" value="Generate PDF" />
              <button  className="result-button">
                Send to Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
