import '../../pages/_user/Form/Form.css';

import {ExtraInput, InfoRow, Textarea} from './Helpers.js';
import { INPUT_FIELDS, TEXTAREA_FIELDS, TRACKING_HEADERS } from '../../constants/ServiceFormConstants.js';
import React, {useState} from 'react';

import GET_BILL_FORM from '../../apollo/queries/GetBillFormQuery.js';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

const BolForm = (props) => {
  const { action, shipmentId } = props;
  
  const { loading, error, data } = useQuery(GET_BILL_FORM, {
    variables: { shipmentId },
    fetchPolicy: 'cache-and-network'
  });
  const [row, setRow] = useState(1);

  const addContainer = (e) => {
    e.preventDefault();
    setRow(row + 1);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const form = data.getBillForm;
  let textAreaValues = Array(TEXTAREA_FIELDS).fill("");
  let containerValues = Array(row).fill(Array(TRACKING_HEADERS.length).fill(""));
  let inputValues = Array(INPUT_FIELDS).fill("");

  if (form !== null) {
    textAreaValues = [form.shipper, form.consignee, form.notify, form.description];
    inputValues = [form.orderNo, form.hsCode, form.caedNo, form.cargoValue];
    containerValues = [];
    form.containers.map(container => function() {
      const { containerNo, seelNo, weight, measurement, vgm } = container;
      containerValues.push([containerNo, seelNo, weight, measurement, vgm]);
    })
  }

  return (
    <form className="booking-form-container" onSubmit={action} noValidate>
      {TEXTAREA_FIELDS.map((name, ind) => 
        (<Textarea name={name} defaultValue={textAreaValues[ind] || ""} key={ind}/>))}
      <div className="schedule-result-header-row">
        {TRACKING_HEADERS.map((header, ind) => 
          <div className="col2" key={ind}>
            <span className="info-label-special">{header}</span>
          </div>
        )}
      </div>
      {Array(containerValues.length).fill().map((booking, ind) =>
        (
          <div className='instruction-result-row' key={ind}>
            {TRACKING_HEADERS.map((header, i) => {
              const name = header.indexOf('(') === -1 ? 
                header : header.substring(0, header.indexOf('('));
              return ( 
                <ExtraInput name={name} defaultValue={containerValues[ind][i] || ""} key={i}/> 
              )
            })}
          </div>
        )
      )}
      <button className="add-button" onClick={addContainer}>
        Add Container
      </button>

      {INPUT_FIELDS.map((name, ind) => 
        (<InfoRow name={name} defaultValue={inputValues[ind] || ""} key={ind} />))}
      <button className="result-button">Submit</button>
    </form>
  );
};

export default BolForm;

BolForm.propTypes = {
  action: PropTypes.func,
  shipmentId: PropTypes.string,
};
