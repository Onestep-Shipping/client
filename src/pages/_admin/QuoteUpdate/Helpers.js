import { CONTAINER_TYPES } from '../../../constants/ServiceFormConstants';
import PropTypes from 'prop-types';
import React from 'react';
import Utils from '../../../utils/Helpers.js';

const QuoteForm = props => {
  const { header } = props; 
  const lcHeader = header.toLowerCase();
  return (
    <div className="buying-container">
      <h2>{header}</h2>
      {CONTAINER_TYPES.map((container, ind) =>
        <div className="invoice-row" key={ind}>
          <span className="info-label">O.F. - {container}</span>
          <input 
            type="number" 
            name={lcHeader + "OceanFreight"} 
            className="usd-input" 
            required 
          />
        </div>
      )}
      <div className="invoice-row">
        <span className="info-label">Document Fee</span>
        <input 
          type="number" 
          name={lcHeader + "DocFee"} 
          className="usd-input" 
          required 
        />
      </div>
      <div className="invoice-row">
        <span className="info-label">Administration Fee</span>
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
        <span className="info-label">{header}</span>
      </div>
      {obj.oceanFreight.map((of, ind) =>
        <div className="finance-display-row" key={ind}>
          <span>O.F. - {of.containerType}:</span>
          <span>${Utils.comma(of.price)}</span>
        </div>
      )}
      <div className="finance-display-row">
        <span>Doc fee:</span>
        <span>${Utils.comma(obj.docFee)}</span>
      </div>
      <div className="finance-display-row">
        <span>Admin fee:</span>
        <span>${Utils.comma(obj.adminFee)}</span>
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