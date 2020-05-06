import React, { useState } from 'react';
import './QuoteUpdate.css';

import Header from '../../../components/Header/Header.js';
import ScheduleForm from '../../../components/ScheduleForm/ScheduleForm.js';
import QUOTE_DATA from '../../../data/QuoteUpdateData';
import styles from '../../../components/ScheduleForm/ScheduleFormMin.module.css';
import arrowDownIcon from '../../../assets/arrow-down.svg';
import { QuoteForm, QuoteRow } from './Helpers';
import moment from 'moment';

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
          {isVisible ?
          QUOTE_DATA.map((item, ind) => (
            <div key={ind}>
              <li id="selected-item" className="bol-instruction-item"
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
                <QuoteRow header="Buying" obj={QUOTE_DATA[currentIndex].buying} />
                <QuoteRow header="Selling" obj={QUOTE_DATA[currentIndex].selling} />
              </div>}
            </div>
            )
          ) : <div className="history-text">No history.</div>}
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
