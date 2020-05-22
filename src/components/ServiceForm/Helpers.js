import PropTypes from 'prop-types';
import React from 'react';
import Utils from '../../utils/Helpers.js';

const ROW_NUMBER = 5;

const Textarea = (props) => {
  const { name, defaultValue = "" } = props;
  return (
    <div className="info-row-with-textarea">
      <span className="info-label">{name} </span>
      <spanarea
        defaultValue={defaultValue}
        type="text"
        name={Utils.camelize(name)}
        className="booking-form-textarea"
        placeholder="i.e. Food, Clothes, etc."
        rows={ROW_NUMBER}
        required/>
    </div>
  );
}

const ExtraInput = (props) => {
  const { name, defaultValue = "" } = props;
  const camelizedName = Utils.camelize(name);

  return (
    <div className="col2">
      <input
        defaultValue={defaultValue}
        type={(camelizedName === "containerNo" || camelizedName === "seelNo") ? 
              "text" : "number"}
        name={camelizedName}
        className="instruction-extra-input"
        placeholder="i.e. 420010"
        required />
    </div>
  );
}

const InfoRow = (props) => {
  const { name, camelizeName = "", defaultValue = "" } = props;
  const inputName = camelizeName === "" ? Utils.camelize(name) : camelizeName;

  return (
    <div className="info-row">
      <span className="info-label">{name} </span>
      <input
        defaultValue={defaultValue}
        type="text"
        name={inputName}
        className="booking-form-input"
        placeholder="i.e. 420010"
        required/>
    </div>
  );
}

const Select = (props) => {
  const { name, options, camelizeName } = props;
  const inputName = camelizeName === "" ? Utils.camelize(name) : camelizeName;

  return (
    <div className="info-row">
      <span className="info-label">{name} </span>
      <select className="booking-form-input" name={inputName}>
        {options.map((type, ind) => (<option value={type} key={ind}>{type}</option>))}
      </select>
    </div>
  );
}

Textarea.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
};

ExtraInput.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
};

InfoRow.propTypes = {
  name: PropTypes.string,
  camelizeName: PropTypes.string,
  defaultValue: PropTypes.string,
};

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  camelizeName: PropTypes.string
};

export {Textarea, ExtraInput, InfoRow, Select};