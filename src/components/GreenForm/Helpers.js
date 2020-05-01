import React from 'react';
import PropTypes from 'prop-types';

const ROW_NUMBER = 5;

const Textarea = (props) => {
  const { name } = props;
  const lcName = name.toLowerCase().replace(' ', '-');
  return (
    <div className="info-row-with-textarea">
      <text className="info-label">{name}: </text>
      <textarea
        type="text"
        name={lcName}
        className="booking-form-textarea"
        placeholder="i.e. Food, Clothes, etc."
        rows={ROW_NUMBER}
        required/>
    </div>
  );
}

const ExtraInput = (props) => {
  const { name } = props;
  return (
    <div className="col2">
      <input
        type="text"
        name={name}
        className="instruction-extra-input"
        placeholder="i.e. 420010"
        required/>
    </div>
  );
}

const InfoRow = (props) => {
  const { name } = props;
  const lcName = name.toLowerCase().replace(' ', '-');

  return (
    <div className="info-row">
      <text className="info-label">{name}: </text>
      <input
        type="text"
        name={lcName}
        className="booking-form-input"
        placeholder="i.e. 420010"
        required/>
    </div>
  );
}

const Select = (props) => {
  const { name, options } = props;
  return (
    <div className="info-row">
      <text className="info-label">{name}: </text>
      <select className="booking-form-input">
        {options.map((type, ind) => (<option value={type} key={ind}>{type}</option>))}
      </select>
    </div>
  );
}

Textarea.propTypes = {
  name: PropTypes.string,
};

ExtraInput.propTypes = {
  name: PropTypes.string,
};

InfoRow.propTypes = {
  name: PropTypes.string,
};

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
};

export {Textarea, ExtraInput, InfoRow, Select};