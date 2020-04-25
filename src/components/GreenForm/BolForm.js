import React, {useState} from 'react';
import '../../pages/Booking/Booking.css';
import PropTypes from 'prop-types';
import {Textarea, ExtraInput, InfoRow} from './Helpers.js';

const BolForm = (props) => {
  const TEXTAREA_FIELDS = ["Shipper", "Consignee", "Notify", "Description of Goods"];
  const TRACKING_HEADERS = ["Container No.", "Seel No.", "Cargo Weight (kgs)", "Measurement (cbm)", "VGM"];
  const INPUT_FIELDS = ["Order/PO Number", "HS Code", "CAED/AES Number", "Cargo Value"];
  const [row, setRow] = useState(1);

  const addContainer = (e) => {
    e.preventDefault();
    setRow(row + 1);
  }

  return (
    <form className="booking-form-container" onSubmit={props.action} noValidate>
      {TEXTAREA_FIELDS.map((name, ind) => {
        return (<Textarea name={name} key={ind}/>);
      })}
      <div className="schedule-result-header-row">
        {TRACKING_HEADERS.map((header, ind) => {
          return (
            <div className="col2" key={ind}>
              <text className="schedule-result-header-text">{header}</text>
            </div>
          );
        })}
      </div>
      {Array(row).fill().map((booking, ind) => {
        return (
          <div className='instruction-result-row' key={ind}>
            {TRACKING_HEADERS.map((header, i) => {
              const lcName = header.toLowerCase().replace(' ', '-');
              const finalName = lcName.substring(0, lcName.indexOf('(')); 
              return ( <ExtraInput name={finalName} key={i}/> )
            })}
          </div>
        );
      })}
      <button className="add-button" onClick={(e) => addContainer(e)}>
        Add Container
      </button>

      {INPUT_FIELDS.map((name, ind) => {
        return (<InfoRow name={name} key={ind} />);
      })}
      <button className="result-button">Submit</button>
    </form>
  );
};

export default BolForm;

BolForm.propTypes = {
  action: PropTypes.func,
};