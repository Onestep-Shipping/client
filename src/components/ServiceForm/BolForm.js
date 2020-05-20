import React, {useState} from 'react';
import '../../pages/_user/Form/Form.css';
import { TEXTAREA_FIELDS, TRACKING_HEADERS, INPUT_FIELDS } from '../../constants/ServiceFormConstants.js';
import PropTypes from 'prop-types';
import {Textarea, ExtraInput, InfoRow} from './Helpers.js';

const BolForm = (props) => {
  const [row, setRow] = useState(1);

  const addContainer = (e) => {
    e.preventDefault();
    setRow(row + 1);
  }

  return (
    <form className="booking-form-container" onSubmit={props.action} noValidate>
      {TEXTAREA_FIELDS.map((name, ind) => (<Textarea name={name} key={ind}/>))}
      <div className="schedule-result-header-row">
        {TRACKING_HEADERS.map((header, ind) => 
          <div className="col2" key={ind}>
            <text className="info-label-special">{header}</text>
          </div>
        )}
      </div>
      {Array(row).fill().map((booking, ind) =>
        (
          <div className='instruction-result-row' key={ind}>
            {TRACKING_HEADERS.map((header, i) => {
              const lcName = header.toLowerCase().replace(' ', '-');
              const finalName = lcName.substring(0, lcName.indexOf('(')); 
              return ( <ExtraInput name={finalName} key={i}/> )
            })}
          </div>
        )
      )}
      <button className="add-button" onClick={addContainer}>
        Add Container
      </button>

      {INPUT_FIELDS.map((name, ind) => (<InfoRow name={name} key={ind} />))}
      <button className="result-button">Submit</button>
    </form>
  );
};

export default BolForm;

BolForm.propTypes = {
  action: PropTypes.func,
};
