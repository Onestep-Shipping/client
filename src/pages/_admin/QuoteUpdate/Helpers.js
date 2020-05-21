import React from 'react';
import PropTypes from 'prop-types';
import { CONTAINER_TYPES } from '../../../constants/ServiceFormConstants';
import { comma } from '../../../utils/Helpers.js';

const QuoteForm = props => {
  const { header } = props; 
  const lcHeader = header.toLowerCase();
  return (
    <div className="buying-container">
      <h2>{header}</h2>
      {CONTAINER_TYPES.map((container, ind) =>
        <div className="invoice-row" key={ind}>
          <text className="info-label">O.F. - {container}</text>
          <input 
            type="number" 
            name={lcHeader + "OceanFreight"} 
            className="usd-input" 
            required 
          />
        </div>
      )}
      <div className="invoice-row">
        <text className="info-label">Document Fee</text>
        <input 
          type="number" 
          name={lcHeader + "DocFee"} 
          className="usd-input" 
          required 
        />
      </div>
      <div className="invoice-row">
        <text className="info-label">Administration Fee</text>
        <input 
          type="number" 
          name={lcHeader + "AdminFee"} 
          className="usd-input" 
          required 
        />
      </div>
    </div>
  )
}

const QuoteRow = props => {
  const { header, obj } = props;

  return (
    <div className="finance-display-form">
      <div className="finance-display-container">
        <text className="info-label">{header}</text>
      </div>
      {obj.oceanFreight.map((of, ind) =>
        <div className="finance-display-row" key={ind}>
          <text>O.F. - {of.containerType}:</text>
          <text>${comma(of.price)}</text>
        </div>
      )}
      <div className="finance-display-row">
        <text>Doc fee:</text>
        <text>${comma(obj.docFee)}</text>
      </div>
      <div className="finance-display-row">
        <text>Admin fee:</text>
        <text>${comma(obj.adminFee)}</text>
      </div>
    </div>
  );
}

export { QuoteForm, QuoteRow };

QuoteForm.propTypes = {
  header: PropTypes.string,
};

QuoteRow.propTypes = {
  header: PropTypes.string,
  obj: PropTypes.object,
};