import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import styles from '../../components/ScheduleForm/ScheduleFormMin.module.css';

const InfoRow = props => {
  const { label, value } = props;

  return (
    <div className="info-row">
      <span className="info-label">{label}: </span>
      <span className="schedule-result-text">{value}</span>
    </div>
  );
}

const MiniDatePickerTime = props => {
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

const MiniDatePicker = props => {
  const { name, value, action, id = "" } = props;

  return (
    <div>
      <DatePicker
        name={name}
        id={id}
        className={styles.fromDate}
        placeholderText="Select a day"
        selected={value}
        onChange={action}
      />
    </div>
  );
}


const ShipmentDetail = props => {
  const { container, ind } = props;
  
  return (
     <div className="shipment-detail-container">
        <span className="schedule-result-text">{ind + 1}</span>
        <div className="shipment-ind-row">
          <span className="schedule-result-text">Container No.</span>
          <span className="schedule-result-text">{container.containerNo}</span>
        </div>
        <div className="shipment-ind-row">
          <span className="schedule-result-text">Seel No. </span>
          <span className="schedule-result-text">{container.seelNo}</span>
        </div>
        <div className="shipment-ind-row">
          <span className="schedule-result-text">Cargo Weight (kgs)</span>
          <span className="schedule-result-text">{container.weight}</span>
        </div>
        <div className="shipment-ind-row">
          <span className="schedule-result-text">Measurement (cbm)</span>
          <span className="schedule-result-text">{container.measurement}</span>
        </div>
        <div className="shipment-ind-row">
          <span className="schedule-result-text">VGM</span>
          <span className="schedule-result-text">{container.vgm}</span>
        </div>
      </div>
  );
} 

const ContainerDetail = props => {
  const { container, ind } = props;
  
  return (
    <div className="shipment-detail-container">
      <span className="schedule-result-text">{ind + 1}</span>
      <div className="shipment-ind-row">
        <span className="schedule-result-text">Quantity</span>
        <span className="schedule-result-text">{container.quantity}</span>
      </div>
      <div className="shipment-ind-row">
        <span className="schedule-result-text">Container Type</span>
        <span className="schedule-result-text">{container.containerType}</span>
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


export {InfoRow, ShipmentDetail, ContainerDetail, Address, MiniDatePicker, MiniDatePickerTime};

InfoRow.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
};

MiniDatePickerTime.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  action: PropTypes.func,
};

MiniDatePicker.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  action: PropTypes.func,
  id: PropTypes.string,
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