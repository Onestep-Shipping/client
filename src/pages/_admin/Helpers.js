import React from 'react';
import PropTypes from 'prop-types';

const InfoRow = props => {
  const { label, value } = props;

  return (
    <div className="info-row">
      <text className="info-label">{label}: </text>
      <text className="schedule-result-text">{value}</text>
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

export {InfoRow, ShipmentDetail, ContainerDetail};

InfoRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

ShipmentDetail.propTypes = {
  container: PropTypes.object,
  ind: PropTypes.number
};

ContainerDetail.propTypes = {
  container: PropTypes.object,
  ind: PropTypes.number
};