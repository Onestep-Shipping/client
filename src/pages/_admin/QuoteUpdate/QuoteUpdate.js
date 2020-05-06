import React, { useState } from 'react';
import './QuoteUpdate.css';

import Header from '../../../components/Header/Header.js';
import ScheduleForm from '../../../components/ScheduleForm/ScheduleForm.js';
import { CONTAINER_TYPES } from '../../../constants/ServiceFormConstants';
import styles from '../../../components/ScheduleForm/ScheduleFormMin.module.css';
import arrowDownIcon from '../../../assets/arrow-down.svg';
import moment from 'moment';

const QUOTE_HISTORY = [
  {
    validityStart: "03/01/2020",
    validityEnd: "03/31/2020",
    buying: {
      oceanFreight: [750, 1000, 1300],
      docFee: 60,
      adminFee: 0
    },
    selling: {
      oceanFreight: [800, 1200, 1600],
      docFee: 80,
      adminFee: 30
    }
  },
  {
    validityStart: "02/01/2020",
    validityEnd: "02/31/2020",
    buying: {
      oceanFreight: [750, 1000, 1300],
      docFee: 60,
      adminFee: 0
    },
    selling: {
      oceanFreight: [800, 1200, 1600],
      docFee: 80,
      adminFee: 30
    }
  },
  {
    validityStart: "01/01/2020",
    validityEnd: "01/31/2020",
    buying: {
      oceanFreight: [750, 1000, 1300],
      docFee: 60,
      adminFee: 0
    },
    selling: {
      oceanFreight: [800, 1200, 1600],
      docFee: 80,
      adminFee: 30
    }
  },
]

const QuoteUpdate = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setIndex] = useState(-1);

  const onSubmit = e => {
    e.preventDefault();
    setIsVisible(true);
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
        <ul className="quote-history-list">
          {QUOTE_HISTORY.map((item, ind) => (
            <div key={ind}>
              <li id="selected-item"
                  className="bol-instruction-item"
                  onClick={() => setIndex(ind === currentIndex ? -1 : ind)}>
                  <text>
                    {moment(new Date(item.validityStart)).format("YYYY | MMM DD")
                    } - {moment(new Date(item.validityEnd)).format("MMM DD")}
                  </text>
                  <img id={ind === currentIndex ? "svg-reverse" : ""}
                    className="svg-arrow" src={arrowDownIcon} alt="Dropdown Icon" />
              </li>
              {ind === currentIndex &&
              <div>
                <div className="finance-display-form">
                  <div className="finance-display-container">
                    <text className={styles.scheduleLabel}>Buying</text>
                  </div>
                  {CONTAINER_TYPES.map((container, ind) =>
                    <div className="finance-display-row" key={ind}>
                      <text>O.F. - {container}:</text>
                      <text>{QUOTE_HISTORY[currentIndex].buying.oceanFreight[ind]}</text>
                    </div>
                  )}
                  <div className="finance-display-row" key={ind}>
                    <text>Doc fee:</text>
                    <text>{QUOTE_HISTORY[currentIndex].buying.docFee}</text>
                  </div>
                  <div className="finance-display-row" key={ind}>
                    <text>Admin fee:</text>
                    <text>{QUOTE_HISTORY[currentIndex].buying.adminFee}</text>
                  </div>
                </div>

                 <div className="finance-display-form">
                  <div className="finance-display-row">
                    <text className={styles.scheduleLabel}>Selling</text>
                  </div>
                  {CONTAINER_TYPES.map((container, ind) =>
                    <div className="finance-display-row" key={ind}>
                      <text>O.F. - {container}:</text>
                      <text>{QUOTE_HISTORY[currentIndex].buying.oceanFreight[ind]}</text>
                    </div>
                  )}
                  <div className="finance-display-row" key={ind}>
                    <text>Doc fee:</text>
                    <text>{QUOTE_HISTORY[currentIndex].buying.docFee}</text>
                  </div>
                  <div className="finance-display-row" key={ind}>
                    <text>Admin fee:</text>
                    <text>{QUOTE_HISTORY[currentIndex].buying.adminFee}</text>
                  </div>
                </div>
              </div>}
            </div>
            )
          )}
        </ul>
        <div className="quote-update-detail"> 
          <div className="finance-display-form">
            <ScheduleForm styles={styles} action={onSubmit}/>
          </div>
          {isVisible &&
          <form className="finance-display-form">
            <div className="finance-display-container">
              <QuoteForm header="Buying" />
              <QuoteForm header="Selling" />
            </div>
            <button className="result-button">Update</button>
          </form>}
        </div>
      </div>
    </div>
  );
};

export default QuoteUpdate;

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
