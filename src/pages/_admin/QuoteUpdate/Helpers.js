import React from 'react';
import PropTypes from 'prop-types';
import { CONTAINER_TYPES } from '../../../constants/ServiceFormConstants';
import styles from '../../../components/ScheduleForm/ScheduleFormMin.module.css';
import { comma } from '../../../helpers/Helpers.js';

const QuoteForm = props => {
  const { header } = props; 
  return (
    <div className="buying-container">
      <h2>{header}</h2>
      {CONTAINER_TYPES.map((container, ind) =>
        <div className="invoice-row" key={ind}>
          <text className={styles.scheduleLabel}>O.F. - {container}</text>
          <input type="number" name="oceanFreight" className="usd-input" required />
        </div>
      )}
      <div className="invoice-row">
        <text className={styles.scheduleLabel}>Document Fee</text>
        <input type="number" name="docFee" className="usd-input" required />
      </div>
      <div className="invoice-row">
        <text className={styles.scheduleLabel}>Administration Fee</text>
        <input type="number" name="adminFee" className="usd-input" required />
      </div>
    </div>
  )
}

const QuoteRow = props => {
  const { header, obj } = props;

  return (
    <div className="finance-display-form">
      <div className="finance-display-container">
        <text className={styles.scheduleLabel}>{header}</text>
      </div>
      {CONTAINER_TYPES.map((container, ind) =>
        <div className="finance-display-row" key={ind}>
          <text>O.F. - {container}:</text>
          <text>${comma(obj.oceanFreight[ind])}</text>
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