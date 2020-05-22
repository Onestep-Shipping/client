import './Invoice.css';

import { FinanceRow, NumberInput } from './Helpers';
import React, { useState } from 'react';

import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import { CONTAINER_TYPES } from '../../../constants/ServiceFormConstants';
import DATA from '../../../data/ScheduleDetailsData.js';
import FileUploadService from '../../../services/FileUploadService.js';
import Header from '../../../components/Header/Header.js';
import INVOICE from '../../../data/InvoiceData.js';
import { InfoRow } from '../Helpers.js';
import PdfGenerator from './pdfGenerator.js';
import QUOTE_DATA from '../../../data/QuoteUpdateData';
import { QuoteRow } from '../QuoteUpdate/Helpers';
import UserList from '../../../components/UserList/UserList.js';
import Utils from '../../../utils/Helpers.js';

const initCost = ind => {
  let finalCost = 0;
  INVOICE[ind].booking.container.map(row => 
    CONTAINER_TYPES.map((type, type_ind) => function() { 
      if (type === row.containerType) {
        finalCost += (QUOTE_DATA[ind].buying.oceanFreight[type_ind] * row.quantity);
      }
    })
  )
  finalCost += QUOTE_DATA[ind].buying.docFee + QUOTE_DATA[ind].buying.adminFee;
  
  return finalCost;
}

const Invoice = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fees, setFees] = useState(
    Array(INVOICE[currentIndex].booking.container.length + 2).fill(0)
  );
  const cost = initCost(currentIndex);
  const revenue = fees.reduce((a, b) => a + b, 0);
  const profit = revenue - cost;


  const handleIndexChange = newInd => {
    setCurrentIndex(newInd);
    setFees(Array(INVOICE[newInd].booking.container.length + 2).fill(0));
    document.getElementsByName("price").forEach(node => node.value = "");
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
      'Invoice #' + INVOICE[currentIndex].id + '.pdf', 
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

  const onFeeChange = (e, i) => {
    let newFees = [...fees]; 
    let newVal = parseInt(e.target.value);
    if (i < fees.length - 2) {
      newVal *= INVOICE[currentIndex].booking.container[i].quantity;
    }
    newFees[i] = newVal;
    setFees(newFees);
  }

  const createInfoObject = e => {
    const { price, total } = e.target;
    const priceList = toArray(price);
    const totalList = toArray(total);
    const combine = [];
    priceList.map((p, ind) => combine.push({ price: p, total: totalList[ind] }))
    
    return { 
      company: INVOICE[currentIndex].company,
      schedule: DATA[currentIndex],
      bookingNo: INVOICE[currentIndex].id,
      booking: INVOICE[currentIndex].booking,
      orderNo: INVOICE[currentIndex].bol.orderNo,
      priceList: combine, 
      subTotal: Utils.comma(revenue) 
    }
  }

  const toArray = nodelist => {
    let list = [];
    nodelist.forEach(node => list.push(node.value));
    return list;
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
        <UserList 
          setInd={handleIndexChange}
          opt={INVOICE} type="bol" />
        <div className="bol-instruction-detail"> 
          <div className="booking-id-container">
            <h1>Invoice</h1>
          </div>
          <div className="customer-info-container">
            <span>Company: {INVOICE[currentIndex].company.name}</span>
            <span>Email: {INVOICE[currentIndex].email}</span>
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

          {!INVOICE[currentIndex].isCompleted &&
          <form className="invoice-form-container" onSubmit={handlePreview}>
            <h2>Invoice</h2>
            <div className="invoice-row">
                <span className="info-label-special">Description</span>
                <span className="info-label-special">Quantity</span>
                <span className="info-label-special">Container</span>
                <div className="usd-input-container">
                  <span className="info-label-special">Price (USD)</span>
                  <span className="info-label-special">Total (USD)</span>
                </div>
            </div>
            {INVOICE[currentIndex].booking.container.map((row, ind) => 
                <div className="invoice-row" key={ind}>
                  <span>Ocean Freight</span>
                  <span>{row.quantity}</span>
                  <span>{row.containerType}</span>
                  <NumberInput ind={ind} onChange={onFeeChange} fees={fees}/>
                </div>
            )}
            <div className="invoice-row">
              <span>Document Fee</span>
              <NumberInput ind={fees.length - 2} onChange={onFeeChange} fees={fees}/>
            </div>
            <div className="invoice-row">
              <span>Administration Fee</span>
              <NumberInput ind={fees.length - 1} onChange={onFeeChange} fees={fees}/>
            </div>
            <FinanceRow label="Revenue" value={revenue} />
            <FinanceRow label="Cost" value={cost} />
            <FinanceRow label="Profit" value={profit} />
            <div className="invoice-row">
              <QuoteRow header="Buying" obj={QUOTE_DATA[currentIndex].buying} />
              <QuoteRow header="Selling" obj={QUOTE_DATA[currentIndex].selling} />
            </div>
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

export default Invoice;
