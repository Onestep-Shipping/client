import PropTypes from 'prop-types';
import React from 'react';
import Utils from '../../../utils/Helpers.js';

const FinanceRow = props => {
  const { label, value } = props;

  return (
    <div className="invoice-row-small">
      <text className="info-label-special">{label}: </text>
      <text>${Utils.comma(value)}</text>
    </div>
  ) 
}

const NumberInput = props => {
  const { ind, onChange, fees } = props;

  return (
    <div className="usd-input-container">
      <input 
        type="number" name="price" className="usd-input" 
        onChange={e => onChange(e, ind)} required />
      <input 
        type="text" name="total" 
        className="usd-input" 
        disabled={true} 
        value={parseFloat(fees[ind]) ? Utils.comma(fees[ind]) : 0}
      />
    </div>
  );
}

export { FinanceRow, NumberInput };

FinanceRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number
};

NumberInput.propTypes = {
  ind: PropTypes.number,
  onChange: PropTypes.func,
  fees: PropTypes.array,
};