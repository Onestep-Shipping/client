import React, { useState, useContext } from 'react';
import './QuoteUpdate.css';

import Header from '../../../components/Header/Header.js';
import ScheduleForm from '../../../components/ScheduleForm/ScheduleForm.js';
import styles from '../../../components/ScheduleForm/ScheduleFormMin.module.css';
import arrowDownIcon from '../../../assets/arrow-down.svg';
import { QuoteForm, QuoteRow } from './Helpers';
import moment from 'moment';
import { Textarea } from '../../../components/ServiceForm/Helpers.js';
import GET_QUOTE_HISTORY from '../../../apollo/queries/GetQuoteHistoryQuery.js'
import client from '../../../apollo/index.js';
import { ScheduleFormContext } from "../../../context/ScheduleFormContext.js";

const convertDateToISO = date => {
  return date.toISOString().substring(0, 10);
}

const QuoteUpdate = () => {
  const [history, setHistory] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setIndex] = useState(0);

  const { schedule } = useContext(ScheduleFormContext);

  const handleSubmit = () => {
    client.query({
      query: GET_QUOTE_HISTORY,
      variables: { 
        routeId: schedule.fromLocation.value + "-" + schedule.toLocation.value,
        carrier: schedule.carrier,
        startDate: convertDateToISO(schedule.fromDate),
        endDate: convertDateToISO(schedule.toDate)
      }
    }).then(res => {
      const { getQuoteHistory } = res.data;
      setHistory(getQuoteHistory);
      setIsVisible(true);
    })
  }

  return (
    <div className="homepage-container">
      <Header />
      <div className="bol-instruction-container">
        <ul className="quote-history-list">
          {history.length > 0 ?
          history.map((item, ind) => (
            <div key={ind}>
              <li id="selected-item" className="bol-instruction-item"
                  onClick={() => setIndex(ind === currentIndex ? -1 : ind)}>
                  <text>
                    {moment(new Date(item.validity.startDate)).format("YYYY | MMM DD")
                    } - {moment(new Date(item.validity.endDate)).format("MMM DD")}
                  </text>
                  <img id={ind === currentIndex ? "svg-reverse" : ""}
                    className="svg-arrow" src={arrowDownIcon} alt="Dropdown Icon" />
              </li>
              {ind === currentIndex &&
              <div>
                <QuoteRow header="Buying" obj={history[currentIndex].buying} />
                <QuoteRow header="Selling" obj={history[currentIndex].selling} />
                <div className="finance-display-form">
                  Note: FAK Rates (Except {history[currentIndex].except || "Nothing"})
                </div>
              </div>}
            </div>
            )
          ) : <div className="history-text">No history.</div>}
        </ul>
        <div className="quote-update-detail"> 
          <div className="booking-id-container">
            <h1>Quote Update</h1>
          </div>
          <div className="finance-display-form">
            <ScheduleForm styles={styles} onSubmit={handleSubmit}/>
          </div>
          {isVisible &&
          <form className="finance-display-form">
            <div className="finance-display-container">
              <QuoteForm header="Buying" />
              <QuoteForm header="Selling" />
            </div>
            <div>
              <Textarea name="Note: FAK Rates - Except..." key={currentIndex}/>
              <text></text>
            </div>
            <button className="result-button">Update</button>
          </form>}
        </div>
      </div>
    </div>
  );
};

export default QuoteUpdate;
