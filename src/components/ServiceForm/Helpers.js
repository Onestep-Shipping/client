import React from 'react';
import PropTypes from 'prop-types';

const ROW_NUMBER = 5;

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+|\/|\./g, '');
}

const Textarea = (props) => {
  const { name } = props;
  return (
    <div className="info-row-with-textarea">
      <text className="info-label">{name} </text>
      <textarea
        type="text"
        name={camelize(name)}
        className="booking-form-textarea"
        placeholder="i.e. Food, Clothes, etc."
        rows={ROW_NUMBER}
        required/>
    </div>
  );
}

const ExtraInput = (props) => {
  const { name } = props;
  const camelizedName = camelize(name);

  return (
    <div className="col2">
      <input
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
  const { name, camelizeName = "" } = props;
  const inputName = camelizeName === "" ? camelize(name) : camelizeName;

  return (
    <div className="info-row">
      <text className="info-label">{name} </text>
      <input
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
  const inputName = camelizeName === "" ? camelize(name) : camelizeName;

  return (
    <div className="info-row">
      <text className="info-label">{name} </text>
      <select className="booking-form-input" name={inputName}>
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
  camelizeName: PropTypes.string
};

Select.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  camelizeName: PropTypes.string
};

export {Textarea, ExtraInput, InfoRow, Select};