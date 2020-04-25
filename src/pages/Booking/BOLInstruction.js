import React, {useState, useCallback} from 'react';
import './Booking.css';

import {useParams, useHistory} from 'react-router-dom';
import DATA from '../../data/ScheduleDetailsData.js';
import Header from '../../components/Header/Header.js';

const ROW_NUMBER = 5;

const BOLInstruction = () => {
  const {id} = useParams();
  const history = useHistory();

  const TRACKING_HEADERS = ["Container No.", "Seel No.", "Cargo Weight (kgs)", "Measurement (cbm)", "VGM"];
  const [row, setRow] = useState(1);

  const handleBook = useCallback((e) => {
    e.preventDefault();
    // const shipper = e.target[0].value;
    // const consignee = e.target[1].value;
    // const notify = e.target[2].value;
    // const orderNo = e.target[3].value;
    // const description = e.target[4].value;
    // const hsCode = e.target[5].value;
    // const caedNo = e.target[6].value;
    // history.push(id + '/completed');
  }, [history, id]);

  const addContainer = () => {
    setRow(row + 1);
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="body-container2">
        <div className="booking-container">
          <div className="h1-container">
            <h1>Bill of Lading Instruction - Booking #212314</h1>
          </div>
          <div className="info-container2">
            {DATA.map((booking, index) => {
              if (index.toString() === id) {
                return (
                  <div className="booking-details-container2" key={index}>
                    <div className="info-row">
                      <div>
                        <text className="info-label">From: </text>
                        <text className="schedule-info-text-left">{booking.from}</text>
                      </div>
                      <div>
                        <text className="info-label">Date: </text>
                        <text className="schedule-info-text">{booking.fromDate}</text>
                      </div>
                    </div>
                    <div className="info-row">
                      <div>
                        <text className="info-label">To: </text>
                        <text className="schedule-info-text-left">{booking.to}</text>
                      </div>
                      <div>
                        <text className="info-label">Date: </text>
                        <text className="schedule-info-text">{booking.toDate}</text>
                      </div>
                    </div>
                    <div className="info-row">
                      <text className="info-label">Vessels / Services: </text>
                      <text className="schedule-result-text">{booking.ves}</text>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
            <form className="booking-form-container" onSubmit={handleBook} noValidate>
              <div className="info-row-with-textarea">
                <text className="info-label">Shipper: </text>
                <textarea
                  type="text"
                  name="shipper"
                  className="booking-form-textarea"
                  placeholder="i.e. Food, Clothes, etc."
                  rows={ROW_NUMBER}
                  required/>
              </div>
              <div className="info-row-with-textarea">
                <text className="info-label">Consignee: </text>
                <textarea
                  type="text"
                  name="consignee"
                  className="booking-form-textarea"
                  placeholder="i.e. Food, Clothes, etc."
                  rows={ROW_NUMBER}
                  required/>
              </div>
              <div className="info-row-with-textarea">
                <text className="info-label">Notify: </text>
                <textarea
                  type="text"
                  name="notify"
                  className="booking-form-textarea"
                  placeholder="i.e. Food, Clothes, etc."
                  rows={ROW_NUMBER}
                  required/>
              </div>
              <div className="info-row-with-textarea">
                <text className="info-label">Description of Goods: </text>
                <textarea
                  type="text"
                  name="notify"
                  className="booking-form-textarea"
                  placeholder="i.e. Food, Clothes, etc."
                  rows={ROW_NUMBER}
                  required/>
              </div>
              <div className="schedule-result-header-row">
              {
                TRACKING_HEADERS.map((header, ind) => {
                  return (
                    <div className="col2" key={ind}>
                      <text className="schedule-result-header-text">{header}</text>
                    </div>
                  );
                })
              }
              </div>
              {Array(row).fill().map((booking, ind) => {
                return (
                  <div className="schedule-result-header-row" key={ind}>
                    <div className='instruction-result-row'>
                      <div className="col2">
                        <input
                          type="text"
                          name="order-number"
                          className="instruction-extra-input"
                          placeholder="i.e. 420010"
                          required/>
                      </div>
                      <div className="col2">
                        <input
                          type="number"
                          name="order-number"
                          className="instruction-extra-input"
                          placeholder="i.e. 420010"
                          required/>
                      </div>
                      <div className="col2">
                        <input
                          type="number"
                          name="order-number"
                          className="instruction-extra-input"
                          placeholder="i.e. 420010"
                          required/>
                      </div>
                      <div className="col2">
                        <input
                          type="number"
                          name="order-number"
                          className="instruction-extra-input"
                          placeholder="i.e. 420010"
                          required/>
                      </div>
                      <div className="col2">
                        <input
                          type="number"
                          name="order-number"
                          className="instruction-extra-input"
                          placeholder="i.e. 420010"
                          required/>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button className="add-button" onClick={addContainer}>
                Add Container
              </button>
              
              <div className="info-row">
                <text className="info-label">Order/PO Number: </text>
                <input
                  type="text"
                  name="order-number"
                  className="booking-form-input"
                  placeholder="i.e. 420010"
                  required/>
              </div>
              <div className="info-row">
                <text className="info-label">HS Code: </text>
                <input
                  type="number"
                  name="hs-code"
                  className="booking-form-input"
                  placeholder="i.e. 420010"
                  required/>
              </div>
              <div className="info-row">
                <text className="info-label">CAED/AES Number: </text>
                <input
                  type="text"
                  name="caed-number"
                  className="booking-form-input"
                  placeholder="i.e. 420010"
                  required/>
              </div>
              <div className="info-row">
                <text className="info-label">Cargo Value: </text>
                <input
                  type="text"
                  name="cargo-value"
                  className="booking-form-input"
                  placeholder="i.e. 420010"
                  required/>
              </div>
              <button className="result-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BOLInstruction;
