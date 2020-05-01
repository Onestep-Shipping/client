import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styles from '../../components/ScheduleForm/ScheduleFormMin.module.css';
import moment from 'moment';

const InfoRow = props => {
  const { label, value } = props;

  return (
    <div className="info-row">
      <text className="info-label">{label}: </text>
      <text className="schedule-result-text">{value}</text>
    </div>
  );
}

const MiniDatePicker = props => {
  const { name, value, action } = props;

  const handleInputChangeRaw = e => {
    const date = moment(e.target.value, "YYYY-MM-DD HH:mm" );

    if( date.isValid() ) {
      action(date);
    }
  }

  return (
    <div>
      <DatePicker
        name={name}
        className={styles.fromDate}
        placeholderText="Select a day"
        selected={value}
        onChange={action}
        onChangeRaw={handleInputChangeRaw}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="MM/dd/yyyy HH:mm"
      />
    </div>
  );
}


const ShipmentDetail = props => {
  const { container, ind } = props;
  
  return (
     <div className="shipment-detail-container">
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
  );
} 

const ContainerDetail = props => {
  const { container, ind } = props;
  
  return (
    <div className="shipment-detail-container">
      <text className="schedule-result-text">{ind + 1}</text>
      <div className="shipment-ind-row">
        <text className="schedule-result-text">Quantity</text>
        <text className="schedule-result-text">{container.quantity}</text>
      </div>
      <div className="shipment-ind-row">
        <text className="schedule-result-text">Container Type</text>
        <text className="schedule-result-text">{container.containerType}</text>
      </div>
    </div>
  );
} 

const Address = (props) => {
  const { type } = props;

  let placeholder = "i.e. ";
  if (type === "Street") {
    placeholder += "8237 Montcalm Street";
  } else if (type === "City") {
    placeholder += "Vancouver, BC, V6P 4P4";
  } else {
    placeholder += "Canada";
  }

  return (
    <div className="confirmation-info-container">
      <div>
        <input
          type="text"
          name={"pickupLocation" + type}
          className="booking-confirmation-input"
          placeholder={placeholder}
          required/>
      </div>
      <div>
        <input
          type="text"
          name={"returnLocation" + type}
          className="booking-confirmation-input"
          placeholder={placeholder}
          required/>
      </div>
    </div>
  )
}


export {InfoRow, ShipmentDetail, ContainerDetail, Address, MiniDatePicker};

InfoRow.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};

MiniDatePicker.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  action: PropTypes.func,
};

ShipmentDetail.propTypes = {
  container: PropTypes.object,
  ind: PropTypes.number
};

ContainerDetail.propTypes = {
  container: PropTypes.object,
  ind: PropTypes.number
};

Address.propTypes = {
  type: PropTypes.string,
};