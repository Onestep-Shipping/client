import './Invoice.css';

import { FinanceRow, NumberInput } from './Helpers';
import React, { useState } from 'react';

import BookingDisplay from '../../../components/BookingDisplay/BookingDisplay.js';
import CREATE_INVOICE from '../../../apollo/mutations/CreateInvoiceMutation.js';
import FileUploadService from '../../../services/FileUploadService.js';
import GET_INVOICE_REQUEST from '../../../apollo/queries/GetInvoiceRequestQuery.js';
import Header from '../../../components/Header/Header.js';
import { InfoRow } from '../Helpers.js';
import PdfGenerator from './pdfGenerator.js';
import { QuoteRow } from '../QuoteUpdate/Helpers';
import UserList from '../../../components/UserList/UserList.js';
import Utils from '../../../utils/Helpers.js';
import client from '../../../apollo/index.js';
import { useQuery } from '@apollo/react-hooks';

const Invoice = () => {
  const { loading, error, data } = useQuery(GET_INVOICE_REQUEST, {
    fetchPolicy: 'cache-and-network'
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fees, setFees] = useState([]);
  const [hasGeneratedPDF, setHasGeneratedPDF] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const shipments = data.getAllShipments.filter(
    shipment => shipment.billInstruction.form !== null
  );
  const  { bookingRequest, billInstruction, invoice, schedule, bookedBy } = shipments[currentIndex];
  const quote = schedule.route.quoteHistory
    .filter(quote => Date.parse(quote.validity.startDate) <=  Date.parse(schedule.startDate))
    .slice(0, 1)[0];

  const cost = invoice.form.cost || invoice.tempCost;
  const revenue = fees.reduce((a, b) => a + b, 0) || invoice.form.revenue;
  const profit = revenue - cost;

  const handleIndexChange = newInd => {
    setCurrentIndex(newInd);
    setFees(Array(bookingRequest.form.containers.length + 2).fill(0));
    setHasGeneratedPDF(false);
    document.getElementsByName("price").forEach(node => node.value = "");
  }

  const handlePreview = e => {
    e.preventDefault();
    PdfGenerator.preview(createInfoObject(e));
    setHasGeneratedPDF(true);
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    const blob = PdfGenerator.uploadToServer();
    const pdf = new File(
      [blob], 
      'Invoice #' + bookingRequest.confirmation.bookingNo + '.pdf', 
      { type: 'application/pdf' } 
    )
    const formData = new FormData();
    formData.append("file", pdf);

    const uploadedResponse = await FileUploadService.uploadFile(formData);
    const { fileLocation } = uploadedResponse.data;

    client.mutate({
      mutation: CREATE_INVOICE,
      variables: { 
        shipmentId: shipments[currentIndex]._id,
        pdf: fileLocation, 
        invoice: { cost, revenue, profit }
      },
      refetchQueries: [{ query: GET_INVOICE_REQUEST }]
    }).then(response => {
      const { createInvoice } = response.data;
      if (createInvoice === "OK") {
        alert("Invoice has been sent!");
      }
    })
  }

  const onFeeChange = (e, i) => {
    let newFees = [...fees]; 
    let newVal = parseInt(e.target.value);
    if (i < fees.length - 2) {
      newVal *= bookingRequest.form.containers[i].quantity;
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
      company: bookedBy,
      schedule,
      bookingNo: bookingRequest.confirmation.bookingNo,
      booking: bookingRequest.form,
      orderNo: billInstruction.form.orderNo,
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
          opt={shipments} type="bol" />
        <div className="bol-instruction-detail"> 
          <div className="booking-id-container">
            <h1>Invoice</h1>
          </div>
          <div className="customer-info-container">
            <text>Contact: {bookedBy.personInCharge.name}</text>
            <text>Email: {bookedBy.email}</text>
            <text>
              ETD: {Utils.formatISOString(bookingRequest.confirmation.etd)}
            </text>
          </div>

          {invoice.pdf !== null && 
          <text 
            className="schedule-result-text-link" 
            onClick={() => Utils.handlePDFOpen(invoice.pdf)}>
              Invoice has been sent.
          </text>}

          <div className="form-container">
            <h2>Schedule</h2>
            <BookingDisplay schedule={schedule} quote={quote} fields={8}/>
          </div>

          <div className="form-container">
            <h2>Information</h2>
            <div className="booking-details-container">
              <InfoRow label="Booking Number" value={bookingRequest.confirmation.bookingNo} />
              <InfoRow label="Commodity" value={bookingRequest.form.commodity} />
              <InfoRow label="Order/PO Number" value={billInstruction.form.orderNo} />
            </div>
          </div>

          <form className="invoice-form-container" onSubmit={handlePreview}>
            <h2>Invoice</h2>
            <div className="invoice-row">
                <text className="info-label-special">Description</text>
                <div className="col2"><text className="info-label-special">Quantity</text></div>
                <div className="col2"><text className="info-label-special">Container</text></div>
                <div className="usd-input-container">
                  <text className="info-label-special">Price (USD)</text>
                  <text className="info-label-special">Total (USD)</text>
                </div>
            </div>
            {bookingRequest.form.containers.map((row, ind) => 
                <div className="invoice-row" key={ind}>
                  <text>Ocean Freight</text>
                  <div className="col2"><text>{row.quantity}</text></div>
                  <div className="col2"><text>{row.containerType}</text></div>
                  <NumberInput ind={ind} onChange={onFeeChange} fees={fees}/>
                </div>
            )}
            <div className="invoice-row">
              <text>Document Fee</text>
              <NumberInput ind={fees.length - 2} onChange={onFeeChange} fees={fees}/>
            </div>
            <div className="invoice-row">
              <text>Administration Fee</text>
              <NumberInput ind={fees.length - 1} onChange={onFeeChange} fees={fees}/>
            </div>
            <FinanceRow label="Revenue" value={revenue} />
            <FinanceRow label="Cost" value={cost} />
            <FinanceRow label="Profit" value={profit} />
            <div className="invoice-row">
              <QuoteRow header="Buying" obj={quote.buying} />
              <QuoteRow header="Selling" obj={quote.selling} />
            </div>
            <div className="bol-button-form">
              <input id="left-button" type="submit" className="result-button" value="Generate PDF" />
              {hasGeneratedPDF &&
              <button  className="result-button" onClick={handleUpload}>
                Send to Customer
              </button>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
